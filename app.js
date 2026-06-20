// =========================================================================
// CLOUD DATABASE CONFIGURATION (GOOGLE SHEETS)
// =========================================================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw9ZVSAObK0DbfXadHO9LIQGEaLlmFruZ4AR7HFpsYC2ONmKLGQCQ_93TuS_DpOwog/exec";

// SIGNATURE IMAGE (CV ARSA) - base64 agar tidak perlu file eksternal
const SIGNATURE_CV_ARSA_BASE64 = "data:image/png;base64,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";

// --- DOM SELEKTORS ---
const loadingOverlay = document.getElementById('loading-overlay'); 

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

// SELEKTOR PROCUREMENT DROPDOWN BERANTAI & TANGGAL
const procNoPo = document.getElementById('proc-no-po');
const procTanggalPo = document.getElementById('proc-tanggal-po'); // 🌟 SELEKTOR TANGGAL BARU
const procJenisBarang = document.getElementById('proc-jenis-barang');
const procWarnaLatela = document.getElementById('proc-warna-latela');
const procKodeWarnaVendor = document.getElementById('proc-kode-warna-vendor');
const procVendor = document.getElementById('proc-vendor');
const procKodeVendor = document.getElementById('proc-kode-vendor');
const procNamaKain = document.getElementById('proc-nama-kain');
const procQty = document.getElementById('proc-qty');
const procSatuan = document.getElementById('proc-satuan');
const btnAddProc = document.getElementById('btn-add-proc');
const btnExportPo = document.getElementById('btn-export-po');
const btnResetPo = document.getElementById('btn-reset-po');
const tbodyProcurementList = document.getElementById('tbody-procurement-list');

// --- STATE MANAGEMENT ---
let masterSkus = {}; 
let globalDataKategori = { utama: {}, aksesoris: {}, gradeb: {} };
let totalMasterFiles = 0;
let activeFilterText = "all";

let globalVendorRawData = [];
let currentPoBasket = [];

let salesChartInstance = null; 
let trendChartInstance = null;      
let topProductsChartInstance = null; 
let globalHistoryCloudCache = {};

// --- INITIAL BOOTSTRAP ---
window.addEventListener('DOMContentLoaded', () => {
    const savedSidebarState = localStorage.getItem('sidebarState');
    if (savedSidebarState === 'collapsed' && sidebarElement) {
        sidebarElement.classList.add('collapsed');
        if (btnToggleSidebar) btnToggleSidebar.innerText = "❯";
    }

    // 🌟 INITIALIZE: OTOMATIS KUNCI TANGGAL PO KE HARI INI
    if (procTanggalPo) {
        const hariIni = new Date();
        const yyyy = hariIni.getFullYear();
        let mm = hariIni.getMonth() + 1; 
        let dd = hariIni.getDate();
        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;
        procTanggalPo.value = `${yyyy}-${mm}-${dd}`;
    }

    fetchMasterSkusFromCloud();
    fetchHistoryFromCloud(); 
    fetchVendorMappingFromCloud(); 
    initDashboardEmptyChart(); 
});

if (btnToggleSidebar) {
    btnToggleSidebar.addEventListener('click', () => {
        if (!sidebarElement) return;
        sidebarElement.classList.toggle('collapsed');
        if (sidebarElement.classList.contains('collapsed')) {
            btnToggleSidebar.innerText = "❯";
            localStorage.setItem('sidebarState', 'collapsed');
        } else {
            btnToggleSidebar.innerText = "☰";
            localStorage.setItem('sidebarState', 'expanded');
        }
    });
}

if (btnExportToggle) {
    btnExportToggle.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (exportMenuItems) exportMenuItems.classList.toggle('show');
    });
}

document.addEventListener('click', () => {
    if (exportMenuItems) exportMenuItems.classList.remove('show');
});

if (menuExtension) {
    menuExtension.addEventListener('click', (e) => {
        e.preventDefault(); 
        if (modalErrorMsg) modalErrorMsg.innerText = ""; 
        if (inputExtPassword) inputExtPassword.value = ""; 
        if (passwordModal) passwordModal.classList.add('show'); 
        setTimeout(() => { if (inputExtPassword) inputExtPassword.focus(); }, 100); 
    });
}

function eksekusiVerifikasiPasswordModal() {
    if (!inputExtPassword) return;
    if (inputExtPassword.value === "latela2026") { 
        if (passwordModal) passwordModal.classList.remove('show'); 
        if (menuExtension) window.open(menuExtension.href, '_blank'); 
        updateStatusMessage("Otorisasi sukses. Database utama berhasil dibuka.");
    } else {
        if (modalErrorMsg) modalErrorMsg.innerText = "⚠️ Password salah! Akses ditolak sistem.";
        updateStatusMessage("Akses ditolak: Percobaan masuk salah.");
    }
}

