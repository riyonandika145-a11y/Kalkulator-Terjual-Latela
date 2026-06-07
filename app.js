// =========================================================================
// CLOUD DATABASE CONFIGURATION (GOOGLE SHEETS)
// =========================================================================
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRx0w6ouZ_PYXUTdbqqT_CCslwLR-hdY3c311M7jAzPlskawLg2ewiGPQ_gLZ1K4EjQPI_7_qfp3pzb/pub?gid=0&single=true&output=csv";

// --- DOM SELEKTORS ---
const menuItems = document.querySelectorAll('.menu-item');
const contentViews = document.querySelectorAll('.content-view');
const subTabs = document.querySelectorAll('.sub-tab');
const subTablePanels = document.querySelectorAll('.sub-table-panel');

const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
const sidebarElement = document.querySelector('.sidebar');

const btnAddFile = document.getElementById('btn-add-file');
const fileInput = document.getElementById('file-input');
const btnFileReset = document.getElementById('btn-file-reset');
const fileBadge = document.getElementById('file-badge');
const statusBar = document.getElementById('status-bar');

const dropdownFilter = document.getElementById('filter-dropdown');
const btnFilterReset = document.getElementById('btn-filter-reset');
const btnSaveHistory = document.getElementById('btn-save-history');
const btnCopyQty = document.getElementById('btn-copy-qty');

const btnExportToggle = document.getElementById('btn-export-toggle');
const exportMenuItems = document.getElementById('export-menu-items');
const btnExportXlsx = document.getElementById('btn-export-xlsx');
const btnExportCsv = document.getElementById('btn-export-csv');

const tbodyUtama = document.getElementById('tbody-utama');
const tbodyAksesoris = document.getElementById('tbody-aksesoris');
const tbodyGradeb = document.getElementById('tbody-gradeb'); 
const tbodyMasterList = document.getElementById('tbody-master-list');
const masterSkuCount = document.getElementById('master-sku-count');
const btnSyncCloud = document.getElementById('btn-sync-cloud');

const dashTotalTerjual = document.getElementById('dash-total-terjual');
const dashSkuAktif = document.getElementById('dash-sku-aktif');
const dashFileCount = document.getElementById('dash-file-count');

// --- STATE MANAGEMENT ---
let masterSkus = {}; 
let globalDataKategori = { utama: {}, aksesoris: {}, gradeb: {} };
let totalMasterFiles = 0;
let activeFilterText = "all";
let historyLogs = [];

// --- INITIAL BOOTSTRAP SINKRONISASI CLOUD ---
window.addEventListener('DOMContentLoaded', () => {
    const savedSidebarState = localStorage.getItem('sidebarState');
    if (savedSidebarState === 'collapsed') {
        sidebarElement.classList.add('collapsed');
        btnToggleSidebar.innerText = "❯";
    }
    fetchMasterSkusFromCloud();
});

// EVENT LOGIKA TOGGLE SIDEBAR
btnToggleSidebar.addEventListener('click', () => {
    sidebarElement.classList.toggle('collapsed');
    if (sidebarElement.classList.contains('collapsed')) {
        btnToggleSidebar.innerText = "❯";
        localStorage.setItem('sidebarState', 'collapsed');
    } else {
        btnToggleSidebar.innerText = "☰";
        localStorage.setItem('sidebarState', 'expanded');
    }
});

btnSyncCloud.addEventListener('click', () => {
    fetchMasterSkusFromCloud();
});

