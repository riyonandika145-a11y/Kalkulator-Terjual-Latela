// =========================================================================
// CLOUD DATABASE CONFIGURATION (GOOGLE SHEETS)
// =========================================================================
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRx0w6ouZ_PYXUTdbqqT_CCslwLR-hdY3c311M7jAzPlskawLg2ewiGPQ_gLZ1K4EjQPI_7_qfp3pzb/pub?gid=0&single=true&output=csv";

// Link Web App Google Apps Script milikmu terpasang rapi di sini:
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzc-lYZGC5958wLSHfhlnTr1u0GeKP-6vEYRgIoSkrn98j1oVMhSTKJE9y4hWJsPPY/exec";

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

const menuExtension = document.getElementById('menu-extension');

// SECURE MODAL POP-UP DOM
const passwordModal = document.getElementById('password-modal');
const inputExtPassword = document.getElementById('input-ext-password');
const modalErrorMsg = document.getElementById('modal-error-msg');
const btnModalCancel = document.getElementById('btn-modal-cancel');
const btnModalSubmit = document.getElementById('btn-modal-submit');

const dashTotalTerjual = document.getElementById('dash-total-terjual');
const dashSkuAktif = document.getElementById('dash-sku-aktif');
const dashFileCount = document.getElementById('dash-file-count');
const dashFilterDropdown = document.getElementById('dash-filter-dropdown');

// SELEKTOR DOM FITUR INPUT MANUAL
const manualNamaDropdown = document.getElementById('manual-nama-dropdown');
const manualTypeDropdown = document.getElementById('manual-type-dropdown');
const manualWarnaDropdown = document.getElementById('manual-warna-dropdown');
const manualQtyInput = document.getElementById('manual-qty-input');
const btnAddManual = document.getElementById('btn-add-manual');

// --- STATE MANAGEMENT ---
let masterSkus = {}; 
let globalDataKategori = { utama: {}, aksesoris: {}, gradeb: {} };
let totalMasterFiles = 0;
let activeFilterText = "all";

// ARSIP INSTANSI GRAFIK CHART.JS
let salesChartInstance = null; 
let trendChartInstance = null;      
let topProductsChartInstance = null; 

// CACHE GLOBAL UNTUK MENAMPUNG DETAIL DATA DARI CLOUD SPREADSHEET
let globalHistoryCloudCache = {};

// --- INITIAL BOOTSTRAP SINKRONISASI CLOUD ---
window.addEventListener('DOMContentLoaded', () => {
    const savedSidebarState = localStorage.getItem('sidebarState');
    if (savedSidebarState === 'collapsed') {
        sidebarElement.classList.add('collapsed');
        btnToggleSidebar.innerText = "❯";
    }
    fetchMasterSkusFromCloud();
    fetchHistoryFromCloud(); 
    initDashboardEmptyChart(); 
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

// LOGIKA PEMBUKA & PENUTUP DROPDOWN EXPORT BUTTON
btnExportToggle.addEventListener('click', (e) => {
    e.stopPropagation(); 
    exportMenuItems.classList.toggle('show');
});

document.addEventListener('click', () => {
    exportMenuItems.classList.remove('show');
});

// INTERCEPT MENU EXTENSION DENGAN CUSTOM IN-APP MODAL
if (menuExtension) {
    menuExtension.addEventListener('click', (e) => {
        e.preventDefault(); 
        modalErrorMsg.innerText = ""; 
        inputExtPassword.value = ""; 
        passwordModal.classList.add('show'); 
        setTimeout(() => inputExtPassword.focus(), 100); 
    });
}

function eksekusiVerifikasiPasswordModal() {
    if (inputExtPassword.value === "latela2026") { 
        passwordModal.classList.remove('show'); 
        window.open(menuExtension.href, '_blank'); 
        updateStatusMessage("Otorisasi sukses. Database utama berhasil dibuka.");
    } else {
        modalErrorMsg.innerText = "⚠️ Password salah! Akses ditolak sistem.";
        updateStatusMessage("Akses ditolak: Percobaan masuk salah.");
    }
}

btnModalSubmit.addEventListener('click', eksekusiVerifikasiPasswordModal);
btnModalCancel.addEventListener('click', () => {
    passwordModal.classList.remove('show');
    updateStatusMessage("Otorisasi dibatalkan oleh user.");
});

inputExtPassword.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        eksekusiVerifikasiPasswordModal();
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

                // SMART NORMALIZER KATEGORI CLOUD SPREADSHEET
                let rawKat = kategoriLogistik.toString().trim().toLowerCase();
                let katClean = 'utama'; 
                if (rawKat.includes('utama')) katClean = 'utama';
                else if (rawKat.includes('aksesoris')) katClean = 'aksesoris';
                else if (rawKat.includes('grade')) katClean = 'gradeb';

                if (skuCode) {
                    masterSkus[skuCode.toString().trim()] = {
                        nama: namaResmi ? namaResmi.toString().trim().toUpperCase() : "TANPA NAMA",
                        type: typeProduk.toString().trim(),
                        warna: warnaProduk.toString().trim(),
                        kategori: katClean
                    };
                }
            });

            updateStatusMessage("Master SKU berhasil disinkronisasi dari Google Sheets.");
            renderMasterSkuDatabaseView();
            populateDashboardDropdown(); 
            populateManualNamaDropdown(); 
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
        
        activeFilterText = "all";
        populateFilterDropdown();
        refreshAllTables();
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

