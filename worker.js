export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // 1. Aturan CORS
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, X-Mobile-Token",
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

    // Helper: generate random token 32 karakter
    function generateToken() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let token = '';
      const arr = new Uint8Array(32);
      crypto.getRandomValues(arr);
      for (let i = 0; i < 32; i++) token += chars[arr[i] % chars.length];
      return token;
    }

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
        const mapped = fixCasing(results, ["username", "nama", "password", "role", "menus", "canApprovePo", "mobile_access"]);
        return jsonResp(mapped);
      }

      if (method === "POST" && path === "/api/users/save") {
        const b = await request.json();
        const mobileAccess = b.mobile_access === true || b.mobile_access === 1 ? 1 : 0;
        await env.DB.prepare("INSERT INTO users (username, nama, password, role, menus, canApprovePo, mobile_access) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(username) DO UPDATE SET nama=excluded.nama, password=excluded.password, role=excluded.role, menus=excluded.menus, canApprovePo=excluded.canApprovePo, mobile_access=excluded.mobile_access")
          .bind(b.username, b.nama, b.password, b.role, b.menus, b.canApprovePo, mobileAccess).run();
        return jsonResp({ success: true });
      }

      if (method === "POST" && path === "/api/users/delete") {
        const b = await request.json();
        await env.DB.prepare("DELETE FROM users WHERE username = ?").bind(b.username).run();
        return jsonResp({ success: true });
      }

      // ==========================================
      // [6] API AUTH MOBILE (BARU)
      // ==========================================

      // POST /api/mobile/login
      // Body: { username, password }
      // Cek user di tabel users, cek mobile_access = 1, generate token, simpan ke mobile_sessions
      if (method === "POST" && path === "/api/mobile/login") {
        const b = await request.json();
        if (!b.username || !b.password) {
          return jsonResp({ success: false, message: "Username dan password wajib diisi." }, 400);
        }

        // Cek user + password + mobile_access
        const user = await env.DB.prepare(
          "SELECT username, nama, mobile_access FROM users WHERE username = ? AND password = ?"
        ).bind(b.username, b.password).first();

        if (!user) {
          return jsonResp({ success: false, message: "Username atau password salah." });
        }

        if (!user.mobile_access) {
          return jsonResp({ success: false, message: "Akun ini tidak memiliki akses ke Latela OMS Mobile. Hubungi admin." });
        }

        // Hapus token lama user ini (opsional, biar tidak numpuk)
        await env.DB.prepare("DELETE FROM mobile_sessions WHERE username = ?").bind(user.username).run();

        // Generate token baru
        const token = generateToken();
        const now = new Date().toISOString();

        await env.DB.prepare(
          "INSERT INTO mobile_sessions (username, token, created_at) VALUES (?, ?, ?)"
        ).bind(user.username, token, now).run();

        return jsonResp({
          success: true,
          token,
          nama: user.nama,
          username: user.username
        });
      }

      // POST /api/mobile/verify
      // Header: X-Mobile-Token: <token>
      // Dipakai mobile app untuk validasi token masih aktif
      if (method === "POST" && path === "/api/mobile/verify") {
        const token = request.headers.get("X-Mobile-Token") || "";
        if (!token) return jsonResp({ success: false, message: "Token tidak ditemukan." }, 401);

        const session = await env.DB.prepare(
          "SELECT s.username, u.nama FROM mobile_sessions s JOIN users u ON s.username = u.username WHERE s.token = ? AND u.mobile_access = 1"
        ).bind(token).first();

        if (!session) {
          return jsonResp({ success: false, message: "Token tidak valid atau akses dicabut." }, 401);
        }

        return jsonResp({ success: true, username: session.username, nama: session.nama });
      }

      // POST /api/mobile/logout
      // Header: X-Mobile-Token: <token>
      if (method === "POST" && path === "/api/mobile/logout") {
        const token = request.headers.get("X-Mobile-Token") || "";
        if (token) {
          await env.DB.prepare("DELETE FROM mobile_sessions WHERE token = ?").bind(token).run();
        }
        return jsonResp({ success: true });
      }

      // ==========================================
      // [5] API RETUR
      // ==========================================

      // GET /api/retur/list — ambil semua data retur aktif
      if (method === "GET" && path === "/api/retur/list") {
        const { results } = await env.DB.prepare("SELECT * FROM retur_items ORDER BY updated_at DESC").all();
        return jsonResp(results);
      }

      // POST /api/retur/submit — tambah/update item retur dari app mobile
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

      // POST /api/retur/reset — hapus semua data retur
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