if (btnModalSubmit) btnModalSubmit.addEventListener('click', eksekusiVerifikasiPasswordModal);
if (btnModalCancel) btnModalCancel.addEventListener('click', () => { if (passwordModal) passwordModal.classList.remove('show'); });
if (inputExtPassword) inputExtPassword.addEventListener('keydown', (e) => { if (e.key === 'Enter') eksekusiVerifikasiPasswordModal(); });

if (btnSyncCloud) {
    btnSyncCloud.addEventListener('click', () => {
        fetchMasterSkusFromCloud();
        fetchVendorMappingFromCloud(); 
    });
}

// 1. ENGINE FETCH SKU CORE
function fetchMasterSkusFromCloud() {
    updateStatusMessage("Menghubungkan ke Google Sheets Cloud Database secara Real-Time...");
    if (tbodyMasterList) tbodyMasterList.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #94a3b8; font-style: italic;">Sinkronisasi data live...</td></tr>`;
    if (loadingOverlay) loadingOverlay.classList.remove('fade-out');

    fetch(`${GOOGLE_SCRIPT_URL}?action=fetch_skus`)
        .then(response => { if (!response.ok) throw new Error("Gagal terhubung ke Apps Script."); return response.json(); })
        .then(jsonData => {
            masterSkus = {};
            jsonData.forEach(row => {
                const skuCode = row['SKU'] || row['sku'] || row['Code'];
                const namaResmi = row['Nama'] || row['nama'] || row['Product'];
                const typeProduk = row['Type'] || row['type'] || '-';
                const warnaProduk = row['Warna'] || row['warna'] || '-';
                const kategoriLogistik = row['Kategori'] || row['kategori'] || 'utama';

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
            updateStatusMessage("Master SKU berhasil disinkronisasi secara INSTAN & LIVE!");
            renderMasterSkuDatabaseView();
            populateDashboardDropdown(); 
            populateManualNamaDropdown(); 
            resetKalkulatorDataState();
        })
        .catch(err => {
            if (tbodyMasterList) tbodyMasterList.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #dc2626; font-weight: bold; padding: 20px;">⚠️ SISTEM EROR: ${err.message}</td></tr>`;
        })
        .finally(() => { if (loadingOverlay) setTimeout(() => { loadingOverlay.classList.add('fade-out'); }, 300); });
}

// 2. FETCH MAPPING VENDOR DROPDOWN BERANTAI
function fetchVendorMappingFromCloud() {
    fetch(`${GOOGLE_SCRIPT_URL}?action=fetch_vendor`)
        .then(res => res.json())
        .then(data => {
            globalVendorRawData = data; 
            if (procJenisBarang) procJenisBarang.innerHTML = '<option value="">-- Pilih Jenis Barang --</option>';
            if (procWarnaLatela) { procWarnaLatela.innerHTML = '<option value="">-- Pilih Warna Latela --</option>'; procWarnaLatela.disabled = true; }

            let uniqueJenis = new Set();
            data.forEach(row => {
                let jenis = row['Jenis Barang'] || row['jenis_barang'] || row['Jenis barang'] || row['JENIS BARANG'];
                if(jenis) uniqueJenis.add(jenis.toString().trim());
            });
            Array.from(uniqueJenis).sort().forEach(jenis => {
                const opt = document.createElement('option'); opt.value = jenis; opt.innerText = jenis;
                if (procJenisBarang) procJenisBarang.appendChild(opt);
            });
        })
        .catch(err => console.error("Gagal load vendor mapping:", err));
}

if (procJenisBarang) {
    procJenisBarang.addEventListener('change', () => {
        const selectedJenis = procJenisBarang.value;
        if (procWarnaLatela) procWarnaLatela.innerHTML = '<option value="">-- Pilih Warna Latela --</option>';
        if (procKodeWarnaVendor) procKodeWarnaVendor.value = ''; 
        if (procVendor) procVendor.value = ''; 
        if (procKodeVendor) procKodeVendor.value = ''; 
        if (procNamaKain) procNamaKain.value = '';

        if (!selectedJenis) { if (procWarnaLatela) procWarnaLatela.disabled = true; return; }

        let uniqueWarna = new Set();
        globalVendorRawData.forEach(row => {
            let jenis = row['Jenis Barang'] || row['jenis_barang'] || row['Jenis barang'] || row['JENIS BARANG'];
            let warna = row['Kode Warna Latela'] || row['kode_warna_latela'] || row['Kode warna latela'] || row['KODE WARNA LATELA'];
            if (jenis && jenis.toString().trim() === selectedJenis && warna) uniqueWarna.add(warna.toString().trim());
        });
        Array.from(uniqueWarna).sort().forEach(warna => {
            const opt = document.createElement('option'); opt.value = warna; opt.innerText = warna;
            if (procWarnaLatela) procWarnaLatela.appendChild(opt);
        });
        if (procWarnaLatela) procWarnaLatela.disabled = false;
    });
}

if (procWarnaLatela) {
    procWarnaLatela.addEventListener('change', () => {
        const selectedJenis = procJenisBarang ? procJenisBarang.value : '';
        const selectedWarna = procWarnaLatela.value;
        if (!selectedJenis || !selectedWarna) { 
            if (procKodeWarnaVendor) procKodeWarnaVendor.value = ''; 
            if (procVendor) procVendor.value = ''; 
            if (procKodeVendor) procKodeVendor.value = ''; 
            if (procNamaKain) procNamaKain.value = ''; 
            return; 
        }

        const matchedRow = globalVendorRawData.find(row => {
            let jenis = row['Jenis Barang'] || row['jenis_barang'] || row['Jenis barang'] || row['JENIS BARANG'];
            let warna = row['Kode Warna Latela'] || row['kode_warna_latela'] || row['Kode warna latela'] || row['KODE WARNA LATELA'];
            return jenis && jenis.toString().trim() === selectedJenis && warna && warna.toString().trim() === selectedWarna;
        });
        if (matchedRow) {
            if (procKodeWarnaVendor) procKodeWarnaVendor.value = matchedRow['Kode Warna Vendor'] || matchedRow['kode_warna_vendor'] || matchedRow['Kode warna vendor'] || '-';
            if (procVendor) procVendor.value = matchedRow['Vendor'] || matchedRow['vendor'] || '-';
            if (procKodeVendor) procKodeVendor.value = matchedRow['Kode Vendor'] || matchedRow['kode_vendor'] || matchedRow['Kode vendor'] || '-';
            if (procNamaKain) procNamaKain.value = matchedRow['Nama Kain'] || matchedRow['nama_kain'] || matchedRow['Nama kain'] || '-';
        }
    });
}

if (btnAddProc) {
    btnAddProc.addEventListener('click', () => {
        const jenisBarang = procJenisBarang ? procJenisBarang.value : ''; 
        const warnaLatela = procWarnaLatela ? procWarnaLatela.value : '';
        const kodeWarnaVendor = procKodeWarnaVendor ? procKodeWarnaVendor.value : ''; 
        const vendor = procVendor ? procVendor.value : '';
        const kodeVendor = procKodeVendor ? procKodeVendor.value : ''; 
        const namaKain = procNamaKain ? procNamaKain.value : ''; 
        const qty = procQty ? parseInt(procQty.value, 10) : 0;
        const satuan = procSatuan ? procSatuan.value : 'Roll'; 

        if(!jenisBarang || !warnaLatela || isNaN(qty) || qty <= 0) { updateStatusMessage("⚠️ Gagal: Isi Qty dengan benar."); return; }
        currentPoBasket.push({ jenisBarang, warnaLatela, kodeWarnaVendor, vendor, kodeVendor, namaKain, qty, satuan });
        renderProcurementTable(); 

        // 🔄 RESET FORM SETELAH ITEM DITAMBAHKAN (biar siap input item baru)
        if (procJenisBarang) procJenisBarang.value = '';
        if (procWarnaLatela) { procWarnaLatela.innerHTML = '<option value="">-- Pilih Warna Latela --</option>'; procWarnaLatela.disabled = true; }
        if (procKodeWarnaVendor) procKodeWarnaVendor.value = '';
        if (procVendor) procVendor.value = '';
        if (procKodeVendor) procKodeVendor.value = '';
        if (procNamaKain) procNamaKain.value = '';
        if (procQty) procQty.value = '';

        updateStatusMessage(`Sukses menambah pesanan ${jenisBarang} (${warnaLatela}) ke list PO.`);
    });
}

function renderProcurementTable() {
    if (!tbodyProcurementList) return;
    if(currentPoBasket.length === 0) {
        tbodyProcurementList.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #94a3b8; font-style: italic;">Belum ada item ditambahkan ke Surat PO.</td></tr>`; return;
    }
    tbodyProcurementList.innerHTML = '';
    currentPoBasket.forEach((item) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><strong>${item.jenisBarang}</strong></td><td><code>${item.warnaLatela}</code></td><td>${item.kodeWarnaVendor}</td><td>${item.vendor}</td><td><strong>${item.kodeVendor}</strong></td><td>${item.namaKain}</td><td style="text-align: right; padding-right:25px; color:#2563eb;">${item.qty} ${item.satuan}</td>`;
        tbodyProcurementList.appendChild(tr);
    });
}

if (btnResetPo) {
    btnResetPo.addEventListener('click', () => {
        currentPoBasket = []; renderProcurementTable();
        if (procNoPo) procNoPo.value = ''; 
        if (procJenisBarang) procJenisBarang.value = ''; 
        if (procWarnaLatela) { procWarnaLatela.value = ''; procWarnaLatela.disabled = true; }
        if (procKodeWarnaVendor) procKodeWarnaVendor.value = ''; 
        if (procVendor) procVendor.value = ''; 
        if (procKodeVendor) procKodeVendor.value = ''; 
        if (procNamaKain) procNamaKain.value = ''; 
        if (procQty) procQty.value = '';
        if (procSatuan) procSatuan.value = 'Roll';
        
        // Reset Tanggal PO ke Hari Ini Kembali
        if (procTanggalPo) {
            const hariIni = new Date();
            const yyyy = hariIni.getFullYear();
            let mm = hariIni.getMonth() + 1; 
            let dd = hariIni.getDate();
            if (mm < 10) mm = '0' + mm;
            if (dd < 10) dd = '0' + dd;
            procTanggalPo.value = `${yyyy}-${mm}-${dd}`;
        }
    });
}

if (btnExportPo) {
    btnExportPo.addEventListener('click', () => {
        if(currentPoBasket.length === 0) { updateStatusMessage("⚠️ Belum ada item di list PO."); return; }
        const noPoValue = procNoPo ? procNoPo.value.trim() : '';

        // FORMAT TANGGAL YANG DIPILIH USER
        let rawSelectedDate = procTanggalPo ? procTanggalPo.value : '';
        let formattedDate = '-';
        if (rawSelectedDate) {
            const parts = rawSelectedDate.split('-');
            if (parts.length === 3) formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
        }

        // VENDOR DI HEADER DIAMBIL DARI ITEM PERTAMA DI LIST
        const vendorHeader = currentPoBasket[0].vendor || '-';

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        const marginLeft = 28.35; // 1 cm
        const marginRight = 28.35; // 1 cm
        const contentWidth = pageWidth - marginLeft - marginRight;

        // --- HEADER: NAMA PERUSAHAAN (KIRI) & JUDUL (KANAN) ---
        doc.setFont('helvetica', 'bold'); doc.setFontSize(16);
        doc.text('CV ARSA (ARSATEX)', marginLeft, 50);
        doc.text('ORDER PEMBELIAN', pageWidth - marginRight, 50, { align: 'right' });

        // --- ALAMAT (KIRI) ---
        doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
        doc.text('Jl. Majalaya No. 47', marginLeft, 70);
        doc.text('Kp Majalaya Rt 001/002 Kel/Kec. Majalaya', marginLeft, 84);
        doc.text('Bandung. Jawa Barat', marginLeft, 98);
        doc.text('No Tlp :', marginLeft, 112);

        // --- INFO PO (KANAN) ---
        const infoLabelX = pageWidth - marginRight - 230;
        const infoColonX = pageWidth - marginRight - 140;
        const infoValueX = pageWidth - marginRight - 132;
        doc.text('Nomor PO', infoLabelX, 70); doc.text(':', infoColonX, 70); doc.text(noPoValue || '-', infoValueX, 70);
        doc.text('Tanggal', infoLabelX, 84); doc.text(':', infoColonX, 84); doc.text(formattedDate, infoValueX, 84);
        doc.text('Vendor', infoLabelX, 98); doc.text(':', infoColonX, 98); doc.text(vendorHeader, infoValueX, 98);

        // --- TABEL ITEM (sesuai struktur template: NO | NAMA PRODUK | WARNA | KODE VENDOR | YDS | KG | ROLL) ---
        const bodyRows = currentPoBasket.map((item, idx) => {
            const isYds = item.satuan === 'Yards';
            const isKg = item.satuan === 'Kg';
            const isRoll = item.satuan === 'Roll';
            return [
                idx + 1,
                item.namaKain || '-',
                item.warnaLatela || '-',
                item.kodeWarnaVendor || '-',
                isYds ? item.qty : '',
                isKg ? item.qty : '',
                isRoll ? item.qty : ''
            ];
        });
        // Baris kosong tambahan biar konsisten seperti template (kalau item sedikit)
        while (bodyRows.length < 8) bodyRows.push(['', '', '', '', '', '', '']);

        doc.autoTable({
            startY: 130,
            margin: { left: marginLeft, right: marginRight },
            head: [
                [
                    { content: 'NO', rowSpan: 2 },
                    { content: 'NAMA PRODUK', rowSpan: 2 },
                    { content: 'KODE WARNA', colSpan: 2, styles: { halign: 'center' } },
                    { content: 'QUANTITY', colSpan: 3, styles: { halign: 'center' } }
                ],
                ['WARNA', 'KODE VENDOR', 'YDS', 'KG', 'ROLL']
            ],
            body: bodyRows,
            theme: 'grid',
            styles: { fontSize: 9, halign: 'center', valign: 'middle', lineColor: [0,0,0], lineWidth: 0.75, minCellHeight: 24, textColor: [0,0,0] },
            headStyles: { fillColor: [20,20,20], textColor: [255,255,255], fontStyle: 'bold' },
            columnStyles: {
                0: { cellWidth: 30 },
                1: { cellWidth: contentWidth - (30 + 90 + 90 + 50 + 50 + 50) },
                2: { cellWidth: 90 },
                3: { cellWidth: 90 },
                4: { cellWidth: 50 },
                5: { cellWidth: 50 },
                6: { cellWidth: 50 }
            }
        });

        // --- TANDA TANGAN ---
        const finalY = doc.lastAutoTable.finalY + 60;
        doc.setFont('helvetica', 'normal'); doc.setFontSize(11);
        const signLeftCenterX = marginLeft + (contentWidth * 0.25);
        const signRightCenterX = marginLeft + (contentWidth * 0.75);
        doc.text('CV ARSA', signLeftCenterX, finalY, { align: 'center' });
        doc.text(vendorHeader, signRightCenterX, finalY, { align: 'center' });

        // GAMBAR TANDA TANGAN CV ARSA (ditempatkan di antara nama & garis titik-titik)
        const sigWidth = 110;
        const sigHeight = 28.19;
        doc.addImage(SIGNATURE_CV_ARSA_BASE64, 'PNG', signLeftCenterX - (sigWidth / 2), finalY + 8, sigWidth, sigHeight);

        doc.text('(……………………………)', signLeftCenterX, finalY + 60, { align: 'center' });
        doc.text('(……………………………)', signRightCenterX, finalY + 60, { align: 'center' });

        doc.save(`CV_Arsa_Surat_PO_${noPoValue || new Date().toISOString().slice(0,10)}.pdf`);
        updateStatusMessage('PDF Surat PO berhasil dicetak & terdownload.');
    });
}

// 3. MENU NAVIGATION LAYER
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(btn => btn.classList.remove('active')); item.classList.add('active');
        contentViews.forEach(view => view.classList.remove('active'));
        const targetView = document.getElementById(`view-${item.getAttribute('data-target')}`);
        if (targetView) targetView.classList.add('active');
    });
});

subTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        subTabs.forEach(t => t.classList.remove('active')); tab.classList.add('active');
        subTablePanels.forEach(p => p.classList.remove('active'));
        const targetPanel = document.getElementById(`panel-${tab.getAttribute('data-category')}`);
        if (targetPanel) targetPanel.classList.add('active');
        activeFilterText = "all"; populateFilterDropdown(); refreshAllTables();
    });
});

function renderMasterSkuDatabaseView() {
    if (tbodyMasterList) tbodyMasterList.innerHTML = ''; 
    const sortedKeys = Object.keys(masterSkus).sort(); 
    if (masterSkuCount) masterSkuCount.innerText = sortedKeys.length;
    if (sortedKeys.length === 0) return;
    sortedKeys.forEach(sku => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><code>${sku}</code></td><td><strong>${masterSkus[sku].nama}</strong></td><td>${masterSkus[sku].type}</td><td>${masterSkus[sku].warna}</td><td style="text-transform: uppercase;">${masterSkus[sku].kategori}</td>`;
        if (tbodyMasterList) tbodyMasterList.appendChild(tr);
    });
    populateFilterDropdown();
}

function resetKalkulatorDataState() {
    globalDataKategori = { utama: {}, aksesoris: {}, gradeb: {} };
    Object.keys(masterSkus).forEach(sku => {
        const kat = masterSkus[sku].kategori;
        if (globalDataKategori[kat]) {
            globalDataKategori[kat][sku] = { nama: masterSkus[sku].nama, type: masterSkus[sku].type, warna: masterSkus[sku].warna, qty: 0 };
        }
    });
    refreshAllTables();
}

// 4. PARSER LOGIKA EXCEL MANIFEST MARKETPLACE
if (btnAddFile) btnAddFile.addEventListener('click', () => { if (fileInput) fileInput.click(); });
if (fileInput) fileInput.addEventListener('change', (e) => processExcelEngine(e.target.files[0]));

function processExcelEngine(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            ekstrakDanHitungPenjualan(jsonData);
        } catch (err) { updateStatusMessage('Gagal memproses file Excel.'); }
    };
    reader.readAsArrayBuffer(file);
}