// 1. ENGINE AMBIL DATA TERPUSAT DARI GOOGLE SHEETS
function fetchMasterSkusFromCloud() {
    updateStatusMessage("Menghubungkan ke Google Sheets Cloud Database...");
    tbodyMasterList.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #94a3b8; font-style: italic;">Sinkronisasi data terpusat...</td></tr>`;

    fetch(GOOGLE_SHEET_URL)
        .then(response => {
            if (!response.ok) throw new Error("Gagal mengambil data dari URL Google Sheets. Periksa status publish.");
            return response.arrayBuffer();
        })
        .then(buffer => {
            const data = new Uint8Array(buffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            masterSkus = {};

            jsonData.forEach(row => {
                const skuCode = row['SKU'] || row['sku'] || row['Code'];
                const namaResmi = row['Nama'] || row['nama'] || row['Product'];
                const typeProduk = row['Type'] || row['type'] || '-';
                const warnaProduk = row['Warna'] || row['warna'] || '-';
                const kategoriLogistik = row['Kategori'] || row['kategori'] || 'utama';

                if (skuCode) {
                    masterSkus[skuCode.toString().trim()] = {
                        nama: namaResmi ? namaResmi.toString().trim().toUpperCase() : "TANPA NAMA",
                        type: typeProduk.toString().trim(),
                        warna: warnaProduk.toString().trim(),
                        kategori: kategoriLogistik.toString().trim().toLowerCase()
                    };
                }
            });

            updateStatusMessage("Master SKU berhasil disinkronisasi dari Google Sheets.");
            renderMasterSkuDatabaseView();
            resetKalkulatorDataState();
        })
        .catch(err => {
            console.error(err);
            updateStatusMessage("Gagal menyinkronkan data.");
            tbodyMasterList.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #dc2626; font-weight: bold; padding: 20px;">⚠️ SISTEM EROR: ${err.message}<br><span style="font-size: 12px; font-weight: normal; color: #64748b; display: block; margin-top: 5px;">Silakan tekan CTRL + F5. Jika pesan ini tetap muncul, laporkan teks eror di atas.</span></td></tr>`;
        });
}

// 2. KENDALI SIDEBAR MENU
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(btn => btn.classList.remove('active'));
        item.classList.add('active');
        contentViews.forEach(view => view.classList.remove('active'));
        document.getElementById(`view-${item.getAttribute('data-target')}`).classList.add('active');
    });
});

// 3. KENDALI SUB-TABS KATEGORI
subTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        subTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        subTablePanels.forEach(p => p.classList.remove('active'));
        document.getElementById(`panel-${tab.getAttribute('data-category')}`).classList.add('active');
    });
});

