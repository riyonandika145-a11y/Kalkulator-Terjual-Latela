
// =========================================================================
// PWA: REGISTRASI SERVICE WORKER (biar bisa di-install jadi app desktop)
// =========================================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log('Service Worker terdaftar.'))
            .catch((err) => console.error('Gagal daftar Service Worker:', err));
    });
}

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
const tbodyRandom = document.getElementById('tbody-random');
const tbodyMasterList = document.getElementById('tbody-master-list');
const masterSkuCount = document.getElementById('master-sku-count');
const btnSyncCloud = document.getElementById('btn-sync-cloud');

const menuExtension = document.getElementById('menu-extension');

// SELEKTOR WIDGET JAM & CUACA
const clockTimeEl = document.getElementById('clock-time');
const clockAmpmEl = document.getElementById('clock-ampm');
const weatherTempEl = document.getElementById('weather-temp');
const weatherDescEl = document.getElementById('weather-desc');
const weatherIconBoxEl = document.getElementById('weather-icon-box');

// SELEKTOR THEME PICKER
const btnThemePicker = document.getElementById('btn-theme-picker');
const themePickerPopup = document.getElementById('theme-picker-popup');
const btnHelpPicker = document.getElementById('btn-help-picker');
const helpPickerPopup = document.getElementById('help-picker-popup');
const btnDownloadGuide = document.getElementById('btn-download-guide');
const getThemeSwatchButtons = () => document.querySelectorAll('.theme-swatch');

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
const procVendorSelect = document.getElementById('proc-vendor-select');
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
let globalDataKategori = { utama: {}, aksesoris: {}, gradeb: {}, random: {} };
let totalMasterFiles = 0;
let activeFilterText = "all";

let globalVendorRawData = [];
let currentPoBasket = [];

let salesChartInstance = null; 
let trendChartInstance = null;      
let topProductsChartInstance = null; 
let globalHistoryCloudCache = {};
let globalPoListCache = [];
let globalUserListCache = [];
let globalBarangListCache = [];
let globalPembelianListCache = [];

// --- LOGIN & SESSION ---
const loginOverlay = document.getElementById('login-overlay');
const appContainer = document.getElementById('app-container');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginErrorMsg = document.getElementById('login-error-msg');
const btnLoginSubmit = document.getElementById('btn-login-submit');
const btnLogout = document.getElementById('btn-logout');
const userSessionName = document.getElementById('user-session-name');
const menuKelolaAkun = document.getElementById('menu-kelola-akun');
const menuBarang = document.getElementById('menu-barang');
const menuPembelian = document.getElementById('menu-pembelian');

// SELEKTOR KELOLA AKUN
const akunUsername = document.getElementById('akun-username');
const akunNama = document.getElementById('akun-nama');
const akunPassword = document.getElementById('akun-password');
const akunRole = document.getElementById('akun-role');
const btnSimpanAkun = document.getElementById('btn-simpan-akun');
const btnRefreshAkun = document.getElementById('btn-refresh-akun');

function getSession() {
    try { return JSON.parse(localStorage.getItem('latelaSession') || 'null'); } catch (err) { return null; }
}
function setSession(sess) { localStorage.setItem('latelaSession', JSON.stringify(sess)); }
function clearSession() { localStorage.removeItem('latelaSession'); }

function showApp() {
    if (loginOverlay) loginOverlay.style.display = 'none';
    if (appContainer) appContainer.style.display = '';
}
function showLogin() {
    if (loginOverlay) loginOverlay.style.display = 'flex';
    if (appContainer) appContainer.style.display = 'none';
}

function applyRoleUI() {
    const sess = getSession();
    const isFullAccess = sess && sess.role === 'full';
    if (userSessionName) userSessionName.innerText = sess ? sess.nama : '-';
    if (menuKelolaAkun) menuKelolaAkun.style.display = isFullAccess ? '' : 'none';
    if (menuBarang) menuBarang.style.display = isFullAccess ? '' : 'none';
    if (menuPembelian) menuPembelian.style.display = isFullAccess ? '' : 'none';
}

if (btnLoginSubmit) {
    btnLoginSubmit.addEventListener('click', () => {
        const u = loginUsername ? loginUsername.value.trim() : '';
        const p = loginPassword ? loginPassword.value : '';
        if (!u || !p) { if (loginErrorMsg) loginErrorMsg.innerText = 'Username & password wajib diisi.'; return; }
        if (loginErrorMsg) loginErrorMsg.innerText = 'Memeriksa...';
        btnLoginSubmit.disabled = true;

        const payload = new URLSearchParams();
        payload.append('action', 'login'); payload.append('username', u); payload.append('password', p);
        fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: payload })
            .then(res => res.json())
            .then(result => {
                btnLoginSubmit.disabled = false;
                if (result && result.success) {
                    setSession({ username: u, nama: result.nama, role: result.role });
                    if (loginErrorMsg) loginErrorMsg.innerText = '';
                    if (loginUsername) loginUsername.value = ''; if (loginPassword) loginPassword.value = '';
                    showApp(); applyRoleUI();
                    bootstrapAfterLogin();
                } else {
                    if (loginErrorMsg) loginErrorMsg.innerText = (result && result.message) || 'Username atau password salah.';
                }
            })
            .catch(() => { btnLoginSubmit.disabled = false; if (loginErrorMsg) loginErrorMsg.innerText = 'Gagal menghubungi server, cek koneksi.'; });
    });
}
if (loginPassword) loginPassword.addEventListener('keydown', (e) => { if (e.key === 'Enter' && btnLoginSubmit) btnLoginSubmit.click(); });

if (btnLogout) {
    btnLogout.addEventListener('click', () => { clearSession(); showLogin(); });
}

// Dipanggil sekali setelah login sukses (baik langsung login, atau session lama masih valid)
function bootstrapAfterLogin() {
    fetchPoListFromCloud();
    if (getSession() && getSession().role === 'full') fetchUsers();
}

// --- KELOLA AKUN (khusus Akses Penuh) ---
function fetchUsers() {
    const tbody = document.getElementById('tbody-akun-list');
    if (!tbody) return;
    fetch(`${GOOGLE_SCRIPT_URL}?action=fetch_users`).then(res => res.json()).then(list => {
        globalUserListCache = Array.isArray(list) ? list : [];
        if (!globalUserListCache.length) { tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#94a3b8; font-style:italic;">Belum ada akun.</td></tr>`; return; }
        tbody.innerHTML = '';
        globalUserListCache.forEach(u => {
            const roleLabel = u.role === 'full' ? 'Akses Penuh' : 'Akses Terbatas';
            const tr = document.createElement('tr');
            tr.innerHTML = `<td><strong>${u.username}</strong></td><td>${u.nama || '-'}</td><td>${roleLabel}</td><td><button class="btn-action btn-gray-outline btn-hapus-akun" data-username="${u.username}">Hapus</button></td>`;
            tbody.appendChild(tr);
        });
        tbody.querySelectorAll('.btn-hapus-akun').forEach(btn => btn.addEventListener('click', () => deleteUser(btn.getAttribute('data-username'))));
    }).catch(() => { tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#94a3b8; font-style:italic;">Gagal memuat data akun.</td></tr>`; });
}

if (btnSimpanAkun) {
    btnSimpanAkun.addEventListener('click', () => {
        const u = akunUsername ? akunUsername.value.trim() : '';
        const n = akunNama ? akunNama.value.trim() : '';
        const p = akunPassword ? akunPassword.value : '';
        const r = akunRole ? akunRole.value : 'terbatas';
        if (!u || !n || !p) { updateStatusMessage('(!) Username, Nama, dan Password wajib diisi.'); return; }

        updateStatusMessage('Menyimpan akun...');
        const payload = new URLSearchParams();
        payload.append('action', 'save_user'); payload.append('username', u); payload.append('nama', n); payload.append('password', p); payload.append('role', r);
        fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: payload })
            .then(res => res.json())
            .then(() => {
                updateStatusMessage(`Akun "${u}" berhasil disimpan.`);
                if (akunUsername) akunUsername.value = ''; if (akunNama) akunNama.value = ''; if (akunPassword) akunPassword.value = ''; if (akunRole) akunRole.value = 'terbatas';
                fetchUsers();
            })
            .catch(() => updateStatusMessage('(!) Gagal menyimpan akun.'));
    });
}

function deleteUser(username) {
    if (!confirm(`Yakin ingin menghapus akun "${username}"?`)) return;
    const payload = new URLSearchParams();
    payload.append('action', 'delete_user'); payload.append('username', username);
    fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: payload })
        .then(res => res.json())
        .then(() => { updateStatusMessage(`Akun "${username}" berhasil dihapus.`); fetchUsers(); })
        .catch(() => updateStatusMessage('(!) Gagal menghapus akun.'));
}

if (btnRefreshAkun) btnRefreshAkun.addEventListener('click', fetchUsers);

// --- BARANG (khusus Akses Penuh) ---
const btnRefreshBarang = document.getElementById('btn-refresh-barang');
const barangEditModal = document.getElementById('barang-edit-modal');
const barangEditRowIndex = document.getElementById('barang-edit-rowindex');
const barangEditNama = document.getElementById('barang-edit-nama');
const barangEditVariasi = document.getElementById('barang-edit-variasi');
const barangEditToko = document.getElementById('barang-edit-toko');
const barangEditVendor = document.getElementById('barang-edit-vendor');
const barangEditKodeVendor = document.getElementById('barang-edit-kodevendor');
const barangEditHarga = document.getElementById('barang-edit-harga');
const barangEditSatuan = document.getElementById('barang-edit-satuan');
const barangEditLeadtime = document.getElementById('barang-edit-leadtime');
const barangEditErrorMsg = document.getElementById('barang-edit-error-msg');
const btnBarangEditSave = document.getElementById('btn-barang-edit-save');
const btnBarangEditCancel = document.getElementById('btn-barang-edit-cancel');