function ekstrakDanHitungPenjualan(data) {
    data.forEach(row => {
        let foundSku = "";
        for (let key in row) {
            if (row[key] !== undefined && row[key] !== null) {
                let cellValue = row[key].toString().trim();
                if (masterSkus[cellValue]) { foundSku = cellValue; break; }
            }
        }
        if (foundSku) {
            let rowQty = 1;
            for (let key in row) {
                let keyClean = key.toString().toLowerCase().replace(/[^a-z0-9]/g, "");
                if (["qty", "quantity", "jumlah", "kuantitas", "jumlahproduk", "kuantitaspcs", "jumlahpesanan"].includes(keyClean)) {
                    rowQty = parseInt(row[key], 10) || 1; break;
                }
            }
            const kategori = masterSkus[foundSku].kategori;
            if (globalDataKategori[kategori] && globalDataKategori[kategori][foundSku]) globalDataKategori[kategori][foundSku].qty += rowQty;
        }
    });
    totalMasterFiles += 1; 
    if (fileBadge) fileBadge.innerText = `${totalMasterFiles} File Terupload`;
    refreshAllTables(); updateDashboardMetrics();
}

function renderSingleTable(dataKategori, tbodyElement) {
    if (!tbodyElement) return;
    tbodyElement.innerHTML = '';
    Object.keys(dataKategori).sort().forEach(sku => {
        if (activeFilterText !== "all" && dataKategori[sku].nama !== activeFilterText) return;
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${sku}</td><td>${dataKategori[sku].nama}</td><td>${dataKategori[sku].type}</td><td>${dataKategori[sku].warna}</td><td>${dataKategori[sku].qty}</td>`;
        tbodyElement.appendChild(tr);
    });
}

function refreshAllTables() {
    renderSingleTable(globalDataKategori.utama, tbodyUtama);
    renderSingleTable(globalDataKategori.aksesoris, tbodyAksesoris);
    renderSingleTable(globalDataKategori.gradeb, tbodyGradeb); 
}

// 5. UPDATE GRAPHICS METRICS DASHBOARD
function updateDashboardMetrics() {
    const targetProduct = dashFilterDropdown ? dashFilterDropdown.value : "all";
    let qtyUtama = 0, qtyAksesoris = 0, qtyGradeB = 0, skuAktifCount = 0; let productSalesGroup = {};

    const hitung = (dataKategori) => {
        Object.values(dataKategori).forEach(item => {
            if (targetProduct === "all" || item.nama === targetProduct) {
                if (item.qty > 0) { skuAktifCount++; let name = item.nama.trim().toUpperCase(); productSalesGroup[name] = (productSalesGroup[name] || 0) + item.qty; }
                if (item.kategori === 'utama') qtyUtama += item.qty;
                if (item.kategori === 'aksesoris') qtyAksesoris += item.qty;
                if (item.kategori === 'gradeb') qtyGradeB += item.qty;
            }
        });
    };
    hitung(globalDataKategori.utama); hitung(globalDataKategori.aksesoris); hitung(globalDataKategori.gradeb);

    if (dashTotalTerjual) dashTotalTerjual.innerText = (qtyUtama + qtyAksesoris + qtyGradeB).toLocaleString('id-ID');
    if (dashSkuAktif) dashSkuAktif.innerText = skuAktifCount; 
    if (dashFileCount) dashFileCount.innerText = totalMasterFiles;

    if (salesChartInstance) { salesChartInstance.data.datasets[0].data = [qtyUtama, qtyAksesoris, qtyGradeB]; salesChartInstance.update(); }
    if (topProductsChartInstance) {
        let sorted = Object.keys(productSalesGroup).map(k => ({ name: k, qty: productSalesGroup[k] })).sort((a,b) => b.qty - a.qty).slice(0, 5);
        topProductsChartInstance.data.labels = sorted.length ? sorted.map(i => i.name) : ["Kosong"];
        topProductsChartInstance.data.datasets[0].data = sorted.length ? sorted.map(i => i.qty) : [0];
        topProductsChartInstance.update();
    }
}

function populateDashboardDropdown() {
    if (!dashFilterDropdown) return; dashFilterDropdown.innerHTML = '<option value="all">-- Semua Produk --</option>';
    let names = new Set(); Object.values(masterSkus).forEach(i => { if (i.nama) names.add(i.nama.trim().toUpperCase()); });
    Array.from(names).sort().forEach(n => { const opt = document.createElement('option'); opt.value = n; opt.innerText = n; dashFilterDropdown.appendChild(opt); });
}
if (dashFilterDropdown) { dashFilterDropdown.addEventListener('change', () => updateDashboardMetrics()); }

function initDashboardEmptyChart() {
    const sChart = document.getElementById('salesChart');
    const tChart = document.getElementById('trendChart');
    const tpChart = document.getElementById('topProductsChart');
    if (sChart) salesChartInstance = new Chart(sChart.getContext('2d'), { type: 'bar', data: { labels: ['Produk Utama', 'Aksesoris', 'Grade B'], datasets: [{ data: [0, 0, 0], backgroundColor: ['#ec4899', '#2563eb', '#f59e0b'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
    if (tChart) trendChartInstance = new Chart(tChart.getContext('2d'), { type: 'line', data: { labels: ['Mulai'], datasets: [{ data: [0], borderColor: '#8b5cf6', fill: true }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
    if (tpChart) topProductsChartInstance = new Chart(tpChart.getContext('2d'), { type: 'bar', data: { labels: ['Menunggu...'], datasets: [{ data: [0], backgroundColor: '#10b981' }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
}

function populateFilterDropdown() {
    if (!dropdownFilter) return;
    dropdownFilter.innerHTML = '<option value="all">-- Tampilkan Semua Produk --</option>';
    const cat = document.querySelector('.sub-tab.active')?.getAttribute('data-category') || 'utama';
    let names = new Set();
    if (globalDataKategori[cat]) Object.values(globalDataKategori[cat]).forEach(i => { if (i.nama) names.add(i.nama.trim().toUpperCase()); });
    Array.from(names).sort().forEach(n => { const opt = document.createElement('option'); opt.value = n; opt.innerText = n; dropdownFilter.appendChild(opt); });
    dropdownFilter.value = activeFilterText;
}

if (dropdownFilter) dropdownFilter.addEventListener('change', (e) => { activeFilterText = e.target.value; refreshAllTables(); });
if (btnFilterReset) btnFilterReset.addEventListener('click', () => { if (dropdownFilter) dropdownFilter.value = "all"; activeFilterText = "all"; refreshAllTables(); });

if (btnFileReset) {
    btnFileReset.addEventListener('click', () => {
        totalMasterFiles = 0; if (fileBadge) fileBadge.innerText = '0 File Terupload'; resetKalkulatorDataState();
        if (dashTotalTerjual) dashTotalTerjual.innerText = '0'; 
        if (dashSkuAktif) dashSkuAktif.innerText = '0'; 
        if (dashFileCount) dashFileCount.innerText = '0';
    });
}

// 6. COPY AND SAVE HISTORY METHODS
if (btnCopyQty) {
    btnCopyQty.addEventListener('click', () => {
        const cat = document.querySelector('.sub-tab.active').getAttribute('data-category');
        let txt = ""; Object.keys(globalDataKategori[cat]).sort().forEach(k => { if (activeFilterText === "all" || globalDataKategori[cat][k].nama === activeFilterText) txt += `${globalDataKategori[cat][k].qty}\n`; });
        navigator.clipboard.writeText(txt).then(() => updateStatusMessage('Qty copied.'));
    });
}

if (btnSaveHistory) {
    btnSaveHistory.addEventListener('click', () => {
        const sum = (o) => Object.values(o).reduce((s, i) => s + i.qty, 0);
        const tot = sum(globalDataKategori.utama) + sum(globalDataKategori.aksesoris) + sum(globalDataKategori.gradeb);
        if (tot === 0) return;

        updateStatusMessage("Mengirim data harian...");
        const payload = new URLSearchParams();
        payload.append('action', 'save'); payload.append('waktu', new Date().toLocaleString('id-ID'));
        payload.append('files', totalMasterFiles); payload.append('total', tot); payload.append('detail', JSON.stringify(globalDataKategori));

        fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: payload })
        .then(res => res.json()).then(() => { updateStatusMessage("Sukses tersimpan di Cloud!"); fetchHistoryFromCloud(); });
    });
}

function fetchHistoryFromCloud() {
    const container = document.getElementById('history-list-container'); if (!container) return;
    fetch(`${GOOGLE_SCRIPT_URL}?action=fetch`).then(res => res.json()).then(logs => {
        if (!logs.length) return; container.className = "";
        container.innerHTML = '<div class="table-responsive"><table><thead><tr><th>Waktu Simpan</th><th>Files</th><th>Total Qty</th><th>Aksi</th></tr></thead><tbody id="tbody-history"></tbody></table></div>';
        const tbody = document.getElementById('tbody-history');
        logs.reverse().forEach(log => {
            globalHistoryCloudCache[log.waktu] = log.detail;
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${log.waktu}</td><td>${log.files} Berkas</td><td style="color:#ec4899; font-weight:bold;">${log.total} pcs</td><td><button class="btn-action btn-pink-solid btn-download-history" data-waktu="${log.waktu}">Download</button></td>`;
            if (tbody) tbody.appendChild(tr);
        });
        document.querySelectorAll('.btn-download-history').forEach(b => {
            b.addEventListener('click', (e) => {
                let snap = JSON.parse(globalHistoryCloudCache[e.target.getAttribute('data-waktu')]);
                const wb = XLSX.utils.book_new();
                const fmt = (d) => { let m = [["SKU", "Nama", "Type", "Warna", "Qty"]]; Object.keys(d).sort().forEach(k => m.push([k, d[k].nama, d[k].type, d[k].warna, d[k].qty])); return XLSX.utils.aoa_to_sheet(m); };
                XLSX.utils.book_append_sheet(wb, fmt(snap.utama), "Produk Utama"); XLSX.utils.book_append_sheet(wb, fmt(snap.aksesoris), "Aksesoris"); XLSX.utils.book_append_sheet(wb, fmt(snap.gradeb), "Grade B");
                XLSX.writeFile(wb, `Laporan_Cloud_${e.target.getAttribute('data-waktu').replace(/[^a-zA-Z0-9]/g, "_")}.xlsx`);
            });
        });
    });
}