function renderMasterSkuDatabaseView() {
    tbodyMasterList.innerHTML = '';
    const sortedKeys = Object.keys(masterSkus).sort();
    masterSkuCount.innerText = sortedKeys.length;

    if (sortedKeys.length === 0) {
        tbodyMasterList.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #94a3b8; font-style: italic;">Google Sheet terbaca, tapi data kosong.</td></tr>`;
        return;
    }

    sortedKeys.forEach(sku => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><code>${sku}</code></td>
            <td><strong>${masterSkus[sku].nama}</strong></td>
            <td>${masterSkus[sku].type}</td>
            <td>${masterSkus[sku].warna}</td>
            <td style="text-transform: uppercase; font-size:12px;">${masterSkus[sku].kategori}</td>
        `;
        tbodyMasterList.appendChild(tr);
    });
    populateFilterDropdown();
}

function resetKalkulatorDataState() {
    globalDataKategori = { utama: {}, aksesoris: {}, gradeb: {} };
    
    Object.keys(masterSkus).forEach(sku => {
        const kat = masterSkus[sku].kategori;
        if (globalDataKategori[kat]) {
            globalDataKategori[kat][sku] = {
                nama: masterSkus[sku].nama,
                type: masterSkus[sku].type,
                warna: masterSkus[sku].warna,
                qty: 0
            };
        }
    });
    refreshAllTables();
}

// 4. MANAGEMENT IMPORT EXCEL MANIFEST MARKETPLACE
btnAddFile.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => processExcelEngine(e.target.files[0]));

function processExcelEngine(file) {
    if (!file) return;
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        updateStatusMessage('Format file ditolak, wajib file Excel!');
        return;
    }
    updateStatusMessage(`Sedang mengurai berkas harian: ${file.name}...`);
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            ekstrakDanHitungPenjualan(jsonData);
        } catch (err) {
            updateStatusMessage('Gagal memproses file Excel.');
        }
    };
    reader.readAsArrayBuffer(file);
}

function ekstrakDanHitungPenjualan(data) {
    let skuTerdeteksiDiManifest = new Set();

    data.forEach(row => {
        const sku = row['Nomor SKU'] || row['Seller SKU'] || row['Kode SKU'] || row['SKU Penjual'] || row['SKU Induk'] || row['SKU'];
        const qty = parseInt(row['Jumlah'] || row['Quantity'] || row['Kuantitas'] || row['Qty'] || 0, 10);

        if (sku) {
            const skuClean = sku.toString().trim();
            
            if (masterSkus[skuClean]) {
                const kategori = masterSkus[skuClean].kategori;
                if (globalDataKategori[kategori] && globalDataKategori[kategori][skuClean]) {
                    globalDataKategori[kategori][skuClean].qty += qty;
                    skuTerdeteksiDiManifest.add(skuClean);
                }
            }
        }
    });

    totalMasterFiles += 1;
    fileBadge.innerText = `${totalMasterFiles} File Terupload`;
    
    refreshAllTables();
    updateDashboardMetrics(skuTerdeteksiDiManifest.size);
    updateStatusMessage('Rangkuman data penjualan berhasil diperbarui berdasarkan master cloud Google.');
}

function renderSingleTable(dataKategori, tbodyElement) {
    tbodyElement.innerHTML = '';
    const sortedKeys = Object.keys(dataKategori).sort();

    sortedKeys.forEach(sku => {
        if (activeFilterText !== "all" && sku !== activeFilterText) return;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${sku}</td>
            <td>${dataKategori[sku].nama}</td>
            <td>${dataKategori[sku].type}</td>
            <td>${dataKategori[sku].warna}</td>
            <td>${dataKategori[sku].qty}</td>
        `;
        tbodyElement.appendChild(tr);
    });
}

function refreshAllTables() {
    renderSingleTable(globalDataKategori.utama, tbodyUtama);
    renderSingleTable(globalDataKategori.aksesoris, tbodyAksesoris);
    renderSingleTable(globalDataKategori.gradeb, tbodyGradeb); 
}

function updateDashboardMetrics(skuAktifCount) {
    const sumQty = (obj) => Object.values(obj).reduce((s, i) => s + i.qty, 0);
    const grandTotal = sumQty(globalDataKategori.utama) + sumQty(globalDataKategori.aksesoris) + sumQty(globalDataKategori.gradeb);

    dashTotalTerjual.innerText = grandTotal.toLocaleString('id-ID');
    dashSkuAktif.innerText = skuAktifCount;
    dashFileCount.innerText = totalMasterFiles;
}

// MODIFIKASI FITUR: Sekarang dropdown menampilkan nama produk & tipenya agar scannable
function populateFilterDropdown() {
    dropdownFilter.innerHTML = '<option value="all">-- Tampilkan Semua --</option>';
    Object.keys(masterSkus).sort().forEach(sku => {
        const opt = document.createElement('option');
        opt.value = sku; // Value di balik layar tetap SKU agar filter tidak patah
        
        // Menggabungkan SKU - Nama (Type) untuk teks pilihan admin
        opt.innerText = `${sku} - ${masterSkus[sku].nama} (${masterSkus[sku].type})`;
        dropdownFilter.appendChild(opt);
    });
}

dropdownFilter.addEventListener('change', (e) => { activeFilterText = e.target.value; refreshAllTables(); });
btnFilterReset.addEventListener('click', () => { dropdownFilter.value = "all"; activeFilterText = "all"; refreshAllTables(); });

btnFileReset.addEventListener('click', () => {
    totalMasterFiles = 0;
    fileBadge.innerText = '0 File Terupload';
    resetKalkulatorDataState();
    dashTotalTerjual.innerText = '0';
    dashSkuAktif.innerText = '0';
    dashFileCount.innerText = '0';
    updateStatusMessage('Siap.');
});