function fetchBarangList() {
    const tbody = document.getElementById('tbody-barang-list');
    if (!tbody) return;
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#94a3b8; font-style:italic;">Memuat data barang...</td></tr>`;
    fetch(`${GOOGLE_SCRIPT_URL}?action=fetch_barang`).then(res => res.json()).then(list => {
        globalBarangListCache = Array.isArray(list) ? list : [];
        renderBarangTable(globalBarangListCache);
    }).catch(() => { tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#94a3b8; font-style:italic;">Gagal memuat data barang.</td></tr>`; });
}

function renderBarangTable(list) {
    const tbody = document.getElementById('tbody-barang-list');
    if (!tbody) return;
    if (!list.length) { tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#94a3b8; font-style:italic;">Tidak ada data yang cocok.</td></tr>`; return; }
    tbody.innerHTML = '';
    list.forEach(b => {
        const hargaFmt = (b.harga !== undefined && b.harga !== null && b.harga !== '') ? `Rp ${Number(b.harga).toLocaleString('id-ID')}` : '-';
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${b.namaProduk || '-'}</td><td>${b.variasi || '-'}</td><td>${b.toko || '-'}</td><td>${b.vendor || '-'}</td><td>${b.kodeVendor || '-'}</td><td style="text-align:right;">${hargaFmt}</td><td>${b.satuan || '-'}</td><td style="text-align:right;">${b.leadTime !== undefined && b.leadTime !== null && b.leadTime !== '' ? `${b.leadTime} Hari` : '-'}</td><td style="text-align:center;">
            <button class="btn-aksi-titik3" data-rowindex="${b.rowIndex}">⋮</button>
        </td>`;
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-aksi-titik3').forEach(btn => btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const rowIndex = btn.getAttribute('data-rowindex');
        openAksiTitik3Menu(btn, [
            { label: 'Edit', onClick: () => openBarangEditModal(rowIndex) },
            { label: 'Hapus', danger: true, onClick: () => deleteBarang(rowIndex) }
        ]);
    }));
}

// =========================================================================
// HELPER BERSAMA: menu titik-3 (dipakai di tabel Barang, Pembelian, dst).
// Cuma 1 elemen yang di-reuse & ditaruh langsung di <body>, diposisikan pakai
// getBoundingClientRect() pas tombolnya diklik. Ini biar menu-nya gak ke-crop
// sama overflow:auto di container tabel yang bisa di-scroll (bug lama, dropdown
// ke-render tapi kepotong invisible sama container-nya).
// =========================================================================
let _aksiTitik3Menu = null;
function openAksiTitik3Menu(btn, items) {
    closeAksiTitik3Menu();
    if (!_aksiTitik3Menu) {
        _aksiTitik3Menu = document.createElement('div');
        _aksiTitik3Menu.className = 'dropdown-aksi-titik3';
        document.body.appendChild(_aksiTitik3Menu);
    }
    _aksiTitik3Menu.innerHTML = '';
    items.forEach(it => {
        const b = document.createElement('button');
        b.textContent = it.label;
        if (it.danger) b.className = 'dropdown-item-hapus';
        b.addEventListener('click', (e) => { e.stopPropagation(); closeAksiTitik3Menu(); it.onClick(); });
        _aksiTitik3Menu.appendChild(b);
    });
    const rect = btn.getBoundingClientRect();
    _aksiTitik3Menu.style.position = 'fixed';
    _aksiTitik3Menu.style.top = (rect.bottom + 4) + 'px';
    _aksiTitik3Menu.style.right = (window.innerWidth - rect.right) + 'px';
    _aksiTitik3Menu.style.left = 'auto';
    _aksiTitik3Menu.classList.add('show');
}
function closeAksiTitik3Menu() {
    if (_aksiTitik3Menu) _aksiTitik3Menu.classList.remove('show');
}
document.addEventListener('click', closeAksiTitik3Menu);
document.addEventListener('scroll', closeAksiTitik3Menu, true);



// --- SEARCH BARANG (filter live dari cache, gak perlu fetch ulang) ---
const searchBarangInput = document.getElementById('search-barang');
if (searchBarangInput) {
    searchBarangInput.addEventListener('input', () => {
        const q = searchBarangInput.value.trim().toLowerCase();
        if (!q) { renderBarangTable(globalBarangListCache); return; }
        const filtered = globalBarangListCache.filter(b =>
            (b.namaProduk || '').toString().toLowerCase().includes(q) ||
            (b.variasi || '').toString().toLowerCase().includes(q) ||
            (b.toko || '').toString().toLowerCase().includes(q) ||
            (b.vendor || '').toString().toLowerCase().includes(q) ||
            (b.kodeVendor || '').toString().toLowerCase().includes(q)
        );
        renderBarangTable(filtered);
    });
}

const barangEditModalTitle = document.getElementById('barang-edit-modal-title');

function openBarangEditModal(rowIndex) {
    const b = (globalBarangListCache || []).find(x => String(x.rowIndex) === String(rowIndex));
    if (!b) { updateStatusMessage("(!) Data barang tidak ditemukan."); return; }
    if (barangEditModalTitle) barangEditModalTitle.innerText = 'Edit Barang';
    if (barangEditRowIndex) barangEditRowIndex.value = b.rowIndex;
    if (barangEditNama) barangEditNama.value = b.namaProduk || '';
    if (barangEditVariasi) barangEditVariasi.value = b.variasi || '';
    if (barangEditToko) barangEditToko.value = b.toko || '';
    if (barangEditVendor) barangEditVendor.value = b.vendor || '';
    if (barangEditKodeVendor) barangEditKodeVendor.value = b.kodeVendor || '';
    if (barangEditHarga) barangEditHarga.value = b.harga || '';
    if (barangEditSatuan) barangEditSatuan.value = b.satuan || 'Pcs';
    if (barangEditLeadtime) barangEditLeadtime.value = b.leadTime || '';
    if (barangEditErrorMsg) barangEditErrorMsg.innerText = '';
    if (barangEditModal) barangEditModal.classList.add('show');
}

// Mode TAMBAH: buka modal yang sama tapi kosong, rowIndex dikosongin
// (dipakai sebagai penanda "ini data baru" pas disimpan nanti)
function openBarangAddModal() {
    if (barangEditModalTitle) barangEditModalTitle.innerText = 'Tambah Barang';
    if (barangEditRowIndex) barangEditRowIndex.value = '';
    if (barangEditNama) barangEditNama.value = '';
    if (barangEditVariasi) barangEditVariasi.value = '';
    if (barangEditToko) barangEditToko.value = '';
    if (barangEditVendor) barangEditVendor.value = '';
    if (barangEditKodeVendor) barangEditKodeVendor.value = '';
    if (barangEditHarga) barangEditHarga.value = '';
    if (barangEditSatuan) barangEditSatuan.value = 'Pcs';
    if (barangEditLeadtime) barangEditLeadtime.value = '';
    if (barangEditErrorMsg) barangEditErrorMsg.innerText = '';
    if (barangEditModal) barangEditModal.classList.add('show');
}
const btnTambahBarang = document.getElementById('btn-tambah-barang');
if (btnTambahBarang) btnTambahBarang.addEventListener('click', openBarangAddModal);

function deleteBarang(rowIndex) {
    const b = (globalBarangListCache || []).find(x => String(x.rowIndex) === String(rowIndex));
    if (!confirm(`Yakin ingin menghapus barang "${b ? b.namaProduk : ''}"? Aksi ini gak bisa dibatalin.`)) return;
    updateStatusMessage('Menghapus data barang...');
    const payload = new URLSearchParams();
    payload.append('action', 'delete_barang'); payload.append('rowIndex', rowIndex);
    fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: payload })
        .then(res => res.json())
        .then(() => { updateStatusMessage('Barang berhasil dihapus.'); fetchBarangList(); })
        .catch(() => updateStatusMessage('(!) Gagal menghapus barang.'));
}

if (btnBarangEditCancel) btnBarangEditCancel.addEventListener('click', () => { if (barangEditModal) barangEditModal.classList.remove('show'); });
if (barangEditModal) barangEditModal.addEventListener('click', (e) => { if (e.target === barangEditModal) barangEditModal.classList.remove('show'); });

if (btnBarangEditSave) {
    btnBarangEditSave.addEventListener('click', () => {
        const rowIndex = barangEditRowIndex ? barangEditRowIndex.value : '';
        const namaValue = barangEditNama ? barangEditNama.value.trim() : '';
        if (!namaValue) { if (barangEditErrorMsg) barangEditErrorMsg.innerText = 'Nama Produk wajib diisi.'; return; }

        btnBarangEditSave.disabled = true;
        if (barangEditErrorMsg) barangEditErrorMsg.innerText = 'Menyimpan...';

        const payload = new URLSearchParams();
        payload.append('action', rowIndex ? 'update_barang' : 'create_barang');
        if (rowIndex) payload.append('rowIndex', rowIndex);
        payload.append('namaProduk', namaValue);
        payload.append('variasi', barangEditVariasi ? barangEditVariasi.value.trim() : '');
        payload.append('toko', barangEditToko ? barangEditToko.value.trim() : '');
        payload.append('vendor', barangEditVendor ? barangEditVendor.value.trim() : '');
        payload.append('kodeVendor', barangEditKodeVendor ? barangEditKodeVendor.value.trim() : '');
        payload.append('harga', barangEditHarga ? barangEditHarga.value : '');
        payload.append('satuan', barangEditSatuan ? barangEditSatuan.value : 'Pcs');
        payload.append('leadTime', barangEditLeadtime ? barangEditLeadtime.value : '');

        fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: payload })
            .then(res => res.json())
            .then((result) => {
                btnBarangEditSave.disabled = false;
                if (result && result.success) {
                    if (barangEditModal) barangEditModal.classList.remove('show');
                    updateStatusMessage(rowIndex ? 'Data barang berhasil diupdate.' : 'Barang baru berhasil ditambahkan.');
                    fetchBarangList();
                } else {
                    if (barangEditErrorMsg) barangEditErrorMsg.innerText = (result && result.message) || 'Gagal menyimpan.';
                }
            })
            .catch(() => { btnBarangEditSave.disabled = false; if (barangEditErrorMsg) barangEditErrorMsg.innerText = 'Gagal menghubungi server.'; });
    });
}

if (btnRefreshBarang) btnRefreshBarang.addEventListener('click', fetchBarangList);

// --- HISTORI PEMBELIAN (khusus Akses Penuh) ---
// Setiap submit di sini otomatis nulis ke 2 spreadsheet sekaligus di Google Sheets:
// Payment Tracking & Purchasing Control (masing-masing pakai appendRow, jadi
// otomatis masuk ke baris kosong paling bawah tanpa perlu ngecek manual).
const btnTambahPembelian = document.getElementById('btn-tambah-pembelian');
const btnRefreshPembelian = document.getElementById('btn-refresh-pembelian');
const searchPembelianInput = document.getElementById('search-pembelian');

let pembelianAddingNew = false; // true kalau lagi nampilin baris kosong buat input item baru

if (btnTambahPembelian) {
    btnTambahPembelian.addEventListener('click', () => {
        pembelianAddingNew = true;
        pembelianCurrentPage = 1; // biar baris barunya kelihatan di halaman pertama
        renderPembelianTable(pembelianLastList.length ? pembelianLastList : globalPembelianListCache);
    });
}

function todayDateString() {
    const hariIni = new Date();
    const yyyy = hariIni.getFullYear();
    const mm = String(hariIni.getMonth() + 1).padStart(2, '0');
    const dd = String(hariIni.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function fetchPembelianList() {
    const tbody = document.getElementById('tbody-pembelian-list');
    if (!tbody) return;
    pembelianAddingNew = false;
    pembelianEditingRowIndex = null;
    tbody.innerHTML = `<tr><td colspan="14" style="text-align:center; color:#94a3b8; font-style:italic;">Memuat data histori pembelian...</td></tr>`;
    fetch(`${PEMBELIAN_API_BASE}/list`).then(res => res.json()).then(list => {
        // alias "id" (dari D1) jadi "rowIndex" biar semua kode render yang udah
        // ada (data-rowindex, dsb) tetap kompatibel tanpa perlu diubah ulang
        globalPembelianListCache = Array.isArray(list) ? list.map(r => ({ ...r, rowIndex: r.id })) : [];
        pembelianCurrentPage = 1;
        renderPembelianTable(globalPembelianListCache);
    }).catch(() => { tbody.innerHTML = `<tr><td colspan="14" style="text-align:center; color:#94a3b8; font-style:italic;">Gagal memuat data histori pembelian.</td></tr>`; });
}

function badgeClassStatusBayar(status) {
    const s = (status || '').toLowerCase();
    if (s === 'sudah bayar') return 'badge-status-approved';
    if (s === 'hold') return 'badge-status-rejected';
    return 'badge-status-pending';
}
function badgeClassStatusPurchasing(status) {
    const s = (status || '').toLowerCase();
    if (s === 'complete') return 'badge-status-approved';
    if (s === 'close') return 'badge-status-rejected';
    return 'badge-status-pending';
}

// 🔧 PAGINATION: data bisa ribuan baris (7000+), kalau di-render semua
// sekaligus ke DOM, browser jadi berat banget & ngelag di SEMUA halaman
// (karena halaman yang gak lagi dibuka cuma "disembunyikan", bukan
// beneran dihapus, jadi elemennya tetap nempel di memori). Makanya
// cuma render 1 halaman dalam satu waktu, jumlahnya bisa dipilih user.
let pembelianCurrentPage = 1;
let PEMBELIAN_PAGE_SIZE = 50;
let pembelianLastList = []; // list yang lagi ditampilin (buat re-render pas ganti halaman/page size/batal edit)
let pembelianEditingRowIndex = null; // rowIndex baris yang lagi di-edit inline (null = gak ada yang lagi diedit)

const pembelianPageSizeSelect = document.getElementById('pembelian-page-size');
if (pembelianPageSizeSelect) {
    pembelianPageSizeSelect.addEventListener('change', () => {
        PEMBELIAN_PAGE_SIZE = parseInt(pembelianPageSizeSelect.value, 10) || 50;
        pembelianCurrentPage = 1;
        renderPembelianTable(pembelianLastList);
    });
}

const PEMBELIAN_SATUAN_OPTIONS = ['Pcs', 'Kg', 'Roll', 'Yards', 'Pack', 'Lusin'];
const PEMBELIAN_STATUS_BAYAR_OPTIONS = ['Belum Bayar', 'Sudah Bayar', 'Hold'];
const PEMBELIAN_STATUS_PURCHASING_OPTIONS = ['On Order', 'Complete', 'Close'];

function buildSelectOptionsHtml(options, selectedValue) {
    return options.map(opt => `<option value="${opt}" ${opt === selectedValue ? 'selected' : ''}>${opt}</option>`).join('');
}

function buildPembelianNewRowHtml() {
    return `<tr class="pembelian-new-row">
        <td><input type="text" class="inline-edit-field" data-field="noPo" placeholder="No. PO" style="width:90px;"></td>
        <td><input type="text" class="inline-edit-field" data-field="barang" placeholder="Barang" style="width:100px;"></td>
        <td><input type="text" class="inline-edit-field" data-field="kode" placeholder="Kode" style="width:80px;"></td>
        <td><input type="text" class="inline-edit-field" data-field="variasi" placeholder="Variasi" style="width:90px;"></td>
        <td><input type="number" class="inline-edit-field" data-field="qty" placeholder="Qty" style="width:60px;"></td>
        <td><select class="inline-edit-field" data-field="satuan" style="width:80px;">${buildSelectOptionsHtml(PEMBELIAN_SATUAN_OPTIONS, 'Pcs')}</select></td>
        <td><input type="date" class="inline-edit-field" data-field="tanggalPengajuan" value="${todayDateString()}" style="width:130px;"></td>
        <td><input type="text" class="inline-edit-field" data-field="requestor" placeholder="Requestor" style="width:90px;"></td>
        <td><input type="number" class="inline-edit-field" data-field="expense" placeholder="Total" style="width:90px;"></td>
        <td><select class="inline-edit-field" data-field="statusPembayaran" style="width:100px;">${buildSelectOptionsHtml(PEMBELIAN_STATUS_BAYAR_OPTIONS, 'Belum Bayar')}</select></td>
        <td><select class="inline-edit-field" data-field="statusPurchasing" style="width:100px;">${buildSelectOptionsHtml(PEMBELIAN_STATUS_PURCHASING_OPTIONS, 'On Order')}</select></td>
        <td><input type="date" class="inline-edit-field" data-field="tanggalComplete" style="width:130px;"></td>
        <td><input type="text" class="inline-edit-field" data-field="notes" placeholder="Catatan" style="width:100px;"></td>
        <td style="text-align:center; white-space:nowrap;">
            <button class="btn-inline-save-new">Simpan</button>
            <button class="btn-inline-cancel-new">Batal</button>
        </td>
    </tr>`;
}

function renderPembelianTable(list) {
    pembelianLastList = list;
    const tbody = document.getElementById('tbody-pembelian-list');
    if (!tbody) return;

    if (!list.length) {
        tbody.innerHTML = (pembelianAddingNew ? buildPembelianNewRowHtml() : '') + (pembelianAddingNew ? '' : `<tr><td colspan="14" style="text-align:center; color:#94a3b8; font-style:italic;">Tidak ada data yang cocok.</td></tr>`);
        wirePembelianNewRowHandlers(tbody);
        renderPembelianPagination(list);
        return;
    }

    const totalPages = Math.max(1, Math.ceil(list.length / PEMBELIAN_PAGE_SIZE));
    if (pembelianCurrentPage > totalPages) pembelianCurrentPage = totalPages;
    const startIdx = (pembelianCurrentPage - 1) * PEMBELIAN_PAGE_SIZE;
    const pageItems = list.slice(startIdx, startIdx + PEMBELIAN_PAGE_SIZE);

    tbody.innerHTML = (pembelianAddingNew && pembelianCurrentPage === 1) ? buildPembelianNewRowHtml() : '';
    pageItems.forEach(p => {
        const tr = document.createElement('tr');
        const isEditing = pembelianEditingRowIndex !== null && String(pembelianEditingRowIndex) === String(p.rowIndex);

        if (isEditing) {
            // --- MODE EDIT: semua cell jadi input/select langsung di baris ---
            tr.innerHTML = `
                <td><input type="text" class="inline-edit-field" data-field="noPo" value="${(p.noPo || '').toString().replace(/"/g, '&quot;')}" style="width:90px;"></td>
                <td><input type="text" class="inline-edit-field" data-field="barang" value="${(p.barang || '').toString().replace(/"/g, '&quot;')}" style="width:100px;"></td>
                <td><input type="text" class="inline-edit-field" data-field="kode" value="${(p.kode || '').toString().replace(/"/g, '&quot;')}" style="width:80px;"></td>
                <td><input type="text" class="inline-edit-field" data-field="variasi" value="${(p.variasi || '').toString().replace(/"/g, '&quot;')}" style="width:90px;"></td>
                <td><input type="number" class="inline-edit-field" data-field="qty" value="${p.qty !== undefined && p.qty !== null ? p.qty : ''}" style="width:60px;"></td>
                <td><select class="inline-edit-field" data-field="satuan" style="width:80px;">${buildSelectOptionsHtml(PEMBELIAN_SATUAN_OPTIONS, p.satuan)}</select></td>
                <td><input type="date" class="inline-edit-field" data-field="tanggalPengajuan" value="${normalizeDateForInput(p.tanggalPengajuan)}" style="width:130px;"></td>
                <td><input type="text" class="inline-edit-field" data-field="requestor" value="${(p.requestor || '').toString().replace(/"/g, '&quot;')}" style="width:90px;"></td>
                <td><input type="number" class="inline-edit-field" data-field="expense" value="${p.expense !== undefined && p.expense !== null ? p.expense : ''}" style="width:90px;"></td>
                <td><select class="inline-edit-field" data-field="statusPembayaran" style="width:100px;">${buildSelectOptionsHtml(PEMBELIAN_STATUS_BAYAR_OPTIONS, p.statusPembayaran)}</select></td>
                <td><select class="inline-edit-field" data-field="statusPurchasing" style="width:100px;">${buildSelectOptionsHtml(PEMBELIAN_STATUS_PURCHASING_OPTIONS, p.statusPurchasing)}</select></td>
                <td><input type="date" class="inline-edit-field" data-field="tanggalComplete" value="${normalizeDateForInput(p.tanggalComplete)}" style="width:130px;"></td>
                <td><input type="text" class="inline-edit-field" data-field="notes" value="${(p.notes || '').toString().replace(/"/g, '&quot;')}" style="width:100px;"></td>
                <td style="text-align:center; white-space:nowrap;">
                    <button class="btn-inline-save" data-rowindex="${p.rowIndex}">Simpan</button>
                    <button class="btn-inline-cancel">Batal</button>
                </td>`;
        } else {
            // --- MODE TAMPIL BIASA ---
            const expenseFmt = (p.expense !== undefined && p.expense !== null && p.expense !== '') ? `Rp ${Number(p.expense).toLocaleString('id-ID')}` : '-';
            tr.innerHTML = `<td><strong>${p.noPo || '-'}</strong></td><td>${p.barang || '-'}</td><td>${p.kode || '-'}</td><td>${p.variasi || '-'}</td><td style="text-align:right;">${p.qty !== undefined && p.qty !== null && p.qty !== '' ? p.qty : '-'}</td><td>${p.satuan || '-'}</td><td>${formatTanggalDisplay(p.tanggalPengajuan)}</td><td>${p.requestor || '-'}</td><td style="text-align:right;">${expenseFmt}</td><td><span class="badge-status ${badgeClassStatusBayar(p.statusPembayaran)}">${p.statusPembayaran || '-'}</span></td><td><span class="badge-status ${badgeClassStatusPurchasing(p.statusPurchasing)}">${p.statusPurchasing || '-'}</span></td><td>${p.tanggalComplete ? formatTanggalDisplay(p.tanggalComplete) : '-'}</td><td>${p.notes || '-'}</td><td style="text-align:center;">
                <button class="btn-aksi-titik3" data-rowindex="${p.rowIndex}">&#8942;</button>
            </td>`;
        }
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-aksi-titik3').forEach(btn => btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const rowIndex = btn.getAttribute('data-rowindex');
        openAksiTitik3Menu(btn, [
            { label: 'Edit', onClick: () => { pembelianEditingRowIndex = rowIndex; renderPembelianTable(pembelianLastList); } },
            { label: 'Hapus', danger: true, onClick: () => deletePembelian(rowIndex) }
        ]);
    }));


    // Tombol Simpan/Batal buat mode inline-edit
    tbody.querySelectorAll('.btn-inline-save').forEach(btn => btn.addEventListener('click', () => savePembelianInlineEdit(btn)));
    tbody.querySelectorAll('.btn-inline-cancel').forEach(btn => btn.addEventListener('click', () => { pembelianEditingRowIndex = null; renderPembelianTable(pembelianLastList); }));

    wirePembelianNewRowHandlers(tbody);
    renderPembelianPagination(list);
}

// Wiring khusus tombol Simpan/Batal di baris "tambah item baru"
function wirePembelianNewRowHandlers(tbody) {
    const btnSaveNew = tbody.querySelector('.btn-inline-save-new');
    const btnCancelNew = tbody.querySelector('.btn-inline-cancel-new');
    if (btnSaveNew) btnSaveNew.addEventListener('click', () => savePembelianNewRow(btnSaveNew));
    if (btnCancelNew) btnCancelNew.addEventListener('click', () => { pembelianAddingNew = false; renderPembelianTable(pembelianLastList); });
}

function savePembelianNewRow(btnSaveEl) {
    const tr = btnSaveEl.closest('tr');
    const getVal = (field) => { const el = tr.querySelector(`.inline-edit-field[data-field="${field}"]`); return el ? el.value : ''; };
    const noPo = getVal('noPo').trim();
    const barang = getVal('barang').trim();
    if (!noPo || !barang) { updateStatusMessage('(!) No. PO dan Barang wajib diisi.'); return; }

    btnSaveEl.disabled = true;
    updateStatusMessage('Menyimpan histori pembelian...');

    fetch(`${PEMBELIAN_API_BASE}/submit`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            noPo, barang,
            kode: getVal('kode').trim(), variasi: getVal('variasi').trim(),
            qty: getVal('qty'), satuan: getVal('satuan'),
            tanggalPengajuan: getVal('tanggalPengajuan'), requestor: getVal('requestor').trim(),
            expense: getVal('expense'), statusPembayaran: getVal('statusPembayaran'),
            statusPurchasing: getVal('statusPurchasing'), tanggalComplete: getVal('tanggalComplete'),
            notes: getVal('notes').trim()
        })
    })
        .then(res => res.json())
        .then((result) => {
            btnSaveEl.disabled = false;
            if (result && result.success) {
                updateStatusMessage(`Histori pembelian "${barang}" berhasil disimpan.`);
                pembelianAddingNew = false;
                fetchPembelianList();
            } else {
                updateStatusMessage('(!) ' + ((result && result.message) || 'Gagal menyimpan histori pembelian.'));
            }
        })
        .catch(() => { btnSaveEl.disabled = false; updateStatusMessage('(!) Gagal menghubungi server.'); });
}

function savePembelianInlineEdit(btnSaveEl) {
    const tr = btnSaveEl.closest('tr');
    const rowIndex = btnSaveEl.getAttribute('data-rowindex'); // ini sekarang = id asli di database

    const getVal = (field) => { const el = tr.querySelector(`.inline-edit-field[data-field="${field}"]`); return el ? el.value : ''; };
    const noPo = getVal('noPo').trim();
    const barang = getVal('barang').trim();
    if (!noPo || !barang) { updateStatusMessage('(!) No. PO dan Barang wajib diisi.'); return; }

    btnSaveEl.disabled = true;
    updateStatusMessage('Menyimpan perubahan...');

    fetch(`${PEMBELIAN_API_BASE}/update`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: rowIndex, noPo, barang,
            kode: getVal('kode').trim(), variasi: getVal('variasi').trim(),
            qty: getVal('qty'), satuan: getVal('satuan'),
            tanggalPengajuan: getVal('tanggalPengajuan'), requestor: getVal('requestor').trim(),
            expense: getVal('expense'), statusPembayaran: getVal('statusPembayaran'),
            statusPurchasing: getVal('statusPurchasing'), tanggalComplete: getVal('tanggalComplete'),
            notes: getVal('notes').trim()
        })
    })
        .then(res => res.json())
        .then((result) => {
            btnSaveEl.disabled = false;
            if (result && result.success) {
                updateStatusMessage('Perubahan berhasil disimpan.');
                pembelianEditingRowIndex = null;
                fetchPembelianList();
            } else {
                updateStatusMessage('(!) ' + ((result && result.message) || 'Gagal menyimpan perubahan.'));
            }
        })
        .catch(() => { btnSaveEl.disabled = false; updateStatusMessage('(!) Gagal menghubungi server.'); });
}

function renderPembelianPagination(list) {
    let pagerEl = document.getElementById('pembelian-pagination');
    if (!pagerEl) {
        pagerEl = document.createElement('div');
        pagerEl.id = 'pembelian-pagination';
        pagerEl.style.cssText = 'display:flex; align-items:center; justify-content:space-between; gap:10px; padding-top:12px; flex-wrap:wrap;';
        const tableResponsive = document.querySelector('#view-pembelian .table-responsive');
        if (tableResponsive && tableResponsive.parentNode) tableResponsive.parentNode.appendChild(pagerEl);
    }
    if (!list.length) { pagerEl.innerHTML = ''; return; }

    const totalPages = Math.max(1, Math.ceil(list.length / PEMBELIAN_PAGE_SIZE));
    const startIdx = (pembelianCurrentPage - 1) * PEMBELIAN_PAGE_SIZE;
    const endIdx = Math.min(startIdx + PEMBELIAN_PAGE_SIZE, list.length);

    pagerEl.innerHTML = `
        <span style="font-size:12px; color:var(--text-muted);">Menampilkan ${startIdx + 1}-${endIdx} dari ${list.length} data</span>
        <div style="display:flex; gap:8px; align-items:center;">
            <button id="btn-pembelian-prev" class="btn-action btn-pink-outline" ${pembelianCurrentPage <= 1 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>&larr; Sebelumnya</button>
            <span style="font-size:12px; color:var(--text-main);">Halaman ${pembelianCurrentPage} / ${totalPages}</span>
            <button id="btn-pembelian-next" class="btn-action btn-pink-outline" ${pembelianCurrentPage >= totalPages ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>Berikutnya &rarr;</button>
        </div>`;

    const btnPrev = document.getElementById('btn-pembelian-prev');
    const btnNext = document.getElementById('btn-pembelian-next');
    if (btnPrev) btnPrev.addEventListener('click', () => { if (pembelianCurrentPage > 1) { pembelianCurrentPage--; renderPembelianTable(list); } });
    if (btnNext) btnNext.addEventListener('click', () => { if (pembelianCurrentPage < totalPages) { pembelianCurrentPage++; renderPembelianTable(list); } });
}


if (searchPembelianInput) {
    searchPembelianInput.addEventListener('input', () => {
        const q = searchPembelianInput.value.trim().toLowerCase();
        pembelianCurrentPage = 1; // reset ke halaman 1 tiap kali search berubah
        if (!q) { renderPembelianTable(globalPembelianListCache); return; }
        const filtered = globalPembelianListCache.filter(p =>
            (p.noPo || '').toString().toLowerCase().includes(q) ||
            (p.barang || '').toString().toLowerCase().includes(q) ||
            (p.requestor || '').toString().toLowerCase().includes(q) ||
            (p.variasi || '').toString().toLowerCase().includes(q)
        );
        renderPembelianTable(filtered);
    });
}

function normalizeDateForInput(raw) {
    if (!raw) return '';
    if (raw instanceof Date) {
        const yyyy = raw.getFullYear(); const mm = String(raw.getMonth() + 1).padStart(2, '0'); const dd = String(raw.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }
    return raw.toString().slice(0, 10);
}

function deletePembelian(rowIndex) {
    const p = (globalPembelianListCache || []).find(x => String(x.rowIndex) === String(rowIndex));
    if (!confirm(`Yakin ingin menghapus histori pembelian "${p ? p.barang : ''}"?`)) return;
    updateStatusMessage('Menghapus data...');
    fetch(`${PEMBELIAN_API_BASE}/delete`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: rowIndex })
    })
        .then(res => res.json())
        .then(() => { updateStatusMessage('Histori pembelian berhasil dihapus.'); fetchPembelianList(); })
        .catch(() => updateStatusMessage('(!) Gagal menghapus data.'));
}

if (btnRefreshPembelian) btnRefreshPembelian.addEventListener('click', fetchPembelianList);

// --- INITIAL BOOTSTRAP ---
window.addEventListener('DOMContentLoaded', () => {
    applyStoredTheme();

    // 🔒 CEK SESI LOGIN DULU SEBELUM APP DITAMPILKAN
    const existingSession = getSession();
    if (existingSession) { showApp(); applyRoleUI(); bootstrapAfterLogin(); }
    else { showLogin(); }

    const savedSidebarState = localStorage.getItem('sidebarState');
    if (savedSidebarState === 'collapsed' && sidebarElement) {
        sidebarElement.classList.add('collapsed');
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

    startLiveClock();
    fetchLiveWeather();
    setInterval(fetchLiveWeather, 15 * 60 * 1000); // refresh cuaca tiap 15 menit
});

// =========================================================================
// THEME PICKER — pilih preset tema, tersimpan di localStorage
// =========================================================================
const THEME_STORAGE_KEY = 'latelaThemePreset';

function applyStoredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) || 'default';
    setActiveTheme(saved, false);
}

function setActiveTheme(themeName, persist) {
    if (themeName === 'default') {
        document.body.removeAttribute('data-theme');
    } else {
        document.body.setAttribute('data-theme', themeName);
    }
    getThemeSwatchButtons().forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-theme') === themeName);
    });
    if (persist) localStorage.setItem(THEME_STORAGE_KEY, themeName);
}

if (btnThemePicker) {
    btnThemePicker.addEventListener('click', (e) => {
        e.stopPropagation();
        if (themePickerPopup) themePickerPopup.classList.toggle('show');
    });
}

if (themePickerPopup) {
    themePickerPopup.addEventListener('click', (e) => {
        const btn = e.target.closest('.theme-swatch');
        if (!btn) return;
        const themeName = btn.getAttribute('data-theme');
        setActiveTheme(themeName, true);
        themePickerPopup.classList.remove('show');
        updateStatusMessage(`Tema diubah ke "${btn.getAttribute('title')}".`);
    });
}

document.addEventListener('click', (e) => {
    if (themePickerPopup && !themePickerPopup.contains(e.target) && e.target !== btnThemePicker) {
        themePickerPopup.classList.remove('show');
    }
    if (helpPickerPopup && !helpPickerPopup.contains(e.target) && e.target !== btnHelpPicker) {
        helpPickerPopup.classList.remove('show');
    }
});

if (btnHelpPicker) {
    btnHelpPicker.addEventListener('click', (e) => {
        e.stopPropagation();
        if (helpPickerPopup) helpPickerPopup.classList.toggle('show');
    });
}

if (btnDownloadGuide) {
    btnDownloadGuide.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = 'Panduan-Latela-OMS.pdf';
        link.download = 'Panduan Latela Order Management System.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        if (helpPickerPopup) helpPickerPopup.classList.remove('show');
        updateStatusMessage('Mengunduh panduan penggunaan (PDF)...');
    });
}

// =========================================================================
// WIDGET JAM REAL-TIME
// =========================================================================
function startLiveClock() {
    const render = () => {
        const now = new Date();
        let h = now.getHours();
        const m = now.getMinutes().toString().padStart(2, '0');
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12; if (h === 0) h = 12;
        if (clockTimeEl) clockTimeEl.innerText = `${h}:${m}`;
        if (clockAmpmEl) clockAmpmEl.innerText = ampm;
    };
    render();
    setInterval(render, 1000);
}

// =========================================================================
// WIDGET CUACA LIVE — Open-Meteo (gratis, tanpa API key) — Lokasi Bandung
// =========================================================================
const WEATHER_CODE_MAP = {
    0: { text: 'Cerah', icon: '☀️' },
    1: { text: 'Cerah Berawan', icon: '🌤️' },
    2: { text: 'Berawan Sebagian', icon: '⛅' },
    3: { text: 'Mendung', icon: '☁️' },
    45: { text: 'Berkabut', icon: '🌫️' },
    48: { text: 'Kabut Beku', icon: '🌫️' },
    51: { text: 'Gerimis Ringan', icon: '🌦️' },
    53: { text: 'Gerimis', icon: '🌦️' },
    55: { text: 'Gerimis Lebat', icon: '🌧️' },
    61: { text: 'Hujan Ringan', icon: '🌧️' },
    63: { text: 'Hujan', icon: '🌧️' },
    65: { text: 'Hujan Lebat', icon: '🌧️' },
    71: { text: 'Salju Ringan', icon: '🌨️' },
    73: { text: 'Salju', icon: '🌨️' },
    75: { text: 'Salju Lebat', icon: '🌨️' },
    80: { text: 'Hujan Sebentar', icon: '🌦️' },
    81: { text: 'Hujan Deras Sebentar', icon: '🌧️' },
    82: { text: 'Hujan Sangat Deras', icon: '⛈️' },
    95: { text: 'Badai Petir', icon: '⛈️' },
    96: { text: 'Badai Petir + Hujan Es', icon: '⛈️' },
    99: { text: 'Badai Petir Hebat', icon: '⛈️' }
};

function fetchLiveWeather() {
    // Koordinat Bandung, Jawa Barat
    const lat = -6.9175, lon = 107.6191;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=Asia%2FJakarta`;

    fetch(url)
        .then(res => { if (!res.ok) throw new Error('Gagal mengambil data cuaca'); return res.json(); })
        .then(data => {
            const temp = Math.round(data.current.temperature_2m);
            const code = data.current.weather_code;
            const info = WEATHER_CODE_MAP[code] || { text: 'Tidak diketahui', icon: '🌡️' };

            if (weatherTempEl) weatherTempEl.innerText = `${temp}°C`;
            if (weatherDescEl) weatherDescEl.innerText = info.text;
            if (weatherIconBoxEl) weatherIconBoxEl.innerText = info.icon;
        })
        .catch(() => {
            if (weatherDescEl) weatherDescEl.innerText = 'Cuaca tidak tersedia';
            if (weatherIconBoxEl) weatherIconBoxEl.innerText = '🌡️';
        });
}

if (btnToggleSidebar) {
    btnToggleSidebar.addEventListener('click', () => {
        if (!sidebarElement) return;
        sidebarElement.classList.toggle('collapsed');
        if (sidebarElement.classList.contains('collapsed')) {
            localStorage.setItem('sidebarState', 'collapsed');
        } else {
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
        if (modalErrorMsg) modalErrorMsg.innerText = "(!) Password salah! Akses ditolak sistem.";
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
                else if (rawKat.includes('random')) katClean = 'random';

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
            populateQrLabelJenisDropdown(); // biar dropdown Jenis Barang di halaman Cetak Label QR ikut ke-refresh kalau lagi kebuka
            populateDashboardDropdown(); 
            populateManualNamaDropdown(); 
            resetKalkulatorDataState();
        })
        .catch(err => {
            if (tbodyMasterList) tbodyMasterList.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #dc2626; font-weight: bold; padding: 20px;">(!) SISTEM EROR: ${err.message}</td></tr>`;
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
        kosongkanFieldVendorDetail();

        if (!selectedJenis) { if (procWarnaLatela) procWarnaLatela.disabled = true; return; }

        let uniqueWarna = new Set();
        globalVendorRawData.forEach(row => {
            let jenis = ambilFieldVendor(row, ['Jenis Barang', 'jenis_barang', 'Jenis barang', 'JENIS BARANG']);
            let warna = ambilFieldVendor(row, ['Kode Warna Latela', 'kode_warna_latela', 'Kode warna latela', 'KODE WARNA LATELA']);
            if (jenis && jenis.toString().trim() === selectedJenis && warna) uniqueWarna.add(warna.toString().trim());
        });
        Array.from(uniqueWarna).sort().forEach(warna => {
            const opt = document.createElement('option'); opt.value = warna; opt.innerText = warna;
            if (procWarnaLatela) procWarnaLatela.appendChild(opt);
        });
        if (procWarnaLatela) procWarnaLatela.disabled = false;
    });
}

// Helper: baca satu field dari row vendor, coba beberapa kemungkinan nama kolom
function ambilFieldVendor(row, possibleKeys) {
    for (const k of possibleKeys) { if (row[k] !== undefined && row[k] !== null && row[k] !== '') return row[k]; }
    return null;
}

// Helper: kosongkan semua field detail vendor & kembalikan ke mode input readonly (non-dropdown)
function kosongkanFieldVendorDetail() {
    if (procKodeWarnaVendor) procKodeWarnaVendor.value = '';
    if (procVendor) { procVendor.value = ''; procVendor.style.display = ''; }
    if (procVendorSelect) { procVendorSelect.style.display = 'none'; procVendorSelect.innerHTML = '<option value="">-- Pilih Vendor --</option>'; }
    if (procKodeVendor) procKodeVendor.value = '';
    if (procNamaKain) procNamaKain.value = '';
}

// Helper: isi field readonly (Kd Warna, Kd Vendor, Nama Kain) dari satu row vendor yang sudah pasti dipilih
function isiFieldDariRowVendor(row) {
    if (procKodeWarnaVendor) procKodeWarnaVendor.value = ambilFieldVendor(row, ['Kode Warna Vendor', 'kode_warna_vendor', 'Kode warna vendor']) || '-';
    if (procKodeVendor) procKodeVendor.value = ambilFieldVendor(row, ['Kode Vendor', 'kode_vendor', 'Kode vendor']) || '-';
    if (procNamaKain) procNamaKain.value = ambilFieldVendor(row, ['Nama Kain', 'nama_kain', 'Nama kain']) || '-';
}

if (procWarnaLatela) {
    procWarnaLatela.addEventListener('change', () => {
        const selectedJenis = procJenisBarang ? procJenisBarang.value : '';
        const selectedWarna = procWarnaLatela.value;
        if (!selectedJenis || !selectedWarna) { kosongkanFieldVendorDetail(); return; }

        // Cari SEMUA row yang cocok Jenis+Warna (bisa lebih dari 1 vendor untuk kombinasi yang sama)
        const matchedRows = globalVendorRawData.filter(row => {
            let jenis = ambilFieldVendor(row, ['Jenis Barang', 'jenis_barang', 'Jenis barang', 'JENIS BARANG']);
            let warna = ambilFieldVendor(row, ['Kode Warna Latela', 'kode_warna_latela', 'Kode warna latela', 'KODE WARNA LATELA']);
            return jenis && jenis.toString().trim() === selectedJenis && warna && warna.toString().trim() === selectedWarna;
        });

        if (matchedRows.length === 0) {
            kosongkanFieldVendorDetail();
        } else if (matchedRows.length === 1) {
            // Hanya 1 vendor cocok -> tampilkan sebagai field readonly seperti biasa, tanpa dropdown
            if (procVendor) { procVendor.style.display = ''; procVendor.value = ambilFieldVendor(matchedRows[0], ['Vendor', 'vendor']) || '-'; }
            if (procVendorSelect) { procVendorSelect.style.display = 'none'; procVendorSelect.innerHTML = '<option value="">-- Pilih Vendor --</option>'; }
            isiFieldDariRowVendor(matchedRows[0]);
        } else {
            // Lebih dari 1 vendor cocok -> tampilkan dropdown pilihan vendor, field lain dikosongkan dulu sampai user pilih
            if (procKodeWarnaVendor) procKodeWarnaVendor.value = '';
            if (procKodeVendor) procKodeVendor.value = '';
            if (procNamaKain) procNamaKain.value = '';
            if (procVendor) procVendor.style.display = 'none';
            if (procVendorSelect) {
                procVendorSelect.style.display = '';
                procVendorSelect.innerHTML = '<option value="">-- Pilih Vendor --</option>';
                // Nama vendor bisa duplikat di data (mis. vendor sama, baris beda), jadi index disimpan di value agar match-nya presisi ke row yang benar
                matchedRows.forEach((row, idx) => {
                    const namaVendor = ambilFieldVendor(row, ['Vendor', 'vendor']) || '-';
                    const opt = document.createElement('option');
                    opt.value = String(idx);
                    opt.innerText = namaVendor;
                    procVendorSelect.appendChild(opt);
                });
                // Simpan referensi rows yang sedang aktif di dropdown ini agar handler change bisa ambil row yang tepat
                procVendorSelect._matchedRows = matchedRows;
            }
        }
    });
}

if (procVendorSelect) {
    procVendorSelect.addEventListener('change', () => {
        const rows = procVendorSelect._matchedRows || [];
        const idx = procVendorSelect.value;
        if (idx === '' || !rows[idx]) {
            if (procKodeWarnaVendor) procKodeWarnaVendor.value = '';
            if (procKodeVendor) procKodeVendor.value = '';
            if (procNamaKain) procNamaKain.value = '';
            return;
        }
        isiFieldDariRowVendor(rows[idx]);
    });
}

if (btnAddProc) {
    btnAddProc.addEventListener('click', () => {
        const jenisBarang = procJenisBarang ? procJenisBarang.value : ''; 
        const warnaLatela = procWarnaLatela ? procWarnaLatela.value : '';
        const kodeWarnaVendor = procKodeWarnaVendor ? procKodeWarnaVendor.value : ''; 
        // Vendor diambil dari elemen yang sedang aktif: dropdown kalau >1 vendor, input readonly kalau cuma 1
        const vendorSelectAktif = procVendorSelect && procVendorSelect.style.display !== 'none';
        const vendor = vendorSelectAktif
            ? (procVendorSelect.selectedOptions[0] ? procVendorSelect.selectedOptions[0].innerText : '')
            : (procVendor ? procVendor.value : '');
        const kodeVendor = procKodeVendor ? procKodeVendor.value : ''; 
        const namaKain = procNamaKain ? procNamaKain.value : ''; 
        const qty = procQty ? parseInt(procQty.value, 10) : 0;
        const satuan = procSatuan ? procSatuan.value : 'Roll'; 

        if (vendorSelectAktif && !procVendorSelect.value) { updateStatusMessage("(!) Gagal: Pilih vendor terlebih dahulu (ada lebih dari 1 vendor untuk warna ini)."); return; }
        if(!jenisBarang || !warnaLatela || !vendor || isNaN(qty) || qty <= 0) { updateStatusMessage("(!) Gagal: Isi Qty dengan benar."); return; }
        currentPoBasket.push({ jenisBarang, warnaLatela, kodeWarnaVendor, vendor, kodeVendor, namaKain, qty, satuan });
        renderProcurementTable(); 

        // 🔄 RESET FORM SETELAH ITEM DITAMBAHKAN (biar siap input item baru)
        if (procJenisBarang) procJenisBarang.value = '';
        if (procWarnaLatela) { procWarnaLatela.innerHTML = '<option value="">-- Pilih Warna Latela --</option>'; procWarnaLatela.disabled = true; }
        kosongkanFieldVendorDetail();
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
        kosongkanFieldVendorDetail();
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

function generatePoPdf(noPoValue, rawSelectedDate, vendorHeader, items) {
    // 🔧 Google Sheets kadang otomatis mengubah teks yang "kelihatan kayak angka" (misal
    // Nomor PO "202") jadi tipe data Number beneran. jsPDF cuma nerima string murni untuk
    // doc.text(), jadi semua nilai yang bakal ditulis WAJIB dipaksa jadi string dulu.
    noPoValue = noPoValue !== undefined && noPoValue !== null ? String(noPoValue) : '';
    vendorHeader = vendorHeader !== undefined && vendorHeader !== null ? String(vendorHeader) : '-';

    let formattedDate = '-';
    // Google Sheets kadang juga otomatis mengubah teks tanggal jadi objek Date beneran.
    // Normalize dulu jadi string "yyyy-mm-dd" biar aman diproses, apapun bentuk aslinya.
    let dateStr = '';
    if (rawSelectedDate instanceof Date) {
        const yyyy = rawSelectedDate.getFullYear();
        const mm = String(rawSelectedDate.getMonth() + 1).padStart(2, '0');
        const dd = String(rawSelectedDate.getDate()).padStart(2, '0');
        dateStr = `${yyyy}-${mm}-${dd}`;
    } else if (rawSelectedDate) {
        dateStr = rawSelectedDate.toString().slice(0, 10); // ambil 10 karakter pertama (yyyy-mm-dd), buang jam kalau ada format ISO lengkap
    }
    if (dateStr) {
        const parts = dateStr.split('-');
        if (parts.length === 3) formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
    }

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
    const bodyRows = items.map((item, idx) => {
        const isYds = item.satuan === 'Yards';
        const isKg = item.satuan === 'Kg';
        const isRoll = item.satuan === 'Roll';
        return [
            idx + 1,
            item.namaKain !== undefined && item.namaKain !== null && item.namaKain !== '' ? String(item.namaKain) : '-',
            item.warnaLatela !== undefined && item.warnaLatela !== null && item.warnaLatela !== '' ? String(item.warnaLatela) : '-',
            item.kodeWarnaVendor !== undefined && item.kodeWarnaVendor !== null && item.kodeWarnaVendor !== '' ? String(item.kodeWarnaVendor) : '-',
            isYds ? item.qty : '',
            isKg ? item.qty : '',
            isRoll ? item.qty : ''
        ];
    });


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
    const signLeftCenterX = marginLeft + (contentWidth * 0.15);
    const signRightCenterX = marginLeft + (contentWidth * 0.85);
    doc.text('CV ARSA', signLeftCenterX, finalY, { align: 'center' });
    doc.text(vendorHeader, signRightCenterX, finalY, { align: 'center' });

    // GAMBAR TANDA TANGAN CV ARSA (ditempatkan di antara nama & garis titik-titik, posisi center)
    const sigWidth = 110;
    const sigHeight = 40.07;
    doc.addImage(SIGNATURE_CV_ARSA_BASE64, 'PNG', signLeftCenterX - (sigWidth / 2), finalY + 4, sigWidth, sigHeight);

    doc.text('(……………………………)', signLeftCenterX, finalY + 60, { align: 'center' });
    doc.text('(……………………………)', signRightCenterX, finalY + 60, { align: 'center' });

    doc.save(`CV_Arsa_Surat_PO_${noPoValue || new Date().toISOString().slice(0,10)}.pdf`);
}

// 🔒 SEKARANG PO HARUS DI-APPROVE DULU SEBELUM BISA DICETAK.
// Tombol ini submit PO ke database (status Pending), bukan cetak PDF langsung.
const PO_API_BASE = '/api/po';
const PEMBELIAN_API_BASE = '/api/pembelian';

if (btnExportPo) {
    btnExportPo.addEventListener('click', () => {
        if(currentPoBasket.length === 0) { updateStatusMessage("(!) Belum ada item di list PO."); return; }
        const noPoValue = procNoPo ? procNoPo.value.trim() : '';
        const rawSelectedDate = procTanggalPo ? procTanggalPo.value : '';
        if (!noPoValue) { updateStatusMessage("(!) Nomor PO wajib diisi sebelum submit."); return; }
        const vendorHeader = currentPoBasket[0].vendor || '-';
        const sessionUser = getSession();

        updateStatusMessage("Mengirim PO untuk approval...");
        fetch(`${PO_API_BASE}/submit`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                noPo: noPoValue, tanggal: rawSelectedDate, vendor: vendorHeader,
                items: JSON.stringify(currentPoBasket), dibuatOleh: sessionUser ? sessionUser.nama : '-'
            })
        })
            .then(res => res.json())
            .then(() => {
                updateStatusMessage(`PO ${noPoValue} berhasil disubmit, menunggu approval.`);
                currentPoBasket = []; renderProcurementTable();
                if (procNoPo) procNoPo.value = '';
                fetchPoListFromCloud();
            })
            .catch(() => updateStatusMessage("(!) Gagal submit PO, cek koneksi."));
    });
}

// 🔧 Format tanggal mentah dari Google Sheets (bisa berupa objek Date, ISO string,
// atau teks biasa "yyyy-mm-dd") jadi tampilan rapi "DD/MM/YYYY" untuk ditampilkan di tabel.
function formatTanggalDisplay(raw) {
    if (!raw) return '-';
    let dateStr = '';
    if (raw instanceof Date) {
        const yyyy = raw.getFullYear(); const mm = String(raw.getMonth() + 1).padStart(2, '0'); const dd = String(raw.getDate()).padStart(2, '0');
        dateStr = `${yyyy}-${mm}-${dd}`;
    } else { dateStr = raw.toString().slice(0, 10); }
    const parts = dateStr.split('-');
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dateStr;
}

const poDetailModal = document.getElementById('po-detail-modal');
const poDetailTitle = document.getElementById('po-detail-title');
const tbodyPoDetailItems = document.getElementById('tbody-po-detail-items');
const btnPoDetailClose = document.getElementById('btn-po-detail-close');

function openPoDetailModal(id) {
    const po = (globalPoListCache || []).find(p => p.id === id);
    if (!po) { updateStatusMessage("(!) Data PO tidak ditemukan."); return; }

    let items = [];
    try { items = typeof po.items === 'string' ? JSON.parse(po.items || '[]') : (po.items || []); } catch (err) { items = []; }

    if (poDetailTitle) poDetailTitle.innerText = `#${po.noPo || '-'}`;
    if (tbodyPoDetailItems) {
        if (!items.length) {
            tbodyPoDetailItems.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#94a3b8; font-style:italic;">Data item kosong.</td></tr>`;
        } else {
            tbodyPoDetailItems.innerHTML = items.map(item => `<tr>
                <td>${item.jenisBarang !== undefined && item.jenisBarang !== null ? String(item.jenisBarang) : '-'}</td>
                <td>${item.warnaLatela !== undefined && item.warnaLatela !== null ? String(item.warnaLatela) : '-'}</td>
                <td>${item.kodeWarnaVendor !== undefined && item.kodeWarnaVendor !== null ? String(item.kodeWarnaVendor) : '-'}</td>
                <td>${item.namaKain !== undefined && item.namaKain !== null ? String(item.namaKain) : '-'}</td>
                <td style="text-align:right;">${item.qty !== undefined && item.qty !== null ? String(item.qty) : '-'} ${item.satuan ? String(item.satuan) : ''}</td>
            </tr>`).join('');
        }
    }
    if (poDetailModal) poDetailModal.classList.add('show');
}
if (btnPoDetailClose) btnPoDetailClose.addEventListener('click', () => { if (poDetailModal) poDetailModal.classList.remove('show'); });
if (poDetailModal) poDetailModal.addEventListener('click', (e) => { if (e.target === poDetailModal) poDetailModal.classList.remove('show'); });

function fetchPoListFromCloud() {
    const tbody = document.getElementById('tbody-po-list');
    if (!tbody) return;
    fetch(`${PO_API_BASE}/list`).then(res => res.json()).then(list => {
        globalPoListCache = Array.isArray(list) ? list : [];
        if (!globalPoListCache.length) { tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#94a3b8; font-style:italic;">Belum ada PO yang disubmit.</td></tr>`; return; }

        const sessionUser = getSession();
        const isFullAccess = sessionUser && sessionUser.role === 'full';

        tbody.innerHTML = '';
        globalPoListCache.forEach(po => {
            const statusLower = (po.status || '').toLowerCase();
            const statusApproved = statusLower === 'approved';
            const statusRejected = statusLower === 'rejected';
            const badgeClass = statusApproved ? 'badge-status-approved' : (statusRejected ? 'badge-status-rejected' : 'badge-status-pending');
            const badgeText = statusApproved ? 'Approved' : (statusRejected ? 'Rejected' : 'Pending');

            let aksiHtml = '';
            if (statusLower === 'pending' && isFullAccess) {
                aksiHtml += `<select class="dropdown-aksi-po" data-id="${po.id}" style="margin-right:6px;">
                    <option value="">-- Pilih Aksi --</option>
                    <option value="Approved">Approve</option>
                    <option value="Rejected">Reject</option>
                </select>`;
            }
            aksiHtml += `<button class="btn-action btn-blue-solid btn-cetak-po" data-id="${po.id}" ${statusApproved ? '' : 'disabled title="PO harus di-approve dulu sebelum bisa dicetak"'}>Cetak PDF</button>`;

            const tr = document.createElement('tr');
            tr.innerHTML = `<td><strong class="po-no-clickable" data-id="${po.id}" style="cursor:pointer; text-decoration:underline; color:var(--pink-main);">${po.noPo || '-'}</strong></td><td>${formatTanggalDisplay(po.tanggal)}</td><td>${po.vendor || '-'}</td><td>${po.dibuatOleh || '-'}</td><td><span class="badge-status ${badgeClass}">${badgeText}</span></td><td>${aksiHtml}</td>`;
            tbody.appendChild(tr);
        });

        tbody.querySelectorAll('.po-no-clickable').forEach(el => el.addEventListener('click', () => openPoDetailModal(el.getAttribute('data-id'))));

        tbody.querySelectorAll('.dropdown-aksi-po').forEach(sel => sel.addEventListener('change', () => {
            const id = sel.getAttribute('data-id');
            const val = sel.value;
            if (!val) return;
            if (val === 'Approved') updatePoStatus(id, 'Approved');
            else if (val === 'Rejected') { if (confirm('Yakin mau reject PO ini?')) updatePoStatus(id, 'Rejected'); else sel.value = ''; }
        }));
        tbody.querySelectorAll('.btn-cetak-po').forEach(btn => btn.addEventListener('click', () => cetakPoFromList(btn.getAttribute('data-id'))));
    }).catch(() => { tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#94a3b8; font-style:italic;">Gagal memuat data PO.</td></tr>`; });
}

function updatePoStatus(id, status) {
    const sessionUser = getSession();
    updateStatusMessage(status === 'Approved' ? "Memproses approval..." : "Memproses reject...");
    fetch(`${PO_API_BASE}/update-status`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, diprosesOleh: sessionUser ? sessionUser.nama : '-' })
    })
        .then(res => res.json())
        .then(() => { updateStatusMessage(status === 'Approved' ? "PO berhasil di-approve." : "PO berhasil di-reject."); fetchPoListFromCloud(); })
        .catch(() => updateStatusMessage("(!) Gagal memproses PO."));
}

function cetakPoFromList(id) {
    const po = (globalPoListCache || []).find(p => p.id === id);
    if (!po) { updateStatusMessage("(!) Data PO tidak ditemukan."); return; }
    if ((po.status || '').toLowerCase() !== 'approved') { updateStatusMessage("(!) PO ini belum di-approve, belum bisa dicetak."); return; }

    let items = [];
    try {
        items = typeof po.items === 'string' ? JSON.parse(po.items || '[]') : (po.items || []);
    } catch (err) { updateStatusMessage("(!) Gagal membaca data item PO (format items tidak valid)."); console.error(err); return; }
    if (!Array.isArray(items) || items.length === 0) { updateStatusMessage("(!) Data item PO kosong/rusak, tidak bisa dicetak."); return; }

    try {
        generatePoPdf(po.noPo, po.tanggal, po.vendor, items);
        updateStatusMessage(`PDF PO ${po.noPo} berhasil dicetak & terdownload.`);
    } catch (err) {
        updateStatusMessage("(!) Gagal membuat PDF, cek console (F12) untuk detail error.");
        console.error('Gagal generatePoPdf:', err);
    }
}

if (document.getElementById('btn-refresh-po-list')) {
    document.getElementById('btn-refresh-po-list').addEventListener('click', fetchPoListFromCloud);
}

// 3. MENU NAVIGATION LAYER
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(btn => btn.classList.remove('active')); item.classList.add('active');
        contentViews.forEach(view => view.classList.remove('active'));
        const target = item.getAttribute('data-target');
        const targetView = document.getElementById(`view-${target}`);
        if (targetView) targetView.classList.add('active');
        if (target === 'procurement') fetchPoListFromCloud();
        if (target === 'kelolaakun') fetchUsers();
        if (target === 'barang') fetchBarangList();
        if (target === 'pembelian') fetchPembelianList();
        if (target === 'qrlabel') initQrLabelPage();
        if (target === 'barangkeluar' && Object.keys(globalBarangKeluarKategori.utama).length === 0 && Object.keys(globalBarangKeluarKategori.aksesoris).length === 0 && Object.keys(globalBarangKeluarKategori.gradeb).length === 0 && Object.keys(globalBarangKeluarKategori.random).length === 0) fetchBarangKeluarFromCloud();
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
    globalDataKategori = { utama: {}, aksesoris: {}, gradeb: {}, random: {} };
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
if (fileInput) fileInput.addEventListener('change', (e) => processMultipleFiles(e.target.files));

// Proses banyak file sekaligus (dipilih bersamaan lewat dialog Open),
// dibaca satu-satu secara berurutan lalu tabel & dashboard di-refresh SEKALI di akhir.
function processMultipleFiles(fileList) {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;

    updateStatusMessage(`Memproses ${files.length} file...`);

    let processedCount = 0;
    let successCount = 0;

    const processNext = (index) => {
        if (index >= files.length) {
            refreshAllTables();
            updateDashboardMetrics();
            updateStatusMessage(`Selesai: ${successCount} dari ${files.length} file berhasil diproses.`);
            if (fileInput) fileInput.value = ""; // reset agar file sama bisa dipilih lagi kalau perlu
            return;
        }
        const file = files[index];
        readSingleExcelFile(file,
            (jsonData) => {
                ekstrakDanHitungPenjualan(jsonData, false); // false = jangan refresh per-file, biar efisien
                successCount++;
                processedCount++;
                processNext(index + 1);
            },
            () => {
                processedCount++;
                processNext(index + 1);
            }
        );
    };
    processNext(0);
}

function readSingleExcelFile(file, onSuccess, onError) {
    if (!file) { onError(); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            // defval: "" -> paksa semua baris punya key yang sama persis dengan header,
            // walau sel-nya kosong. Tanpa ini, baris dengan sel kosong (misal No. Resi
            // yang belum diisi) bisa jadi gak punya key itu sama sekali di baris tersebut,
            // yang bikin deteksi kolom & pengecekan "kosong/tidak" jadi gak reliable.
            const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: "" });
            onSuccess(jsonData);
        } catch (err) {
            updateStatusMessage(`Gagal memproses file: ${file.name}`);
            onError();
        }
    };
    reader.onerror = () => { updateStatusMessage(`Gagal membaca file: ${file.name}`); onError(); };
    reader.readAsArrayBuffer(file);
}