function generateMasterArrayFormat() {
    let m = [["Kategori", "SKU", "Nama", "Type", "Warna", "Qty"]];
    const ins = (n, o) => Object.keys(o).sort().forEach(k => m.push([n, k, o[k].nama, o[k].type, o[k].warna, o[k].qty]));
    ins("PRODUK UTAMA", globalDataKategori.utama); ins("AKSESORIS", globalDataKategori.aksesoris); ins("GRADE B", globalDataKategori.gradeb); return m;
}

if (btnExportXlsx) {
    btnExportXlsx.addEventListener('click', () => {
        const wb = XLSX.utils.book_new();
        const fmt = (d) => { let m = [["SKU", "Nama", "Type", "Warna", "Qty"]]; Object.keys(d).sort().forEach(k => m.push([k, d[k].nama, d[k].type, d[k].warna, d[k].qty])); return XLSX.utils.aoa_to_sheet(m); };
        XLSX.utils.book_append_sheet(wb, fmt(globalDataKategori.utama), "Produk Utama"); XLSX.utils.book_append_sheet(wb, fmt(globalDataKategori.aksesoris), "Aksesoris"); XLSX.utils.book_append_sheet(wb, fmt(globalDataKategori.gradeb), "Grade B");
        XLSX.writeFile(wb, `Laporan_Tabs_${new Date().toISOString().slice(0,10)}.xlsx`);
    });
}

