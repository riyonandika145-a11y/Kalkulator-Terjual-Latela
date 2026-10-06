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

    // Helper: Penyelamat huruf besar/kecil (Case Insensitive Mapper)
    // Otomatis menyesuaikan nama kolom dari DB (misal: 'nopo', 'no_po') ke format yang dibaca Frontend ('noPo')
    const fixCasing = (rows, expectedKeys) => {
      return rows.map(row => {
        const obj = { ...row }; // Gandakan data asli
        const lowerMap = {};
        for (let k in row) lowerMap[k.toLowerCase().replace(/_/g, '')] = k;
        
        expectedKeys.forEach(ek => {
           const match = lowerMap[ek.toLowerCase()];
           if (match) obj[ek] = row[match]; // Buat key baru dengan format yang pas untuk Frontend
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
        const { results } = await env.DB.prepare("SELECT * FROM po_list ORDER BY id DESC").all();
        // Terapkan helper agar noPo dan dibuatOleh terdeteksi
        const mapped = fixCasing(results, ["noPo", "tanggal", "vendor", "items", "dibuatOleh", "status"]);
        return jsonResp(mapped);
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
        const mapped = fixCasing(results, ["noPo", "barang", "kode", "variasi", "qty", "satuan", "tanggalPengajuan", "requestor", "expense", "tenggatBayar", "statusPembayaran", "statusPurchasing", "tanggalComplete", "notes"]);
        return jsonResp(mapped);
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

      return jsonResp({ success: false, message: "Endpoint tidak ditemukan" }, 404);

    } catch (error) {
      return jsonResp({ success: false, message: error.message }, 500);
    }
  }
};