function ekstrakDanHitungPenjualan(data, doRefresh = true) {
    // Deteksi apakah file ini punya kolom "No. Resi" (khas template Shopee).
    // Cek ke semua baris (bukan cuma baris pertama) untuk jaga-jaga kalau ada
    // baris yang key-nya tidak lengkap.
    let hasResiColumn = false;
    for (let i = 0; i < data.length && !hasResiColumn; i++) {
        for (let key in data[i]) {
            let keyClean = key.toString().toLowerCase().replace(/[^a-z0-9]/g, "");
            if (["noresi", "nomorresi"].includes(keyClean)) { hasResiColumn = true; break; }
        }
    }

    data.forEach(row => {
        // Kalau file ini punya kolom No. Resi, baris yang No. Resi-nya masih kosong
        // (berarti pengiriman belum diatur) dilewati, tidak ikut dihitung.
        if (hasResiColumn) {
            let resiValue = "";
            for (let key in row) {
                let keyClean = key.toString().toLowerCase().replace(/[^a-z0-9]/g, "");
                if (["noresi", "nomorresi"].includes(keyClean)) {
                    resiValue = (row[key] !== undefined && row[key] !== null) ? row[key].toString().trim() : "";
                    break;
                }
            }
            if (!resiValue) return; // No. Resi kosong -> skip baris ini
        }

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
    if (doRefresh) { refreshAllTables(); updateDashboardMetrics(); }
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
    renderSingleTable(globalDataKategori.random, tbodyRandom);
}

// =========================================================================
// BARANG KELUAR — hasil scan barcode dari webapp HP terpisah. Beda Apps
// Script/spreadsheet dari Master SKU utama. Formatnya 1 baris = 1 kali scan
// (SKU + timestamp, belum ada qty), jadi qty keluar per SKU = jumlah baris
// scan-nya. SKU-nya dicocokin ke Master SKU (masterSkus) buat ambil
// Nama/Type/Warna/Kategori. Kalau ada SKU hasil scan yang belum ada di
// Master SKU, tetep ditampilin (kategori "utama") tapi ditandain jelas biar
// gampang ketauan dan bisa nyusul ditambahin ke Master SKU.
// =========================================================================
const GOOGLE_SCRIPT_URL_BARANG_KELUAR = "https://script.google.com/macros/s/AKfycbwMTENQ2pHpnlsmb1SNLHZTJ5a7XV-o20ZI5hb2uzY-oUciOgKCmkntHVHw9FWgft4/exec";

let globalBarangKeluarRaw = []; // [{ sku, waktu }] — data mentah hasil scan, apa adanya dari sheet (belum di-filter tanggal)
let globalBarangKeluarKategori = { utama: {}, aksesoris: {}, gradeb: {}, random: {} }; // hasil agregasi SETELAH kena filter tanggal (ini yang dirender ke tabel)

const btnSyncBarangKeluar = document.getElementById('btn-sync-barangkeluar');
const bkSubTabs = document.querySelectorAll('.bk-sub-tab');
const bkSubTablePanels = document.querySelectorAll('.bk-sub-table-panel');
const bkFilterDari = document.getElementById('bk-filter-dari');
const bkFilterSampai = document.getElementById('bk-filter-sampai');
const btnBkFilterTerapkan = document.getElementById('btn-bk-filter-terapkan');
const btnBkFilterSemua = document.getElementById('btn-bk-filter-semua');

const tbodyBkUtama = document.getElementById('tbody-bk-utama');
const tbodyBkAksesoris = document.getElementById('tbody-bk-aksesoris');
const tbodyBkGradeb = document.getElementById('tbody-bk-gradeb');
const tbodyBkRandom = document.getElementById('tbody-bk-random');

if (btnSyncBarangKeluar) btnSyncBarangKeluar.addEventListener('click', fetchBarangKeluarFromCloud);

bkSubTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        bkSubTabs.forEach(t => t.classList.remove('active')); tab.classList.add('active');
        bkSubTablePanels.forEach(p => p.classList.remove('active'));
        const targetPanel = document.getElementById(`bk-panel-${tab.getAttribute('data-category')}`);
        if (targetPanel) targetPanel.classList.add('active');
    });
});