if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
        const ws = XLSX.utils.aoa_to_sheet(generateMasterArrayFormat());
        const blob = new Blob([XLSX.utils.sheet_to_csv(ws)], { type: 'text/csv;charset=utf-8;' });
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.setAttribute("download", `Laporan_${new Date().toISOString().slice(0,10)}.csv`); a.click();
    });
}

// 7. INPUT MANUAL BERANTAI DROPDOWN
function populateManualNamaDropdown() {
    if (!manualNamaDropdown) return; manualNamaDropdown.innerHTML = '<option value="">-- Pilih Produk --</option>';
    let names = new Set(); Object.values(masterSkus).forEach(i => { if (i.nama) names.add(i.nama.trim().toUpperCase()); });
    Array.from(names).sort().forEach(n => { const opt = document.createElement('option'); opt.value = n; opt.innerText = n; manualNamaDropdown.appendChild(opt); });
}

if (manualNamaDropdown) {
    manualNamaDropdown.addEventListener('change', () => {
        const sNama = manualNamaDropdown.value; if (manualTypeDropdown) manualTypeDropdown.innerHTML = '<option value="">-- Type --</option>'; if (manualWarnaDropdown) manualWarnaDropdown.innerHTML = '<option value="">-- Warna --</option>'; if (manualWarnaDropdown) manualWarnaDropdown.disabled = true;
        if (!sNama) { if (manualTypeDropdown) manualTypeDropdown.disabled = true; return; }
        let types = new Set(); Object.values(masterSkus).forEach(i => { if (i.nama === sNama && i.type) types.add(i.type.trim()); });
        Array.from(types).sort().forEach(t => { const opt = document.createElement('option'); opt.value = t; opt.innerText = t; if (manualTypeDropdown) manualTypeDropdown.appendChild(opt); });
        if (manualTypeDropdown) manualTypeDropdown.disabled = false;
    });
}