// 🔥 REVISI LOGIKA UTAMA: AKOMODASI SINKRONISASI KOLOM QUANTITY LAZADA, SHOPEE, TIKTOK
function ekstrakDanHitungPenjualan(data) {
    data.forEach(row => {
        let foundSku = "";

        for (let key in row) {
            if (row[key] !== undefined && row[key] !== null) {
                let cellValue = row[key].toString().trim();
                if (masterSkus[cellValue]) {
                    foundSku = cellValue;
                    break; 
                }
            }
        }

        if (foundSku) {
            // 🌟 STANDARISASI LAZADA: Default diatur ke 1 pcs jika tidak ada nama kolom Qty terdeteksi di baris
            let rowQty = 1; 

            for (let key in row) {
                let keyClean = key.toString().toLowerCase().replace(/[^a-z0-9]/g, "");
                // Memindai kata kunci "jumlah" (Shopee) atau "quantity" (TikTok)
                if (keyClean === "qty" || keyClean === "quantity" || keyClean === "jumlah" || 
                    keyClean === "kuantitas" || keyClean === "jumlahproduk" || keyClean === "kuantitaspcs" || keyClean === "jumlahpesanan") {
                    rowQty = parseInt(row[key], 10) || 1; // Jika kolom ketemu tapi angkanya eror, aman kembali ke 1
                    break; 
                }
            }

            const kategori = masterSkus[foundSku].kategori;
            if (globalDataKategori[kategori] && globalDataKategori[kategori][foundSku]) {
                globalDataKategori[kategori][foundSku].qty += rowQty;
            }
        }
    });

    totalMasterFiles += 1;
    fileBadge.innerText = `${totalMasterFiles} File Terupload`;
    
    refreshAllTables();
    updateDashboardMetrics(); 
    updateStatusMessage('Rangkuman data penjualan berhasil diperbarui berdasarkan pencocokan nilai SKU database terpusat.');
}