if (btnBkFilterTerapkan) {
    btnBkFilterTerapkan.addEventListener('click', () => {
        applyBarangKeluarFilter();
        updateStatusMessage('Filter tanggal diterapkan.');
    });
}
if (btnBkFilterSemua) {
    btnBkFilterSemua.addEventListener('click', () => {
        if (bkFilterDari) bkFilterDari.value = '';
        if (bkFilterSampai) bkFilterSampai.value = '';
        applyBarangKeluarFilter();
        updateStatusMessage('Menampilkan semua data (tanpa filter tanggal).');
    });
}

function fetchBarangKeluarFromCloud() {
    updateStatusMessage("Menghubungkan ke data scan barcode...");
    [tbodyBkUtama, tbodyBkAksesoris, tbodyBkGradeb, tbodyBkRandom].forEach(tb => {
        if (tb) tb.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#94a3b8; font-style:italic;">Sinkronisasi data scan...</td></tr>`;
    });

    fetch(`${GOOGLE_SCRIPT_URL_BARANG_KELUAR}?action=fetch_scans`)
        .then(response => { if (!response.ok) throw new Error("Gagal terhubung ke Apps Script Barang Keluar."); return response.json(); })
        .then(rows => {
            const list = Array.isArray(rows) ? rows : [];

            // Simpan mentah dulu -> nanti di-filter tanggal pas render (biar bisa ganti-ganti filter tanpa fetch ulang)
            globalBarangKeluarRaw = list.map(row => {
                const skuRaw = row['SKU'] || row['sku'] || row['Code'] || row['code'];
                const waktuRaw = (row['Timestamp'] || row['timestamp'] || row['Waktu'] || row['waktu'] || '').toString();
                return { sku: skuRaw ? skuRaw.toString().trim() : '', waktu: waktuRaw };
            }).filter(r => r.sku);

            const unknownCount = applyBarangKeluarFilter();
            updateStatusMessage(unknownCount > 0
                ? `Sukses sync ${list.length} data scan (${unknownCount} SKU belum dikenali, cek kategori Produk Utama).`
                : `Sukses sync ${list.length} data scan.`);
        })
        .catch(err => {
            [tbodyBkUtama, tbodyBkAksesoris, tbodyBkGradeb, tbodyBkRandom].forEach(tb => {
                if (tb) tb.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#dc2626; font-weight:bold; padding:20px;">(!) SISTEM EROR: ${err.message}</td></tr>`;
            });
        });
}