function updateStatusMessage(msg) { statusBar.innerText = msg; }

btnCopyQty.addEventListener('click', () => {
    const cat = document.querySelector('.sub-tab.active').getAttribute('data-category');
    const data = globalDataKategori[cat];
    let txt = "SKU\tNama\tType\tWarna\tQty\n";
    Object.keys(data).sort().forEach(k => { 
        txt += `${k}\t${data[k].nama}\t${data[k].type}\t${data[k].warna}\t${data[k].qty}\n`; 
    });
    navigator.clipboard.writeText(txt).then(() => updateStatusMessage('Berhasil copy Qty lengkap ke clipboard.'));
});

btnSaveHistory.addEventListener('click', () => {
    const sumQty = (obj) => Object.values(obj).reduce((s, i) => s + i.qty, 0);
    const total = sumQty(globalDataKategori.utama) + sumQty(globalDataKategori.aksesoris) + sumQty(globalDataKategori.gradeb);
    if (total === 0) return;
    historyLogs.push({ waktu: new Date().toLocaleString('id-ID'), total, files: totalMasterFiles });
    updateStatusMessage('History tersimpan.');

    const historyBox = document.getElementById('history-list-container');
    historyBox.className = "";
    historyBox.innerHTML = '<div class="table-responsive"><table><thead><tr><th>Waktu Simpan</th><th>Files Terproses</th><th>Total Qty Item</th></tr></thead><tbody id="tbody-history"></tbody></table></div>';
    
    const tbodyHist = document.getElementById('tbody-history');
    historyLogs.forEach(log => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${log.waktu}</td><td>${log.files} Berkas</td><td style="color: #ec4899; font-weight: bold; text-align: right; padding-right: 25px;">${log.total} pcs</td>`;
        tbodyHist.appendChild(tr);
    });
});

function generateMasterArrayFormat() {
    let outputMatrix = [["Kategori", "SKU", "Nama Produk", "Type", "Warna", "Kuantitas (Qty)"]];
    
    const insertRows = (namaKategori, dataObjek) => {
        Object.keys(dataObjek).sort().forEach(sku => {
            outputMatrix.push([namaKategori, sku, dataObjek[sku].nama, dataObjek[sku].type, dataObjek[sku].warna, dataObjek[sku].qty]);
        });
    };

    insertRows("PRODUK UTAMA", globalDataKategori.utama);
    insertRows("AKSESORIS", globalDataKategori.aksesoris);
    insertRows("GRADE B", globalDataKategori.gradeb);
    
    return outputMatrix;
}

btnExportXlsx.addEventListener('click', () => {
    const matrixData = generateMasterArrayFormat();
    if (matrixData.length === 1) {
        updateStatusMessage("Gagal Export: Data tabel kalkulator kosong.");
        return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(matrixData);
    XLSX.utils.book_append_sheet(wb, ws, "Rangkuman Terjual");
    
    const tanggalFormat = new Date().toISOString().slice(0,10);
    XLSX.writeFile(wb, `Latela_Rangkuman_Penjualan_${tanggalFormat}.xlsx`);
    updateStatusMessage("Sukses mengunduh laporan berkas Excel (.xlsx).");
});

btnExportCsv.addEventListener('click', () => {
    const matrixData = generateMasterArrayFormat();
    if (matrixData.length === 1) {
        updateStatusMessage("Gagal Export: Data tabel kalkulator kosong.");
        return;
    }

    const ws = XLSX.utils.aoa_to_sheet(matrixData);
    const csvContent = XLSX.utils.sheet_to_csv(ws);
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const tanggalFormat = new Date().toISOString().slice(0,10);
    
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `Latela_Rangkuman_Penjualan_${tanggalFormat}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    updateStatusMessage("Sukses mengunduh laporan berkas teks (.csv).");
});