function renderSingleTable(dataKategori, tbodyElement) {
    tbodyElement.innerHTML = '';
    const sortedKeys = Object.keys(dataKategori).sort();

    sortedKeys.forEach(sku => {
        if (activeFilterText !== "all" && dataKategori[sku].nama !== activeFilterText) return;
        
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

// METRIKS & GRAFIK RESPONSAL SESUAI PILIHAN FILTER SPREAD
function updateDashboardMetrics() {
    const targetProduct = dashFilterDropdown ? dashFilterDropdown.value : "all";
    
    let qtyUtama = 0;
    let qtyAksesoris = 0;
    let qtyGradeB = 0;
    let skuAktifCount = 0;
    let productSalesGroup = {};

    const hitungDanKelompokkan = (dataKategori) => {
        Object.values(dataKategori).forEach(item => {
            if (targetProduct === "all" || item.nama === targetProduct) {
                if (item.qty > 0) {
                    skuAktifCount++;
                    let namaProd = item.nama.trim().toUpperCase();
                    productSalesGroup[namaProd] = (productSalesGroup[namaProd] || 0) + item.qty;
                }
                if (item.kategori === 'utama') qtyUtama += item.qty;
                if (item.kategori === 'aksesoris') qtyAksesoris += item.qty;
                if (item.kategori === 'gradeb') qtyGradeB += item.qty;
            }
        });
    };

    hitungDanKelompokkan(globalDataKategori.utama);
    hitungDanKelompokkan(globalDataKategori.aksesoris);
    hitungDanKelompokkan(globalDataKategori.gradeb);

    const grandTotal = qtyUtama + qtyAksesoris + qtyGradeB;

    dashTotalTerjual.innerText = grandTotal.toLocaleString('id-ID');
    dashSkuAktif.innerText = skuAktifCount;
    dashFileCount.innerText = totalMasterFiles;

    if (salesChartInstance) {
        salesChartInstance.data.datasets[0].data = [qtyUtama, qtyAksesoris, qtyGradeB];
        salesChartInstance.update(); 
    }

    if (topProductsChartInstance) {
        let sortedTopArray = Object.keys(productSalesGroup).map(name => {
            return { name: name, qty: productSalesGroup[name] };
        }).sort((a, b) => b.qty - a.qty).slice(0, 5); 

        let labelPeringkat = sortedTopArray.map(item => item.name);
        let dataPeringkat = sortedTopArray.map(item => item.qty);

        if (sortedTopArray.length === 0) {
            labelPeringkat = ["Belum Ada Data"];
            dataPeringkat = [0];
        }

        topProductsChartInstance.data.labels = labelPeringkat;
        topProductsChartInstance.data.datasets[0].data = dataPeringkat;
        topProductsChartInstance.update();
    }
}

function populateDashboardDropdown() {
    if (!dashFilterDropdown) return;
    dashFilterDropdown.innerHTML = '<option value="all">-- Semua Produk --</option>';
    
    let allProductNames = new Set();
    Object.values(masterSkus).forEach(item => {
        if (item.nama) allProductNames.add(item.nama.trim().toUpperCase());
    });

    const sortedNames = Array.from(allProductNames).sort();
    sortedNames.forEach(nama => {
        const opt = document.createElement('option');
        opt.value = nama; opt.innerText = nama;
        dashFilterDropdown.appendChild(opt);
    });
}

if (dashFilterDropdown) {
    dashFilterDropdown.addEventListener('change', () => {
        updateDashboardMetrics();
    });
}

// ENGINE BOOTSTRAP INISIALISASI 3 STRUKTUR GRAFIK SEKALIGUS
function initDashboardEmptyChart() {
    const ctxSales = document.getElementById('salesChart').getContext('2d');
    salesChartInstance = new Chart(ctxSales, {
        type: 'bar', 
        data: {
            labels: ['Produk Utama', 'Aksesoris', 'Grade B'],
            datasets: [{
                label: 'Kuantitas Terjual (pcs)',
                data: [0, 0, 0], 
                backgroundColor: ['#ec4899', '#2563eb', '#f59e0b'],
                borderWidth: 0, borderRadius: 5, barPercentage: 0.4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } }
        }
    });

    const ctxTrend = document.getElementById('trendChart').getContext('2d');
    trendChartInstance = new Chart(ctxTrend, {
        type: 'line',
        data: {
            labels: ['Mulai'],
            datasets: [{
                label: 'Total Terjual (pcs)',
                data: [0],
                borderColor: '#8b5cf6', 
                backgroundColor: 'rgba(139, 92, 246, 0.08)',
                borderWidth: 3,
                tension: 0.3, 
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#8b5cf6'
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
                y: { beginAtZero: true, grid: { color: '#f1f5f9' } }, 
                x: { grid: { display: false }, ticks: { font: { size: 10 } } } 
            }
        }
    });

    const ctxTop = document.getElementById('topProductsChart').getContext('2d');
    topProductsChartInstance = new Chart(ctxTop, {
        type: 'bar',
        data: {
            labels: ['Menunggu Berkas...'],
            datasets: [{
                label: 'Item Terjual (pcs)',
                data: [0],
                backgroundColor: '#10b981', 
                borderRadius: 4,
                borderWidth: 0,
                barPercentage: 0.5
            }]
        },
        options: {
            indexAxis: 'y', 
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
                x: { beginAtZero: true, grid: { color: '#f1f5f9' } }, 
                y: { grid: { display: false }, ticks: { font: { size: 11, weight: '700' } } } 
            }
        }
    });
}

// DROPDOWN DINAMIS BERDASARKAN TAB AKTIF
function populateFilterDropdown() {
    dropdownFilter.innerHTML = '<option value="all">-- Tampilkan Semua Produk --</option>';
    
    const activeTab = document.querySelector('.sub-tab.active');
    const currentCategory = activeTab ? activeTab.getAttribute('data-category') : 'utama';

    let namaProdukUnikSet = new Set();

    if (globalDataKategori[currentCategory]) {
        Object.values(globalDataKategori[currentCategory]).forEach(item => {
            if (item.nama) {
                namaProdukUnikSet.add(item.nama.trim().toUpperCase());
            }
        });
    }

    const sortedNamaProduk = Array.from(namaProdukUnikSet).sort();
    sortedNamaProduk.forEach(nama => {
        const opt = document.createElement('option');
        opt.value = nama; opt.innerText = nama;
        dropdownFilter.appendChild(opt);
    });

    dropdownFilter.value = activeFilterText;
}

dropdownFilter.addEventListener('change', (e) => { activeFilterText = e.target.value; refreshAllTables(); });
btnFilterReset.addEventListener('click', () => { dropdownFilter.value = "all"; activeFilterText = "all"; refreshAllTables(); });

btnFileReset.addEventListener('click', () => {
    totalMasterFiles = 0;
    fileBadge.innerText = '0 File Terupload';
    resetKalkulatorDataState();
    
    if (dashFilterDropdown) dashFilterDropdown.value = "all"; 
    dashTotalTerjual.innerText = '0';
    dashSkuAktif.innerText = '0';
    dashFileCount.innerText = '0';
    
    if (salesChartInstance) { salesChartInstance.data.datasets[0].data = [0, 0, 0]; salesChartInstance.update(); }
    if (topProductsChartInstance) { topProductsChartInstance.data.labels = ["Kosong"]; topProductsChartInstance.data.datasets[0].data = [0]; topProductsChartInstance.update(); }
    
    if (manualNamaDropdown) manualNamaDropdown.value = "";
    if (manualTypeDropdown) { manualTypeDropdown.innerHTML = '<option value="">-- Type --</option>'; manualTypeDropdown.disabled = true; }
    if (manualWarnaDropdown) { manualWarnaDropdown.innerHTML = '<option value="">-- Warna --</option>'; manualWarnaDropdown.disabled = true; }
    if (manualQtyInput) manualQtyInput.value = "";

    updateStatusMessage('Siap.');
});

function updateStatusMessage(msg) { statusBar.innerText = msg; }

btnCopyQty.addEventListener('click', () => {
    const cat = document.querySelector('.sub-tab.active').getAttribute('data-category');
    const data = globalDataKategori[cat];
    let txt = ""; 
    
    Object.keys(data).sort().forEach(k => { 
        if (activeFilterText !== "all" && data[k].nama !== activeFilterText) return;
        txt += `${data[k].qty}\n`; 
    });
    
    navigator.clipboard.writeText(txt).then(() => updateStatusMessage('Berhasil copy angka Qty saja ke clipboard.'));
});

// MENYIMPAN HISTORY LOG SEKALIGUS DETAIL DATA SKU KE CLOUD DATABASE VIA POST
btnSaveHistory.addEventListener('click', () => {
    const sumQty = (obj) => Object.values(obj).reduce((s, i) => s + i.qty, 0);
    const total = sumQty(globalDataKategori.utama) + sumQty(globalDataKategori.aksesoris) + sumQty(globalDataKategori.gradeb);
    
    if (total === 0) {
        updateStatusMessage("Gagal menyimpan: Tidak ada data Qty penjualan.");
        return;
    }

    updateStatusMessage("Sedang mengirim data riwayat lengkap ke Cloud Spreadsheet...");
    const waktuSkrg = new Date().toLocaleString('id-ID');
    const detailSnapshotString = JSON.stringify(globalDataKategori);

    const payloadData = new URLSearchParams();
    payloadData.append('action', 'save');
    payloadData.append('waktu', waktuSkrg);
    payloadData.append('files', totalMasterFiles);
    payloadData.append('total', total);
    payloadData.append('detail', detailSnapshotString);

    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: payloadData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(res => res.json())
    .then(result => {
        if(result.status === "success") {
            updateStatusMessage(`Sukses! Data penjualan (${total} pcs) dan detail SKU berhasil dikunci ke cloud.`);
            fetchHistoryFromCloud(); 
        }
    })
    .catch(err => {
        console.error(err);
        updateStatusMessage("Gagal menyimpan ke server spreadsheet. Periksa koneksi internet.");
    });
});

// MENARIK HISTORY CLOUD & MEMASANG TOMBOL DOWNLOAD EXCEL LINTAS PERANGKAT DATA LENGKAP
function fetchHistoryFromCloud() {
    const historyBox = document.getElementById('history-list-container');
    if (!historyBox) return;

    fetch(`${GOOGLE_SCRIPT_URL}?action=fetch`)
        .then(res => res.json())
        .then(logs => {
            if (logs.length === 0) {
                historyBox.className = "empty-state-card";
                historyBox.innerHTML = "<p>Belum ada riwayat pemrosesan log data penjualan yang disimpan di Google Sheets.</p>";
                return;
            }

            historyBox.className = "";
            historyBox.innerHTML = '<div class="table-responsive"><table><thead><tr><th>Waktu Simpan</th><th>Files Terproses</th><th>Total Qty Item</th><th style="text-align: center; width: 140px;">Aksi</th></tr></thead><tbody id="tbody-history"></tbody></table></div>';
            
            const tbodyHist = document.getElementById('tbody-history');
            globalHistoryCloudCache = {}; 

            logs.reverse().forEach(log => {
                globalHistoryCloudCache[log.waktu] = log.detail;

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${log.waktu}</td>
                    <td><span class="badge-file-status" style="height:22px; font-size:11px;">${log.files} Berkas</span></td>
                    <td style="color: #ec4899; font-weight: bold;">${log.total} pcs</td>
                    <td style="text-align: center;">
                        <button class="btn-action btn-pink-solid btn-download-history" data-waktu="${log.waktu}" style="height: 24px; font-size: 11px; padding: 0 10px; line-height: 1;">Download 📄</button>
                    </td>
                `;
                tbodyHist.appendChild(tr);
            });

            document.querySelectorAll('.btn-download-history').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const targetWaktu = e.target.getAttribute('data-waktu');
                    let rawDetailData = globalHistoryCloudCache[targetWaktu];

                    if (!rawDetailData) {
                        alert("⚠️ Detail data lengkap gagal diurai dari basis data awan.");
                        return;
                    }

                    let targetDataSnapshot = typeof rawDetailData === 'string' ? JSON.parse(rawDetailData) : rawDetailData;

                    const wb = XLSX.utils.book_new();
                    const bentukMatriksLembarKerja = (dataKategori) => {
                        let matriks = [["SKU", "Nama Produk", "Type", "Warna", "Kuantitas (Qty)"]];
                        Object.keys(dataKategori).sort().forEach(sku => {
                            matriks.push([
                                sku, 
                                dataKategori[sku].nama, 
                                dataKategori[sku].type, 
                                dataKategori[sku].warna, 
                                dataKategori[sku].qty
                            ]);
                        });
                        return matriks;
                    };

                    const wsUtama = XLSX.utils.aoa_to_sheet(bentukMatriksLembarKerja(targetDataSnapshot.utama));
                    XLSX.utils.book_append_sheet(wb, wsUtama, "Produk Utama");

                    const wsAksesoris = XLSX.utils.aoa_to_sheet(bentukMatriksLembarKerja(targetDataSnapshot.aksesoris));
                    XLSX.utils.book_append_sheet(wb, wsAksesoris, "Aksesoris");

                    const wsGradeB = XLSX.utils.aoa_to_sheet(bentukMatriksLembarKerja(targetDataSnapshot.gradeb));
                    XLSX.utils.book_append_sheet(wb, wsGradeB, "Grade B");

                    let namaFileAman = targetWaktu.replace(/[^a-zA-Z0-9]/g, "_");
                    XLSX.writeFile(wb, `Latela_Laporan_Cloud_${namaFileAman}.xlsx`);
                    updateStatusMessage(`Sukses mengunduh detail riwayat tanggal ${targetWaktu}`);
                });
            });

            if (trendChartInstance && logs.length > 0) {
                let dataPembatasTrend = logs.slice(-8);

                let labelSumbuX = dataPembatasTrend.map(item => {
                    return item.waktu.split(',')[0]; 
                });
                
                let dataSumbuY = dataPembatasTrend.map(item => {
                    return parseInt(item.total.toString().replace(/[^0-9]/g, ""), 10) || 0;
                });

                trendChartInstance.data.labels = labelSumbuX.reverse();
                trendChartInstance.data.datasets[0].data = dataSumbuY.reverse();
                trendChartInstance.update();
            }
        })
        .catch(err => {
            console.error(err);
            historyBox.innerHTML = "<p style='color: red; text-align:center;'>Gagal memuat log riwayat dari spreadsheet cloud.</p>";
        });
}

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

// MULTI-TAB EXPORT EXCEL (.XLSX)
btnExportXlsx.addEventListener('click', () => {
    if (Object.keys(masterSkus).length === 0) {
        updateStatusMessage("Gagal Export: Data Master SKU dari cloud kosong.");
        return;
    }

    const wb = XLSX.utils.book_new();

    const bentukMatriksLembarKerja = (dataKategori) => {
        let matriks = [["SKU", "Nama Produk", "Type", "Warna", "Kuantitas (Qty)"]];
        Object.keys(dataKategori).sort().forEach(sku => {
            matriks.push([
                sku, 
                dataKategori[sku].nama, 
                dataKategori[sku].type, 
                dataKategori[sku].warna, 
                dataKategori[sku].qty
            ]);
        });
        return matriks;
    };

    const matriksUtama = bentukMatriksLembarKerja(globalDataKategori.utama);
    const wsUtama = XLSX.utils.aoa_to_sheet(matriksUtama);
    XLSX.utils.book_append_sheet(wb, wsUtama, "Produk Utama");

    const matriksAksesoris = bentukMatriksLembarKerja(globalDataKategori.aksesoris);
    const wsAksesoris = XLSX.utils.aoa_to_sheet(matriksAksesoris);
    XLSX.utils.book_append_sheet(wb, wsAksesoris, "Aksesoris");

    const matriksGradeB = bentukMatriksLembarKerja(globalDataKategori.gradeb);
    const wsGradeB = XLSX.utils.aoa_to_sheet(matriksGradeB);
    XLSX.utils.book_append_sheet(wb, wsGradeB, "Grade B");

    const tanggalFormat = new Date().toISOString().slice(0,10);
    XLSX.writeFile(wb, `Latela_Laporan_Penjualan_Tabs_${tanggalFormat}.xlsx`);
    updateStatusMessage("Sukses mengunduh Excel mewah terpisah 3 tab kategori!");
});

btnExportCsv.addEventListener('click', () => {
    const matrixData = generateMasterArrayFormat();
    if (matrixData.length === 1) { updateStatusMessage("Gagal Export: Data tabel kalkulator kosong."); return; }
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

// LOGIKA SISTEM INPUT MANUAL BERANTAI DINAMIS
function populateManualNamaDropdown() {
    if (!manualNamaDropdown) return;
    manualNamaDropdown.innerHTML = '<option value="">-- Pilih Produk --</option>';
    
    let uniqueProductNames = new Set();
    Object.values(masterSkus).forEach(item => {
        if (item.nama) uniqueProductNames.add(item.nama.trim().toUpperCase());
    });

    const sortedNames = Array.from(uniqueProductNames).sort();
    sortedNames.forEach(nama => {
        const opt = document.createElement('option');
        opt.value = nama; opt.innerText = nama;
        manualNamaDropdown.appendChild(opt);
    });
}

manualNamaDropdown.addEventListener('change', () => {
    const selectedNama = manualNamaDropdown.value;
    
    manualTypeDropdown.innerHTML = '<option value="">-- Type --</option>';
    manualWarnaDropdown.innerHTML = '<option value="">-- Warna --</option>';
    manualWarnaDropdown.disabled = true;
    
    if (!selectedNama) {
        manualTypeDropdown.disabled = true;
        return;
    }
    
    let uniqueTypes = new Set();
    Object.values(masterSkus).forEach(item => {
        if (item.nama === selectedNama && item.type) {
            uniqueTypes.add(item.type.trim());
        }
    });
    
    const sortedTypes = Array.from(uniqueTypes).sort();
    sortedTypes.forEach(type => {
        const opt = document.createElement('option');
        opt.value = type; opt.innerText = type;
        manualTypeDropdown.appendChild(opt);
    });
    manualTypeDropdown.disabled = false;
});

manualTypeDropdown.addEventListener('change', () => {
    const selectedNama = manualNamaDropdown.value;
    const selectedType = manualTypeDropdown.value;
    
    manualWarnaDropdown.innerHTML = '<option value="">-- Warna --</option>';
    
    if (!selectedType) {
        manualWarnaDropdown.disabled = true;
        return;
    }
    
    let uniqueWarnas = new Set();
    Object.values(masterSkus).forEach(item => {
        if (item.nama === selectedNama && item.type === selectedType && item.warna) {
            uniqueWarnas.add(item.warna.trim());
        }
    });
    
    const sortedWarnas = Array.from(uniqueWarnas).sort();
    sortedWarnas.forEach(warna => {
        const opt = document.createElement('option');
        opt.value = warna; opt.innerText = warna;
        manualWarnaDropdown.appendChild(opt);
    });
    manualWarnaDropdown.disabled = false;
});

btnAddManual.addEventListener('click', () => {
    const nama = manualNamaDropdown.value;
    const type = manualTypeDropdown.value;
    const warna = manualWarnaDropdown.value;
    const qty = parseInt(manualQtyInput.value, 10);
    
    if (!nama || !type || !warna || isNaN(qty) || qty <= 0) {
        updateStatusMessage("⚠️ Gagal Input: Silakan pilih detail produk dan jumlah Qty dengan benar.");
        return;
    }
    
    let targetSku = null;
    for (let sku in masterSkus) {
        if (masterSkus[sku].nama === nama && masterSkus[sku].type === type && masterSkus[sku].warna === warna) {
            targetSku = sku;
            break;
        }
    }
    
    if (targetSku) {
        const kategori = masterSkus[targetSku].kategori;
        if (globalDataKategori[kategori] && globalDataKategori[kategori][targetSku]) {
            globalDataKategori[kategori][targetSku].qty += qty;
            
            refreshAllTables();
            updateDashboardMetrics();
            
            updateStatusMessage(`Sukses input manual: ${nama} (${type} - ${warna}) +${qty} pcs.`);
            manualQtyInput.value = "";
        } else {
            updateStatusMessage("⚠️ Gagal: SKU tidak ditemukan di dalam folder workspace harian.");
        }
    } else {
        updateStatusMessage("⚠️ Gagal: Kombinasi varian produk tidak terdaftar di database cloud.");
    }
});