// Susun ulang globalBarangKeluarKategori dari globalBarangKeluarRaw, dibatasi sama
// rentang tanggal yang dipilih di filter (kalau "Dari"/"Sampai" dikosongin, dianggap
// gak dibatasi ke arah itu). Filter-nya baca dari kolom Waktu Scan hasil scan.
function applyBarangKeluarFilter() {
    const dariVal = (bkFilterDari && bkFilterDari.value) ? new Date(bkFilterDari.value + 'T00:00:00') : null;
    const sampaiVal = (bkFilterSampai && bkFilterSampai.value) ? new Date(bkFilterSampai.value + 'T23:59:59') : null;

    globalBarangKeluarKategori = { utama: {}, aksesoris: {}, gradeb: {}, random: {} };
    let unknownCount = 0;

    globalBarangKeluarRaw.forEach(r => {
        const waktuDate = new Date(r.waktu);
        const waktuValid = !isNaN(waktuDate.getTime());
        // Kalau ada filter tanggal tapi timestamp-nya gak valid/gak kebaca, baris itu dilewatin
        // (biar gak nyasar ikut ke-hitung di rentang tanggal yang salah).
        if ((dariVal || sampaiVal) && !waktuValid) return;
        if (dariVal && waktuDate < dariVal) return;
        if (sampaiVal && waktuDate > sampaiVal) return;

        const sku = r.sku;
        const master = masterSkus[sku];
        const kat = master ? master.kategori : 'utama';
        if (!globalBarangKeluarKategori[kat]) globalBarangKeluarKategori[kat] = {};

        if (!globalBarangKeluarKategori[kat][sku]) {
            globalBarangKeluarKategori[kat][sku] = {
                nama: master ? master.nama : '(!) SKU BELUM ADA DI MASTER SKU',
                type: master ? master.type : '-',
                warna: master ? master.warna : '-',
                qty: 0,
                lastScan: ''
            };
            if (!master) unknownCount++;
        }
        globalBarangKeluarKategori[kat][sku].qty += 1;
        if (r.waktu && r.waktu > globalBarangKeluarKategori[kat][sku].lastScan) {
            globalBarangKeluarKategori[kat][sku].lastScan = r.waktu;
        }
    });

    refreshBarangKeluarTables();
    return unknownCount;
}