if (manualTypeDropdown) {
    manualTypeDropdown.addEventListener('change', () => {
        const sNama = manualNamaDropdown ? manualNamaDropdown.value : ''; const sType = manualTypeDropdown.value; if (manualWarnaDropdown) manualWarnaDropdown.innerHTML = '<option value="">-- Warna --</option>';
        if (!sType) { if (manualWarnaDropdown) manualWarnaDropdown.disabled = true; return; }
        let warnas = new Set(); Object.values(masterSkus).forEach(i => { if (i.nama === sNama && i.type === sType && i.warna) warnas.add(i.warna.trim()); });
        Array.from(warnas).sort().forEach(w => { const opt = document.createElement('option'); opt.value = w; opt.innerText = w; if (manualWarnaDropdown) manualWarnaDropdown.appendChild(opt); });
        if (manualWarnaDropdown) manualWarnaDropdown.disabled = false;
    });
}

if (btnAddManual) {
    btnAddManual.addEventListener('click', () => {
        const n = manualNamaDropdown ? manualNamaDropdown.value : ''; const t = manualTypeDropdown ? manualTypeDropdown.value : ''; const w = manualWarnaDropdown ? manualWarnaDropdown.value : ''; const q = manualQtyInput ? parseInt(manualQtyInput.value, 10) : 0;
        if (!n || !t || !w || isNaN(q) || q <= 0) return;
        let tSku = null; for (let k in masterSkus) { if (masterSkus[k].nama === n && masterSkus[k].type === t && masterSkus[k].warna === w) { tSku = k; break; } }
        if (tSku) {
            const cat = masterSkus[tSku].kategori;
            if (globalDataKategori[cat] && globalDataKategori[cat][tSku]) { globalDataKategori[cat][tSku].qty += q; refreshAllTables(); updateDashboardMetrics(); if (manualQtyInput) manualQtyInput.value = ""; }
        }
    });
}
function updateStatusMessage(msg) { if (statusBar) statusBar.innerText = msg; }
