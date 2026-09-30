export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Aturan CORS (Agar frontend Latela OMS bisa mengakses API ini)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // 2. Tangani Preflight Request dari Browser (OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // ==========================================
      // [GET] /api/mastersku/list
      // Dipanggil saat tombol "Sync" diklik atau aplikasi baru dibuka
      // ==========================================
      if (request.method === "GET" && url.pathname === "/api/mastersku/list") {
        const { results } = await env.DB.prepare("SELECT * FROM master_sku").all();
        
        return new Response(JSON.stringify(results), {
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }

      // ==========================================
      // [POST] /api/mastersku/import
      // Dipanggil saat tombol "Import dari Spreadsheet" diklik
      // ==========================================
      if (request.method === "POST" && url.pathname === "/api/mastersku/import") {
        const body = await request.json();
        const rows = body.rows || [];

        if (!rows.length) {
          return new Response(JSON.stringify({ success: false, message: "Data dari spreadsheet kosong." }), {
            headers: { "Content-Type": "application/json", ...corsHeaders }
          });
        }

        // Langkah A: Hapus semua data lama (Replace Total)
        await env.DB.prepare("DELETE FROM master_sku").run();

        // Langkah B: Siapkan template perintah Insert ke database
        const stmt = env.DB.prepare(
          "INSERT INTO master_sku (sku, nama, type, warna, kategori) VALUES (?, ?, ?, ?, ?)"
        );
        
        // Buat daftar perintah insert untuk semua baris
        const batchStmts = rows.map(r => 
          stmt.bind(r.sku, r.nama, r.type, r.warna, r.kategori)
        );

        // Langkah C: Eksekusi Insert dengan sistem Chunk (Batas aman D1 adalah 100 baris per eksekusi)
        const chunkSize = 100;
        for (let i = 0; i < batchStmts.length; i += chunkSize) {
          const chunk = batchStmts.slice(i, i + chunkSize);
          await env.DB.batch(chunk);
        }

        // Beri tahu frontend bahwa import berhasil
        return new Response(JSON.stringify({ success: true, count: rows.length }), {
          headers: { "Content-Type": "application/json", ...corsHeaders }
        });
      }

      // Jika endpoint tidak ditemukan (404)
      return new Response(JSON.stringify({ success: false, message: "Endpoint tidak ditemukan" }), { 
        status: 404, 
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });

    } catch (error) {
      // Tangkap Error dan tampilkan ke layar (agar loading tidak stuck)
      return new Response(JSON.stringify({ success: false, message: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }
  }
};