function renderBarangKeluarSingleTable(dataKategori, tbodyElement) {
    if (!tbodyElement) return;
    const skuKeys = Object.keys(dataKategori);
    if (!skuKeys.length) { tbodyElement.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#94a3b8; font-style:italic;">Belum ada data scan di kategori ini.</td></tr>`; return; }
    tbodyElement.innerHTML = '';
    skuKeys.sort((a, b) => dataKategori[b].qty - dataKategori[a].qty).forEach(sku => {
        const item = dataKategori[sku];
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${sku}</td><td>${item.nama}</td><td>${item.type}</td><td>${item.warna}</td><td style="text-align:right;">${item.qty}</td><td>${formatWaktuScan(item.lastScan)}</td>`;
        tbodyElement.appendChild(tr);
    });
}

// Format timestamp hasil scan (dd/mm/yyyy HH:MM). Ditulis fleksibel karena
// format persis timestamp dari webapp scanner-nya bisa beda-beda (ISO string,
// "yyyy-mm-dd HH:MM:SS", atau serial Date dari Google Sheets).
function formatWaktuScan(raw) {
    if (!raw) return '-';
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw.toString(); // gagal di-parse -> tampilin apa adanya, biar ketauan formatnya kayak apa
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

function refreshBarangKeluarTables() {
    renderBarangKeluarSingleTable(globalBarangKeluarKategori.utama, tbodyBkUtama);
    renderBarangKeluarSingleTable(globalBarangKeluarKategori.aksesoris, tbodyBkAksesoris);
    renderBarangKeluarSingleTable(globalBarangKeluarKategori.gradeb, tbodyBkGradeb);
    renderBarangKeluarSingleTable(globalBarangKeluarKategori.random, tbodyBkRandom);

    let totalQty = 0, totalSku = 0;
    Object.values(globalBarangKeluarKategori).forEach(kat => {
        Object.values(kat).forEach(item => { totalQty += item.qty; totalSku++; });
    });
    const elTotalQty = document.getElementById('bk-total-qty'); if (elTotalQty) elTotalQty.innerText = totalQty.toLocaleString('id-ID');
    const elTotalSku = document.getElementById('bk-total-sku'); if (elTotalSku) elTotalSku.innerText = totalSku;
}

// --- Export Barang Keluar ke Excel/CSV (sama polanya kayak export Kalkulator Terjual) ---
const btnExportToggleBk = document.getElementById('btn-export-toggle-bk');
const exportMenuItemsBk = document.getElementById('export-menu-items-bk');
const btnExportXlsxBk = document.getElementById('btn-export-xlsx-bk');
const btnExportCsvBk = document.getElementById('btn-export-csv-bk');

if (btnExportToggleBk) {
    btnExportToggleBk.addEventListener('click', (e) => {
        e.stopPropagation();
        if (exportMenuItemsBk) exportMenuItemsBk.classList.toggle('show');
    });
}
document.addEventListener('click', () => { if (exportMenuItemsBk) exportMenuItemsBk.classList.remove('show'); });

function generateBarangKeluarArrayFormat() {
    let m = [["Kategori", "SKU", "Nama", "Type", "Warna", "Qty Keluar", "Terakhir Discan"]];
    const ins = (n, o) => Object.keys(o).sort((a, b) => o[b].qty - o[a].qty).forEach(k => m.push([n, k, o[k].nama, o[k].type, o[k].warna, o[k].qty, formatWaktuScan(o[k].lastScan)]));
    ins("PRODUK UTAMA", globalBarangKeluarKategori.utama); ins("AKSESORIS", globalBarangKeluarKategori.aksesoris); ins("GRADE B", globalBarangKeluarKategori.gradeb); ins("RANDOM", globalBarangKeluarKategori.random);
    return m;
}

if (btnExportXlsxBk) {
    btnExportXlsxBk.addEventListener('click', () => {
        const wb = XLSX.utils.book_new();
        const fmt = (d) => {
            let m = [["SKU", "Nama", "Type", "Warna", "Qty Keluar", "Terakhir Discan"]];
            Object.keys(d).sort((a, b) => d[b].qty - d[a].qty).forEach(k => m.push([k, d[k].nama, d[k].type, d[k].warna, d[k].qty, formatWaktuScan(d[k].lastScan)]));
            return XLSX.utils.aoa_to_sheet(m);
        };
        XLSX.utils.book_append_sheet(wb, fmt(globalBarangKeluarKategori.utama), "Produk Utama");
        XLSX.utils.book_append_sheet(wb, fmt(globalBarangKeluarKategori.aksesoris), "Aksesoris");
        XLSX.utils.book_append_sheet(wb, fmt(globalBarangKeluarKategori.gradeb), "Grade B");
        XLSX.utils.book_append_sheet(wb, fmt(globalBarangKeluarKategori.random), "Random");
        XLSX.writeFile(wb, `Barang_Keluar_${new Date().toISOString().slice(0,10)}.xlsx`);
    });
}

if (btnExportCsvBk) {
    btnExportCsvBk.addEventListener('click', () => {
        const ws = XLSX.utils.aoa_to_sheet(generateBarangKeluarArrayFormat());
        const blob = new Blob([XLSX.utils.sheet_to_csv(ws)], { type: 'text/csv;charset=utf-8;' });
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.setAttribute("download", `Barang_Keluar_${new Date().toISOString().slice(0,10)}.csv`); a.click();
    });
}

// 5. UPDATE GRAPHICS METRICS DASHBOARD
function updateDashboardMetrics() {
    const targetProduct = dashFilterDropdown ? dashFilterDropdown.value : "all";
    let qtyUtama = 0, qtyAksesoris = 0, qtyGradeB = 0, qtyRandom = 0, skuAktifCount = 0; let productSalesGroup = {};

    const hitung = (dataKategori, kategoriKey) => {
        Object.values(dataKategori).forEach(item => {
            if (targetProduct === "all" || item.nama === targetProduct) {
                if (item.qty > 0) { skuAktifCount++; let name = item.nama.trim().toUpperCase(); productSalesGroup[name] = (productSalesGroup[name] || 0) + item.qty; }
                if (kategoriKey === 'utama') qtyUtama += item.qty;
                else if (kategoriKey === 'aksesoris') qtyAksesoris += item.qty;
                else if (kategoriKey === 'gradeb') qtyGradeB += item.qty;
                else if (kategoriKey === 'random') qtyRandom += item.qty;
            }
        });
    };
    hitung(globalDataKategori.utama, 'utama'); hitung(globalDataKategori.aksesoris, 'aksesoris'); hitung(globalDataKategori.gradeb, 'gradeb'); hitung(globalDataKategori.random, 'random');

    if (dashTotalTerjual) dashTotalTerjual.innerText = (qtyUtama + qtyAksesoris + qtyGradeB + qtyRandom).toLocaleString('id-ID');
    if (dashSkuAktif) dashSkuAktif.innerText = skuAktifCount; 
    if (dashFileCount) dashFileCount.innerText = totalMasterFiles;

    if (salesChartInstance) { salesChartInstance.data.datasets[0].data = [qtyUtama, qtyAksesoris, qtyGradeB, qtyRandom]; salesChartInstance.update(); }
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
    if (sChart) salesChartInstance = new Chart(sChart.getContext('2d'), { type: 'bar', data: { labels: ['Produk Utama', 'Aksesoris', 'Grade B', 'Random'], datasets: [{ data: [0, 0, 0, 0], backgroundColor: ['#ec4899', '#2563eb', '#f59e0b', '#10b981'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
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
        const tot = sum(globalDataKategori.utama) + sum(globalDataKategori.aksesoris) + sum(globalDataKategori.gradeb) + sum(globalDataKategori.random);
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

        // 🔧 NORMALISASI: header di Google Sheets bisa berbeda nama
        // ("waktu" vs "Waktu Simpan", dst), jadi dicoba beberapa kemungkinan key
        const pick = (obj, keys) => {
            for (const k of keys) {
                if (obj[k] !== undefined && obj[k] !== '') return obj[k];
            }
            return '';
        };
        const pickDetail = (obj) => {
            const knownKeys = ['detail', 'Detail'];
            for (const k of knownKeys) { if (obj[k]) return obj[k]; }
            // fallback: ambil value dari key kosong/tak dikenal yang isinya JSON object string
            for (const k in obj) {
                if (!['waktu','Waktu Simpan','files','Files Terproses','total','Total Qty Item'].includes(k)) {
                    if (typeof obj[k] === 'string' && obj[k].trim().startsWith('{')) return obj[k];
                }
            }
            return '';
        };

        logs.reverse().forEach(log => {
            const waktu = pick(log, ['waktu', 'Waktu Simpan']);
            let files = pick(log, ['files', 'Files Terproses']);
            let total = pick(log, ['total', 'Total Qty Item']);
            const detail = pickDetail(log);

            // Bersihkan angka dari embel-embel teks pada data lama (mis. "1 Berkas", "87 pcs")
            files = parseInt(String(files).replace(/[^0-9]/g, ''), 10) || 0;
            total = parseInt(String(total).replace(/[^0-9]/g, ''), 10) || 0;

            globalHistoryCloudCache[waktu] = detail;
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${waktu}</td><td>${files} Berkas</td><td style="color:#ec4899; font-weight:bold;">${total} pcs</td><td><button class="btn-action btn-pink-solid btn-download-history" data-waktu="${waktu}">Download</button></td>`;
            if (tbody) tbody.appendChild(tr);
        });
        document.querySelectorAll('.btn-download-history').forEach(b => {
            b.addEventListener('click', (e) => {
                const cached = globalHistoryCloudCache[e.target.getAttribute('data-waktu')];
                if (!cached) { updateStatusMessage('(!) Detail data tidak tersedia untuk riwayat ini.'); return; }
                let snap;
                try { snap = JSON.parse(cached); } catch (err) { updateStatusMessage('(!) Gagal membaca detail data.'); return; }
                const wb = XLSX.utils.book_new();
                const fmt = (d) => { let m = [["SKU", "Nama", "Type", "Warna", "Qty"]]; Object.keys(d || {}).sort().forEach(k => m.push([k, d[k].nama, d[k].type, d[k].warna, d[k].qty])); return XLSX.utils.aoa_to_sheet(m); };
                XLSX.utils.book_append_sheet(wb, fmt(snap.utama), "Produk Utama"); XLSX.utils.book_append_sheet(wb, fmt(snap.aksesoris), "Aksesoris"); XLSX.utils.book_append_sheet(wb, fmt(snap.gradeb), "Grade B"); XLSX.utils.book_append_sheet(wb, fmt(snap.random), "Random");
                XLSX.writeFile(wb, `Laporan_Cloud_${e.target.getAttribute('data-waktu').replace(/[^a-zA-Z0-9]/g, "_")}.xlsx`);
            });
        });
    });
}


