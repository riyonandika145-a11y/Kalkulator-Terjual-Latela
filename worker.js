export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // 1. Aturan CORS
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (method === "OPTIONS") return new Response(null, { headers: corsHeaders });
    const jsonResp = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });

    // Helper: Penyelamat huruf besar/kecil
    const fixCasing = (rows, expectedKeys) => {
      return rows.map(row => {
        const obj = { ...row };
        const lowerMap = {};
        for (let k in row) lowerMap[k.toLowerCase().replace(/_/g, '')] = k;
        expectedKeys.forEach(ek => {
           const match = lowerMap[ek.toLowerCase()];
           if (match) obj[ek] = row[match];
        });
        return obj;
      });
    };

    try {
      // ==========================================
      // [1] API MASTER SKU
      // ==========================================
      if (method === "GET" && path === "/api/mastersku/list") {
        const { results } = await env.DB.prepare("SELECT * FROM master_sku").all();
        return jsonResp(results);
      }
      if (method === "POST" && path === "/api/mastersku/import") {
        const { rows = [] } = await request.json();
        if (!rows.length) return jsonResp({ success: false, message: "Data kosong." });
        await env.DB.prepare("DELETE FROM master_sku").run();
        const stmt = env.DB.prepare("INSERT INTO master_sku (sku, nama, type, warna, kategori) VALUES (?, ?, ?, ?, ?)");
        const batchStmts = rows.map(r => stmt.bind(r.sku || "-", r.nama || "-", r.type || "-", r.warna || "-", r.kategori || "-"));
        for (let i = 0; i < batchStmts.length; i += 100) await env.DB.batch(batchStmts.slice(i, i + 100));
        return jsonResp({ success: true, count: rows.length });
      }

      // ==========================================
      // [2] API PROCUREMENT & LIST PO
      // ==========================================
      if (method === "GET" && path === "/api/po/list") {
        const { results } = await env.DB.prepare("SELECT * FROM po_list ORDER BY id DESC").all();
        const mapped = fixCasing(results, ["id", "noPo", "tanggal", "vendor", "items", "dibuatOleh", "status"]);
        return jsonResp(mapped);
      }

      if (method === "POST" && path === "/api/po/submit") {
        const b = await request.json();
        const noPo = b.noPo || "-";
        const tanggal = b.tanggal || "-";
        const vendor = b.vendor || "-";
        const dibuatOleh = b.dibuatOleh || "-";
        const itemsStr = typeof b.items === 'object' ? JSON.stringify(b.items) : (b.items || "[]");

        await env.DB.prepare("INSERT INTO po_list (noPo, tanggal, vendor, items, dibuatOleh, status) VALUES (?, ?, ?, ?, ?, 'Pending')")
          .bind(noPo, tanggal, vendor, itemsStr, dibuatOleh).run();

        return jsonResp({ success: true });
      }

      if (method === "POST" && path === "/api/po/update-status") {
        const b = await request.json();
        await env.DB.prepare("UPDATE po_list SET status = ? WHERE id = ?").bind(b.status, b.id).run();
        return jsonResp({ success: true });
      }

      if (method === "POST" && path === "/api/po/delete") {
        const b = await request.json();
        await env.DB.prepare("DELETE FROM po_list WHERE id = ?").bind(b.id).run();
        return jsonResp({ success: true });
      }

      // ==========================================
      // [3] API HISTORI PEMBELIAN
      // ==========================================
      if (method === "GET" && path === "/api/pembelian/list") {
        const { results } = await env.DB.prepare("SELECT * FROM purchase_history ORDER BY id DESC").all();
        const mapped = fixCasing(results, ["id", "noPo", "barang", "kode", "variasi", "qty", "satuan", "tanggalPengajuan", "requestor", "expense", "tenggatBayar", "statusPembayaran", "statusPurchasing", "tanggalComplete", "notes"]);
        return jsonResp(mapped);
      }

      if (method === "POST" && path === "/api/pembelian/submit") {
        const b = await request.json();
        const qty = b.qty ? Number(b.qty) : 0;
        const expense = b.expense ? Number(b.expense) : 0;

        await env.DB.prepare("INSERT INTO purchase_history (noPo, barang, kode, variasi, qty, satuan, tanggalPengajuan, requestor, expense, tenggatBayar, statusPembayaran, statusPurchasing, tanggalComplete, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
          .bind(b.noPo || "-", b.barang || "-", b.kode || "-", b.variasi || "-", qty, b.satuan || "-", b.tanggalPengajuan || "-", b.requestor || "-", expense, b.tenggatBayar || "-", b.statusPembayaran || "Unpaid", b.statusPurchasing || "Proses", b.tanggalComplete || "-", b.notes || "-").run();
        return jsonResp({ success: true });
      }

      if (method === "POST" && path === "/api/pembelian/update") {
        const b = await request.json();
        const qty = b.qty ? Number(b.qty) : 0;
        const expense = b.expense ? Number(b.expense) : 0;

        await env.DB.prepare("UPDATE purchase_history SET noPo=?, barang=?, kode=?, variasi=?, qty=?, satuan=?, tanggalPengajuan=?, requestor=?, expense=?, tenggatBayar=?, statusPembayaran=?, statusPurchasing=?, tanggalComplete=?, notes=? WHERE id=?")
          .bind(b.noPo || "-", b.barang || "-", b.kode || "-", b.variasi || "-", qty, b.satuan || "-", b.tanggalPengajuan || "-", b.requestor || "-", expense, b.tenggatBayar || "-", b.statusPembayaran || "Unpaid", b.statusPurchasing || "Proses", b.tanggalComplete || "-", b.notes || "-", b.id).run();
        return jsonResp({ success: true });
      }

      if (method === "POST" && path === "/api/pembelian/delete") {
        const b = await request.json();
        await env.DB.prepare("DELETE FROM purchase_history WHERE id = ?").bind(b.id).run();
        return jsonResp({ success: true });
      }

      // ==========================================
      // [4] API KELOLA AKUN
      // ==========================================
      if (method === "POST" && path === "/api/users/login") {
        const b = await request.json();
        const user = await env.DB.prepare("SELECT * FROM users WHERE username = ? AND password = ?").bind(b.username, b.password).first();
        if (user) {
          const mappedUser = fixCasing([user], ["nama", "role", "menus", "canApprovePo"])[0];
          return jsonResp({ success: true, nama: mappedUser.nama, role: mappedUser.role, menus: mappedUser.menus, canApprovePo: mappedUser.canApprovePo });
        }
        return jsonResp({ success: false, message: "Username atau password salah." });
      }

      if (method === "GET" && path === "/api/users/list") {
        const { results } = await env.DB.prepare("SELECT * FROM users").all();
        const mapped = fixCasing(results, ["username", "nama", "password", "role", "menus", "canApprovePo"]);
        return jsonResp(mapped);
      }

      if (method === "POST" && path === "/api/users/save") {
        const b = await request.json();
        await env.DB.prepare("INSERT INTO users (username, nama, password, role, menus, canApprovePo) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(username) DO UPDATE SET nama=excluded.nama, password=excluded.password, role=excluded.role, menus=excluded.menus, canApprovePo=excluded.canApprovePo")
          .bind(b.username, b.nama, b.password, b.role, b.menus, b.canApprovePo).run();
        return jsonResp({ success: true });
      }

      if (method === "POST" && path === "/api/users/delete") {
        const b = await request.json();
        await env.DB.prepare("DELETE FROM users WHERE username = ?").bind(b.username).run();
        return jsonResp({ success: true });
      }

      // ==========================================
      // [5] API RETUR
      // Tabel D1: retur_items (sku, nama, type, warna, kategori, qty, updated_at)
      // SQL buat bikin tabel (jalanin sekali di Cloudflare Dashboard):
      // CREATE TABLE IF NOT EXISTS retur_items (
      //   id INTEGER PRIMARY KEY AUTOINCREMENT,
      //   sku TEXT NOT NULL UNIQUE,
      //   nama TEXT DEFAULT '-',
      //   type TEXT DEFAULT '-',
      //   warna TEXT DEFAULT '-',
      //   kategori TEXT DEFAULT 'utama',
      //   qty INTEGER DEFAULT 0,
      //   updated_at TEXT
      // );
      // ==========================================

      // GET /api/retur/list — ambil semua data retur aktif
      if (method === "GET" && path === "/api/retur/list") {
        const { results } = await env.DB.prepare("SELECT * FROM retur_items ORDER BY updated_at DESC").all();
        return jsonResp(results);
      }

      // POST /api/retur/submit — tambah/update item retur dari app mobile
      // Body: { sku, nama, type, warna, kategori, qty }
      // Kalau SKU sudah ada di tabel → qty ditambahkan (upsert/accumulate)
      if (method === "POST" && path === "/api/retur/submit") {
        const b = await request.json();
        if (!b.sku) return jsonResp({ success: false, message: "SKU wajib diisi." }, 400);
        const qty = b.qty ? Number(b.qty) : 1;
        const now = new Date().toISOString();
        const existing = await env.DB.prepare("SELECT id, qty FROM retur_items WHERE sku = ?").bind(b.sku).first();
        if (existing) {
          await env.DB.prepare("UPDATE retur_items SET qty = qty + ?, updated_at = ? WHERE sku = ?")
            .bind(qty, now, b.sku).run();
        } else {
          await env.DB.prepare("INSERT INTO retur_items (sku, nama, type, warna, kategori, qty, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
            .bind(b.sku, b.nama || "-", b.type || "-", b.warna || "-", b.kategori || "utama", qty, now).run();
        }
        return jsonResp({ success: true });
      }

      // POST /api/retur/update-qty — edit manual qty 1 SKU dari web OMS
      if (method === "POST" && path === "/api/retur/update-qty") {
        const b = await request.json();
        if (!b.sku) return jsonResp({ success: false, message: "SKU wajib diisi." }, 400);
        const now = new Date().toISOString();
        await env.DB.prepare("UPDATE retur_items SET qty = ?, updated_at = ? WHERE sku = ?")
          .bind(Number(b.qty) || 0, now, b.sku).run();
        return jsonResp({ success: true });
      }

      // POST /api/retur/delete-one — hapus 1 item retur berdasarkan SKU
      if (method === "POST" && path === "/api/retur/delete-one") {
        const b = await request.json();
        await env.DB.prepare("DELETE FROM retur_items WHERE sku = ?").bind(b.sku).run();
        return jsonResp({ success: true });
      }

      // POST /api/retur/reset — hapus semua data retur (setelah di-copy ke spreadsheet)
      if (method === "POST" && path === "/api/retur/reset") {
        await env.DB.prepare("DELETE FROM retur_items").run();
        return jsonResp({ success: true });
      }

      return jsonResp({ success: false, message: "Endpoint tidak ditemukan" }, 404);
    } catch (error) {
      return jsonResp({ success: false, message: error.message }, 500);
    }
  }
};
