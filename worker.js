export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // 1. Aturan CORS (Sangat penting agar Frontend bisa akses API)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // 2. Tangani Preflight Request dari Browser
    if (method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    // Helper function untuk merespon JSON dengan cepat
    const jsonResp = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });

    try {
      // ==========================================
      // [1] API MASTER SKU (Fungsi Baru yang Tadi Berhasil)
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
        const batchStmts = rows.map(r => stmt.bind(r.sku, r.nama, r.type, r.warna, r.kategori));
        
        for (let i = 0; i < batchStmts.length; i += 100) {
          await env.DB.batch(batchStmts.slice(i, i + 100));
        }
        return jsonResp({ success: true, count: rows.length });
      }

      // ==========================================
      // [2] API PROCUREMENT & LIST PO
      // ==========================================
      if (method === "GET" && path === "/api/po/list") {
        // Tampilkan dari yang terbaru
        const { results } = await env.DB.prepare("SELECT * FROM po_list ORDER BY id DESC").all();
        return jsonResp(results);
      }
      
      if (method === "POST" && path === "/api/po/submit") {
        const b = await request.json();
        await env.DB.prepare("INSERT INTO po_list (noPo, tanggal, vendor, items, dibuatOleh, status) VALUES (?, ?, ?, ?, ?, 'Pending')")
          .bind(b.noPo, b.tanggal, b.vendor, b.items, b.dibuatOleh).run();
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
        return jsonResp(results);
      }
      
      if (method === "POST" && path === "/api/pembelian/submit") {
        const b = await request.json();
        await env.DB.prepare("INSERT INTO purchase_history (noPo, barang, kode, variasi, qty, satuan, tanggalPengajuan, requestor, expense, tenggatBayar, statusPembayaran, statusPurchasing, tanggalComplete, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
          .bind(b.noPo, b.barang, b.kode, b.variasi, b.qty, b.satuan, b.tanggalPengajuan, b.requestor, b.expense, b.tenggatBayar, b.statusPembayaran, b.statusPurchasing, b.tanggalComplete, b.notes).run();
        return jsonResp({ success: true });
      }
      
      if (method === "POST" && path === "/api/pembelian/update") {
        const b = await request.json();
        await env.DB.prepare("UPDATE purchase_history SET noPo=?, barang=?, kode=?, variasi=?, qty=?, satuan=?, tanggalPengajuan=?, requestor=?, expense=?, tenggatBayar=?, statusPembayaran=?, statusPurchasing=?, tanggalComplete=?, notes=? WHERE id=?")
          .bind(b.noPo, b.barang, b.kode, b.variasi, b.qty, b.satuan, b.tanggalPengajuan, b.requestor, b.expense, b.tenggatBayar, b.statusPembayaran, b.statusPurchasing, b.tanggalComplete, b.notes, b.id).run();
        return jsonResp({ success: true });
      }
      
      if (method === "POST" && path === "/api/pembelian/delete") {
        const b = await request.json();
        await env.DB.prepare("DELETE FROM purchase_history WHERE id = ?").bind(b.id).run();
        return jsonResp({ success: true });
      }

      // ==========================================
      // [4] API KELOLA AKUN (LOGIN & USERS)
      // ==========================================
      if (method === "POST" && path === "/api/users/login") {
        const b = await request.json();
        const user = await env.DB.prepare("SELECT * FROM users WHERE username = ? AND password = ?").bind(b.username, b.password).first();
        if (user) {
          return jsonResp({ success: true, nama: user.nama, role: user.role, menus: user.menus, canApprovePo: user.canApprovePo });
        }
        return jsonResp({ success: false, message: "Username atau password salah." });
      }
      
      if (method === "GET" && path === "/api/users/list") {
        const { results } = await env.DB.prepare("SELECT * FROM users").all();
        return jsonResp(results);
      }
      
      if (method === "POST" && path === "/api/users/save") {
        const b = await request.json();
        // Insert jika baru, Update jika username sudah ada
        await env.DB.prepare("INSERT INTO users (username, nama, password, role, menus, canApprovePo) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(username) DO UPDATE SET nama=excluded.nama, password=excluded.password, role=excluded.role, menus=excluded.menus, canApprovePo=excluded.canApprovePo")
          .bind(b.username, b.nama, b.password, b.role, b.menus, b.canApprovePo).run();
        return jsonResp({ success: true });
      }
      
      if (method === "POST" && path === "/api/users/delete") {
        const b = await request.json();
        await env.DB.prepare("DELETE FROM users WHERE username = ?").bind(b.username).run();
        return jsonResp({ success: true });
      }

      // Jika ada API lain yang tidak terdeteksi
      return jsonResp({ success: false, message: "Endpoint tidak ditemukan" }, 404);

    } catch (error) {
      return jsonResp({ success: false, message: error.message }, 500);
    }
  }
};