// =========================================================================
// CETAK LABEL QR CODE — isi QR = kode SKU dari Master SKU. Karena setiap
// SKU sudah merepresentasikan 1 kombinasi produk+warna yang unik, otomatis
// "per warna" (warna yang sama dalam produk yang sama = SKU yang sama =
// QR yang sama).
// =========================================================================
const btnSyncQrLabel = document.getElementById('btn-sync-qrlabel');
const qrLabelJenisBarang = document.getElementById('qrlabel-jenis-barang');
const qrLabelWarna = document.getElementById('qrlabel-warna');
const qrLabelQtyInput = document.getElementById('qrlabel-qty-input');
const btnAddQrLabelItem = document.getElementById('btn-add-qrlabel-item');
const btnCetakQrLabel = document.getElementById('btn-cetak-qrlabel');

let qrLabelBasket = []; // [{ sku, nama, warna, qty }] — daftar SKU yang mau dicetak labelnya

function initQrLabelPage() {
    if (Object.keys(masterSkus).length > 0) populateQrLabelJenisDropdown();
    else fetchMasterSkusFromCloud(); // data Master SKU belum kebaca (mungkin sync awal belum kelar) -> tarik ulang sekarang
    renderQrLabelBasketTable();
}

if (btnSyncQrLabel) btnSyncQrLabel.addEventListener('click', fetchMasterSkusFromCloud);

