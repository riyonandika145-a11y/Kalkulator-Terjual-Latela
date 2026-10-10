// --- CARI FUNGSI YANG MIRIP SEPERTI INI DI app.js ANDA ---
function openPoDetailModal(po) {
    // ... kode yang mengatur tampilan modal ...

    let itemsToDisplay = [];
    
    // TAMBAHKAN PENGECEKAN INI:
    // Terjemahkan string dari database kembali menjadi daftar item (Array)
    try {
        if (typeof po.items === 'string') {
            itemsToDisplay = JSON.parse(po.items);
        } else if (Array.isArray(po.items)) {
            itemsToDisplay = po.items;
        }
    } catch (e) {
        console.error("Gagal membaca item PO:", e);
        itemsToDisplay = []; // Kosongkan jika formatnya rusak
    }

    // ... sisa kode Anda yang menggunakan itemsToDisplay untuk membuat <tr> ...
    // Pastikan kode di bawahnya menggunakan variabel 'itemsToDisplay', bukan 'po.items' lagi.
    
    const tbody = document.getElementById("detailPoTableBody"); // sesuaikan id-nya
    tbody.innerHTML = "";
    itemsToDisplay.forEach((item, index) => {
        // Buat baris tabel untuk setiap item
        tbody.innerHTML += `
           <tr>
               <td>${index + 1}</td>
               <td>${item.barang}</td>
               <td>${item.qty} ${item.satuan}</td>
               <!-- ... dan seterusnya ... -->
           </tr>
        `;
    });
}
