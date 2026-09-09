// ============================================================
// WORKER API — Latela OMS
// Menangani data PO (Procurement) & Purchase History (gabungan
// Payment Tracking + Purchasing Control) pakai Cloudflare D1.
// Selain rute /api/*, semua request lain diteruskan ke static
// assets (index.html, app.js, dst) seperti biasa.
// ============================================================

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function readBody(request) {
  try { return await request.json(); } catch (err) { return {}; }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // ==================== PO (Procurement) ====================
      if (path === '/api/po/list' && request.method === 'GET') {
        const { results } = await env.DB.prepare(
          `SELECT id, no_po as noPo, tanggal, vendor, items, status,
                  dibuat_oleh as dibuatOleh, disetujui_oleh as disetujuiOleh,
                  waktu_dibuat as waktuDibuat, waktu_disetujui as waktuDisetujui
           FROM po_list ORDER BY waktu_dibuat DESC`
        ).all();
        return json(results);
      }

      if (path === '/api/po/submit' && request.method === 'POST') {
        const b = await readBody(request);
        const id = `PO-${Date.now()}`;
        await env.DB.prepare(
          `INSERT INTO po_list (id, no_po, tanggal, vendor, items, status, dibuat_oleh, waktu_dibuat)
           VALUES (?, ?, ?, ?, ?, 'Pending', ?, datetime('now'))`
        ).bind(id, b.noPo || '', b.tanggal || '', b.vendor || '', b.items || '[]', b.dibuatOleh || '').run();
        return json({ success: true, id });
      }

      if (path === '/api/po/update-status' && request.method === 'POST') {
        const b = await readBody(request);
        await env.DB.prepare(
          `UPDATE po_list SET status = ?, disetujui_oleh = ?, waktu_disetujui = datetime('now') WHERE id = ?`
        ).bind(b.status || '', b.diprosesOleh || '', b.id || '').run();
        return json({ success: true });
      }

      // 🌟 HAPUS PO DARI LIST (khusus Admin, dicek di sisi frontend). Menghapus
      // baris ini TIDAK ikut menghapus item yang sudah kelanjur masuk ke
      // Histori Pembelian (kalau PO-nya sempat ke-approve dulu sebelum dihapus) --
      // dua tabel ini independen, jadi datanya tetap aman di Histori Pembelian.
      if (path === '/api/po/delete' && request.method === 'POST') {
        const b = await readBody(request);
        if (!b.id) return json({ success: false, message: 'ID PO tidak valid' });
        await env.DB.prepare(`DELETE FROM po_list WHERE id = ?`).bind(b.id).run();
        return json({ success: true });
      }

      // ==================== USERS (Kelola Akun) ====================
      // Migrasi dari Google Sheets/Apps Script ke D1, biar konsisten sama
      // List PO & Histori Pembelian yang udah duluan pakai D1.
      if (path === '/api/users/list' && request.method === 'GET') {
        const { results } = await env.DB.prepare(
          `SELECT username, nama, role, menus, can_approve_po as canApprovePo FROM users ORDER BY id ASC`
        ).all();
        return json(results);
      }

      if (path === '/api/users/login' && request.method === 'POST') {
        const b = await readBody(request);
        const row = await env.DB.prepare(
          `SELECT username, password, nama, role, menus, can_approve_po as canApprovePo FROM users WHERE username = ?`
        ).bind(b.username || '').first();
        if (row && String(row.password) === String(b.password || '')) {
          return json({
            success: true,
            nama: row.nama,
            role: String(row.role).trim().toLowerCase() === 'full' ? 'full' : 'terbatas',
            menus: row.menus || '',
            canApprovePo: row.canApprovePo || ''
          });
        }
        return json({ success: false, message: 'Username atau password salah.' });
      }

      if (path === '/api/users/save' && request.method === 'POST') {
        const b = await readBody(request);
        if (!b.username) return json({ success: false, message: 'Username kosong' });
        const existing = await env.DB.prepare(`SELECT id FROM users WHERE username = ?`).bind(b.username).first();
        if (existing) {
          await env.DB.prepare(
            `UPDATE users SET password=?, nama=?, role=?, menus=?, can_approve_po=? WHERE username=?`
          ).bind(b.password || '', b.nama || '', b.role || 'terbatas', b.menus || '', b.canApprovePo || '', b.username).run();
          return json({ success: true, updated: true });
        }
        await env.DB.prepare(
          `INSERT INTO users (username, password, nama, role, menus, can_approve_po) VALUES (?, ?, ?, ?, ?, ?)`
        ).bind(b.username, b.password || '', b.nama || '', b.role || 'terbatas', b.menus || '', b.canApprovePo || '').run();
        return json({ success: true, created: true });
      }

      if (path === '/api/users/delete' && request.method === 'POST') {
        const b = await readBody(request);
        if (!b.username) return json({ success: false, message: 'Username kosong' });
        await env.DB.prepare(`DELETE FROM users WHERE username = ?`).bind(b.username).run();
        return json({ success: true });
      }

      // ==================== PURCHASE HISTORY (Histori Pembelian) ====================
      if (path === '/api/pembelian/list' && request.method === 'GET') {
        const search = (url.searchParams.get('search') || '').trim();
        let query = `SELECT id, no_po as noPo, barang, kode, variasi, qty, satuan,
                            tanggal_pengajuan as tanggalPengajuan, requestor, total_bayar as expense,
                            tenggat_bayar as tenggatBayar,
                            status_pembayaran as statusPembayaran, status_purchasing as statusPurchasing,
                            tanggal_complete as tanggalComplete, notes
                     FROM purchase_history`;
        let stmt;
        if (search) {
          query += ` WHERE no_po LIKE ? OR barang LIKE ? OR requestor LIKE ? OR variasi LIKE ? ORDER BY id DESC`;
          const like = `%${search}%`;
          stmt = env.DB.prepare(query).bind(like, like, like, like);
        } else {
          query += ` ORDER BY id DESC`;
          stmt = env.DB.prepare(query);
        }
        const { results } = await stmt.all();
        return json(results);
      }

      if (path === '/api/pembelian/submit' && request.method === 'POST') {
        const b = await readBody(request);
        const result = await env.DB.prepare(
          `INSERT INTO purchase_history (no_po, barang, kode, variasi, qty, satuan, tanggal_pengajuan, requestor, total_bayar, tenggat_bayar, status_pembayaran, status_purchasing, tanggal_complete, notes)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          b.noPo || '', b.barang || '', b.kode || '', b.variasi || '',
          b.qty || 0, b.satuan || '', b.tanggalPengajuan || '', b.requestor || '',
          b.expense || 0, b.tenggatBayar || '', b.statusPembayaran || '', b.statusPurchasing || '',
          b.tanggalComplete || '', b.notes || ''
        ).run();
        return json({ success: true, id: result.meta.last_row_id });
      }

      if (path === '/api/pembelian/update' && request.method === 'POST') {
        const b = await readBody(request);
        await env.DB.prepare(
          `UPDATE purchase_history SET no_po=?, barang=?, kode=?, variasi=?, qty=?, satuan=?, tanggal_pengajuan=?, requestor=?, total_bayar=?, tenggat_bayar=?, status_pembayaran=?, status_purchasing=?, tanggal_complete=?, notes=? WHERE id=?`
        ).bind(
          b.noPo || '', b.barang || '', b.kode || '', b.variasi || '',
          b.qty || 0, b.satuan || '', b.tanggalPengajuan || '', b.requestor || '',
          b.expense || 0, b.tenggatBayar || '', b.statusPembayaran || '', b.statusPurchasing || '',
          b.tanggalComplete || '', b.notes || '', b.id
        ).run();
        return json({ success: true });
      }

      if (path === '/api/pembelian/delete' && request.method === 'POST') {
        const b = await readBody(request);
        await env.DB.prepare(`DELETE FROM purchase_history WHERE id = ?`).bind(b.id).run();
        return json({ success: true });
      }

      // ==================== FALLBACK: STATIC ASSETS ====================
      return env.ASSETS.fetch(request);

    } catch (err) {
      return json({ success: false, message: err.toString() }, 500);
    }
  }
};