// Isi dropdown "Jenis Barang" dari daftar nama produk unik di Master SKU
function populateQrLabelJenisDropdown() {
    if (!qrLabelJenisBarang) return;
    const selectedBefore = qrLabelJenisBarang.value;
    qrLabelJenisBarang.innerHTML = '<option value="">-- Pilih Jenis Barang --</option>';
    let uniqueNama = new Set();
    Object.values(masterSkus).forEach(item => { if (item.nama) uniqueNama.add(item.nama); });
    Array.from(uniqueNama).sort().forEach(nama => {
        const opt = document.createElement('option'); opt.value = nama; opt.innerText = nama;
        qrLabelJenisBarang.appendChild(opt);
    });
    // Coba pertahankan pilihan sebelumnya kalau masih ada di data baru (misal abis Sync ulang)
    if (selectedBefore && uniqueNama.has(selectedBefore)) qrLabelJenisBarang.value = selectedBefore;
    resetQrLabelWarnaDropdown();
}

function resetQrLabelWarnaDropdown() {
    if (!qrLabelWarna) return;
    qrLabelWarna.innerHTML = '<option value="">-- Pilih Warna --</option>';
    qrLabelWarna.disabled = true;
}

if (qrLabelJenisBarang) {
    qrLabelJenisBarang.addEventListener('change', () => {
        resetQrLabelWarnaDropdown();
        const selectedNama = qrLabelJenisBarang.value;
        if (!selectedNama || !qrLabelWarna) return;

        // Setiap opsi Warna langsung nyimpen kode SKU-nya sebagai value, jadi begitu dipilih
        // langsung ketemu SKU yang presis (gak perlu nebak-nebak walau ada beda Type juga).
        const matches = Object.entries(masterSkus)
            .filter(([, item]) => item.nama === selectedNama)
            .sort((a, b) => (a[1].warna || '').localeCompare(b[1].warna || ''));

        matches.forEach(([sku, item]) => {
            const opt = document.createElement('option');
            opt.value = sku;
            opt.innerText = (item.type && item.type !== '-') ? `${item.warna} (${item.type})` : (item.warna || sku);
            qrLabelWarna.appendChild(opt);
        });
        qrLabelWarna.disabled = false;
    });
}

if (btnAddQrLabelItem) {
    btnAddQrLabelItem.addEventListener('click', () => {
        const sku = qrLabelWarna ? qrLabelWarna.value : '';
        const qty = qrLabelQtyInput ? parseInt(qrLabelQtyInput.value, 10) : 0;

        if (!sku) { updateStatusMessage('(!) Pilih Jenis Barang & Warna dulu.'); return; }
        if (isNaN(qty) || qty <= 0) { updateStatusMessage('(!) Isi Qty dengan benar.'); return; }

        const item = masterSkus[sku];
        const existing = qrLabelBasket.find(b => b.sku === sku);
        if (existing) { existing.qty += qty; }
        else { qrLabelBasket.push({ sku, nama: item.nama, warna: item.warna, qty }); }

        renderQrLabelBasketTable();

        // Reset Warna & Qty aja (Jenis Barang dibiarin biar gampang nambah warna lain dari jenis yang sama)
        resetQrLabelWarnaDropdown();
        if (qrLabelJenisBarang) qrLabelJenisBarang.value = '';
        if (qrLabelQtyInput) qrLabelQtyInput.value = '1';
        updateStatusMessage(`Sukses menambah ${sku} ke daftar cetak.`);
    });
}

function renderQrLabelBasketTable() {
    const tbody = document.getElementById('tbody-qrlabel-basket');
    if (!tbody) return;

    if (!qrLabelBasket.length) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#94a3b8; font-style:italic;">Belum ada SKU ditambahkan.</td></tr>`;
        updateQrLabelSummary();
        return;
    }

    tbody.innerHTML = '';
    qrLabelBasket.forEach((row, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><code>${row.sku}</code></td><td>${row.nama}</td><td>${row.warna}</td><td><input type="number" class="qrlabel-basket-qty-input" data-idx="${idx}" value="${row.qty}" min="1" style="width:70px; height:30px;"></td><td style="text-align:center;"><button class="btn-hapus-qrlabel-item" data-idx="${idx}" title="Hapus" style="background:none; border:none; color:#dc2626; cursor:pointer; font-size:16px;">&times;</button></td>`;
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.qrlabel-basket-qty-input').forEach(inp => inp.addEventListener('input', () => {
        const idx = parseInt(inp.getAttribute('data-idx'), 10);
        const val = parseInt(inp.value, 10);
        if (qrLabelBasket[idx]) qrLabelBasket[idx].qty = (isNaN(val) || val <= 0) ? 1 : val;
        updateQrLabelSummary();
    }));
    tbody.querySelectorAll('.btn-hapus-qrlabel-item').forEach(btn => btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        qrLabelBasket.splice(idx, 1);
        renderQrLabelBasketTable();
    }));

    updateQrLabelSummary();
}

const LABEL_PER_LEMBAR = 81; // grid 9 kolom x 9 baris, sesuai mockup PDF terakhir (kertas A4, jarak seragam)

function updateQrLabelSummary() {
    const totalLembar = qrLabelBasket.reduce((sum, row) => sum + (row.qty || 0), 0);
    const totalLabel = totalLembar * LABEL_PER_LEMBAR;
    const elCount = document.getElementById('qrlabel-selected-count'); if (elCount) elCount.innerText = qrLabelBasket.length;
    const elTotal = document.getElementById('qrlabel-total-label'); if (elTotal) elTotal.innerText = `${totalLabel} (${totalLembar} lembar)`;
}


if (btnCetakQrLabel) {
    btnCetakQrLabel.addEventListener('click', async () => {
        if (!qrLabelBasket.length) { updateStatusMessage('(!) Tambah minimal 1 SKU dulu buat dicetak.'); return; }
        if (typeof QRCode === 'undefined') { updateStatusMessage('(!) Library QR Code gagal dimuat, cek koneksi internet.'); return; }

        btnCetakQrLabel.disabled = true;
        updateStatusMessage('Menyiapkan label QR...');

        const printArea = document.getElementById('qrlabel-print-area');
        printArea.innerHTML = '';

        let currentSheet = null;
        let posInSheet = 0;

        const newSheet = () => { currentSheet = document.createElement('div'); currentSheet.className = 'qr-label-sheet'; printArea.appendChild(currentSheet); posInSheet = 0; };

        for (const row of qrLabelBasket) {
            const sku = row.sku;
            const jumlahLembar = row.qty || 1; // qty = jumlah LEMBAR, bukan jumlah label satuan
            // Generate 1 gambar QR per SKU, dipakai ulang buat semua copy-nya (efisien, gak generate berkali-kali)
            let qrDataUrl;
            try { qrDataUrl = await QRCode.toDataURL(sku, { width: 200, margin: 1 }); }
            catch (err) { continue; }

            const totalLabelSku = jumlahLembar * LABEL_PER_LEMBAR;
            for (let i = 0; i < totalLabelSku; i++) {
                if (!currentSheet || posInSheet >= LABEL_PER_LEMBAR) newSheet();
                const div = document.createElement('div');
                div.className = 'qr-label-item';
                div.innerHTML = `<img src="${qrDataUrl}" alt="QR ${sku}"><div class="qr-label-warna">${row.warna || ''}</div>`;
                currentSheet.appendChild(div);
                posInSheet++;
            }
        }

        btnCetakQrLabel.disabled = false;
        updateStatusMessage(`Label siap, membuka dialog cetak...`);
        setTimeout(() => window.print(), 200);
    });
}

function generateMasterArrayFormat() {
    let m = [["Kategori", "SKU", "Nama", "Type", "Warna", "Qty"]];
    const ins = (n, o) => Object.keys(o).sort().forEach(k => m.push([n, k, o[k].nama, o[k].type, o[k].warna, o[k].qty]));
    ins("PRODUK UTAMA", globalDataKategori.utama); ins("AKSESORIS", globalDataKategori.aksesoris); ins("GRADE B", globalDataKategori.gradeb); ins("RANDOM", globalDataKategori.random); return m;
}

if (btnExportXlsx) {
    btnExportXlsx.addEventListener('click', () => {
        const wb = XLSX.utils.book_new();
        const fmt = (d) => { let m = [["SKU", "Nama", "Type", "Warna", "Qty"]]; Object.keys(d).sort().forEach(k => m.push([k, d[k].nama, d[k].type, d[k].warna, d[k].qty])); return XLSX.utils.aoa_to_sheet(m); };
        XLSX.utils.book_append_sheet(wb, fmt(globalDataKategori.utama), "Produk Utama"); XLSX.utils.book_append_sheet(wb, fmt(globalDataKategori.aksesoris), "Aksesoris"); XLSX.utils.book_append_sheet(wb, fmt(globalDataKategori.gradeb), "Grade B"); XLSX.utils.book_append_sheet(wb, fmt(globalDataKategori.random), "Random");
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
