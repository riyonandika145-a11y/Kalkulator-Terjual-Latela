(() => {
  "use strict";

  // ============================================================
  // AUTH — Login via worker web OMS (latela-po-db)
  // Token disimpan di localStorage, dipakai untuk semua request
  // ============================================================

  // URL worker web OMS — ganti sesuai domain kamu
  const OMS_WORKER_URL = "https://order-management-system-latela.riyonandika145.workers.dev";

  const AUTH_TOKEN_KEY = "latela_mobile_token";
  const AUTH_NAMA_KEY  = "latela_mobile_nama";
  const AUTH_USER_KEY  = "latela_mobile_username";

  const loginScreen  = document.getElementById("loginScreen");
  const loginBtn     = document.getElementById("loginBtn");
  const loginError   = document.getElementById("loginError");
  const logoutBtn    = document.getElementById("logoutBtn");
  const topbarNama   = document.getElementById("topbarNama");

  function getToken() {
    try { return localStorage.getItem(AUTH_TOKEN_KEY) || ""; } catch { return ""; }
  }
  function saveAuth(token, nama, username) {
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_NAMA_KEY,  nama);
      localStorage.setItem(AUTH_USER_KEY,  username);
    } catch {}
  }
  function clearAuth() {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_NAMA_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    } catch {}
  }

  function showLoginScreen(msg) {
    loginError.textContent = msg || "";
    loginError.classList.toggle("hidden", !msg);
    loginScreen.classList.remove("hidden");
    topbarNama.textContent = "";
  }

  function hideLoginScreen(nama) {
    loginScreen.classList.add("hidden");
    topbarNama.textContent = nama || "";
  }

  async function doLogin() {
    const username = (document.getElementById("loginUsername").value || "").trim();
    const password = (document.getElementById("loginPassword").value || "").trim();
    if (!username || !password) {
      loginError.textContent = "Username dan password wajib diisi.";
      loginError.classList.remove("hidden");
      return;
    }
    loginBtn.disabled = true;
    loginBtn.textContent = "Memproses...";
    loginError.classList.add("hidden");
    try {
      const res = await fetch(`${OMS_WORKER_URL}/api/mobile/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        saveAuth(data.token, data.nama, data.username);
        hideLoginScreen(data.nama);
        // init app setelah login berhasil
        initApp();
      } else {
        loginError.textContent = data.message || "Login gagal.";
        loginError.classList.remove("hidden");
      }
    } catch (e) {
      loginError.textContent = "Tidak dapat terhubung ke server.";
      loginError.classList.remove("hidden");
    } finally {
      loginBtn.disabled = false;
      loginBtn.textContent = "Masuk";
    }
  }

  async function doLogout() {
    const token = getToken();
    if (token) {
      try {
        await fetch(`${OMS_WORKER_URL}/api/mobile/logout`, {
          method: "POST",
          headers: { "X-Mobile-Token": token }
        });
      } catch {}
    }
    clearAuth();
    showLoginScreen();
  }

  async function checkAuth() {
    const token = getToken();
    if (!token) { showLoginScreen(); return; }

    // Verifikasi token ke server
    try {
      const res = await fetch(`${OMS_WORKER_URL}/api/mobile/verify`, {
        method: "POST",
        headers: { "X-Mobile-Token": token }
      });
      const data = await res.json();
      if (data.success) {
        const nama = data.nama || localStorage.getItem(AUTH_NAMA_KEY) || "";
        hideLoginScreen(nama);
        initApp();
      } else {
        clearAuth();
        showLoginScreen(data.message || "Sesi berakhir, silakan login kembali.");
      }
    } catch {
      // Kalau offline/server error, tetap izinkan masuk pakai token lokal
      const nama = localStorage.getItem(AUTH_NAMA_KEY) || "";
      hideLoginScreen(nama);
      initApp();
    }
  }

  loginBtn.addEventListener("click", doLogin);
  document.getElementById("loginPassword").addEventListener("keydown", e => {
    if (e.key === "Enter") doLogin();
  });
  logoutBtn.addEventListener("click", () => {
    if (confirm("Keluar dari aplikasi?")) doLogout();
  });

  // Jalankan cek auth saat halaman dibuka
  checkAuth();

  // Semua kode app dibungkus dalam fungsi initApp()
  // agar baru berjalan setelah login berhasil
  function initApp() {

  const HISTORY_KEY = "latela_history_v1";
  const MAX_HISTORY = 200;
  const COOLDOWN_MS = 2000;
  const FREEZE_MS = 450; // durasi efek "freeze" saat QR berhasil terbaca

  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const statusEl = document.getElementById("status");
  const lastScanBox = document.getElementById("lastScan");
  const lastScanName = document.getElementById("lastScanName");
  const lastScanSku = document.getElementById("lastScanSku");
  const lastScanState = document.getElementById("lastScanState");
  const historyList = document.getElementById("historyList");
  const historyEmpty = document.getElementById("historyEmpty");
  const clearHistoryBtn = document.getElementById("clearHistory");
  const scannerWrap = document.querySelector(".scanner-wrap");
  const zoomRange = document.getElementById("zoomRange");
  const startGate = document.getElementById("startGate");
  const shotGate = document.getElementById("shotGate");
  const oneShotToggle = document.getElementById("oneShotToggle");

  // Data SKU (read-only dari D1)
  const skuStatus = document.getElementById("skuStatus");
  const skuList = document.getElementById("skuList");
  const skuEmpty = document.getElementById("skuEmpty");
  const skuSearch = document.getElementById("skuSearch");
  const skuRefreshBtn = document.getElementById("skuRefreshBtn");
  let skuAllRows = []; // cache semua data SKU

  let oneShotMode = false;

  let scanning = true;
  let lastCode = null;
  let lastScanTime = 0;
  let rafId = null;
  let freezeTimeout = null;
  let isFrozen = false;

  // Zoom kamera
  let videoTrack = null;
  let hasHardwareZoom = false;
  let zoomLevel = 1;

  // Deteksi QR: pakai BarcodeDetector native kalau tersedia (jauh lebih cepat,
  // hardware-accelerated, sama seperti yang dipakai app kamera bawaan Android).
  // Kalau tidak didukung (mis. iOS Safari lama), fallback ke jsQR.
  let barcodeDetector = null;
  let useBarcodeDetector = false;
  let busyDetect = false;
  const DECODE_MAX_WIDTH = 720; // batasi resolusi khusus utk decode jsQR biar ringan

  // ---------- Bunyi klik (Web Audio API, tanpa file) ----------
  let audioCtx = null;
  function playClick() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();

      const playTone = (freq, startOffset, duration, peakGain) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        const t0 = audioCtx.currentTime + startOffset;
        o.type = "square";
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(peakGain, t0 + 0.008);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
        o.connect(g).connect(audioCtx.destination);
        o.start(t0);
        o.stop(t0 + duration + 0.02);
      };

      // Beep dua nada cepat (naik) -- lebih kenceng & lebih "kerasa" dari sebelumnya
      playTone(1200, 0, 0.09, 0.7);
      playTone(1800, 0.07, 0.1, 0.7);
    } catch (e) { /* abaikan jika audio diblokir */ }
  }

  // ---------- History (localStorage) ----------
  function loadHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
    catch { return []; }
  }
  function saveHistory(list) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, MAX_HISTORY)));
  }
  function addHistoryEntry(sku, time) {
    const list = loadHistory();
    const entry = { sku, time, status: "pending", name: null, known: null };
    list.unshift(entry);
    saveHistory(list);
    renderHistory();
    return entry;
  }
  function updateHistoryStatus(sku, time, status, name, known) {
    const list = loadHistory();
    const found = list.find(e => e.sku === sku && e.time === time);
    if (found) {
      found.status = status;
      if (name !== undefined) found.name = name;
      if (known !== undefined) found.known = known;
      saveHistory(list);
      renderHistory();
    }
  }
  function renderHistory() {
    const list = loadHistory();
    historyList.innerHTML = "";
    historyEmpty.classList.toggle("hidden", list.length > 0);
    for (const e of list) {
      const li = document.createElement("li");
      const d = new Date(e.time);
      const isUnknown = e.known === false;
      const titleText = isUnknown ? "SKU Tidak Dikenal" : (e.name || e.sku);
      const badgeClass = isUnknown ? "unknown" : e.status;
      const badgeText = isUnknown ? "Tidak Dikenal" : statusLabel(e.status);
      li.innerHTML = `
        <div>
          <div class="history-sku ${isUnknown ? "history-name-unknown" : ""}">${escapeHtml(titleText)}</div>
          <div class="history-time">${escapeHtml(e.sku)} • ${d.toLocaleString("id-ID")}</div>
        </div>
        <span class="history-status ${badgeClass}">${badgeText}</span>`;
      historyList.appendChild(li);
    }
  }
  function statusLabel(s) {
    if (s === "ok") return "Tersimpan";
    if (s === "err") return "Gagal";
    return "Mengirim...";
  }
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]));
  }

  clearHistoryBtn.addEventListener("click", () => {
    if (confirm("Hapus semua riwayat scan di perangkat ini?")) {
      localStorage.removeItem(HISTORY_KEY);
      renderHistory();
    }
  });

  clearReturBtn.addEventListener("click", () => {
    if (confirm("Hapus semua riwayat retur di perangkat ini?")) {
      localStorage.removeItem(RETUR_KEY);
      renderReturHistory([]);
    }
  });

  // ---------- Kirim ke Worker (Cloudflare D1) ----------
  // Data masuk langsung ke D1 (cepat, 1 platform). Export ke Google Spreadsheet
  // dilakukan otomatis tiap hari oleh cron di Worker, bukan per-scan lagi.
  async function sendToSheet(sku, isoTime) {
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku, time: isoTime })
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Gagal simpan");

      if (data.known && data.name) {
        updateHistoryStatus(sku, isoTime, "ok", data.name, true);
        lastScanName.textContent = data.name;
        lastScanName.classList.remove("unknown");
        lastScanState.textContent = "Tersimpan ✓";
        lastScanState.className = "last-scan-state ok";
      } else {
        updateHistoryStatus(sku, isoTime, "ok", null, false);
        lastScanName.textContent = "SKU Tidak Dikenal";
        lastScanName.classList.add("unknown");
        lastScanState.textContent = "Tersimpan, tapi SKU belum terdaftar";
        lastScanState.className = "last-scan-state err";
      }
    } catch (err) {
      updateHistoryStatus(sku, isoTime, "err");
      lastScanState.textContent = "Gagal simpan (cek koneksi)";
      lastScanState.className = "last-scan-state err";
    }
  }

  // ---------- Handle hasil scan ----------
  function handleDecoded(text) {
    const now = Date.now();
    if (text === lastCode && now - lastScanTime < COOLDOWN_MS) return;
    lastCode = text;
    lastScanTime = now;

    playClick();
    if (navigator.vibrate) navigator.vibrate(60);
    freezeScan();

    const isoTime = new Date().toISOString();
    lastScanBox.classList.remove("hidden");
    lastScanSku.textContent = text;
    lastScanName.textContent = "Mengecek...";
    lastScanName.classList.remove("unknown");
    lastScanState.textContent = "Mengirim...";
    lastScanState.className = "last-scan-state loading";

    addHistoryEntry(text, isoTime);
    sendToSheet(text, isoTime);
  }

  // ---------- Efek freeze saat QR kebaca ----------
  function freezeScan() {
    isFrozen = true;
    scannerWrap.classList.add("captured");
    try { video.pause(); } catch (e) {}

    clearTimeout(freezeTimeout);
    freezeTimeout = setTimeout(() => {
      scannerWrap.classList.remove("captured");
      if (oneShotMode) {
        // Mode Sekali Tembak: kamera tetap berhenti, tunggu user tap tombol
        // "scan berikutnya" biar gak kepencet ke-scan lagi tanpa sengaja.
        shotGate.classList.remove("hidden");
      } else {
        isFrozen = false;
        video.play().catch(() => {});
      }
    }, FREEZE_MS);
  }

  // ---------- Toggle Mode Sekali Tembak ----------
  oneShotToggle.addEventListener("change", () => {
    oneShotMode = oneShotToggle.checked;
    // Kalau lagi nunggu tap "scan berikutnya" pas modenya dimatiin, langsung
    // lanjutkan scan normal biar gak nyangkut.
    if (!oneShotMode && !shotGate.classList.contains("hidden")) {
      shotGate.classList.add("hidden");
      isFrozen = false;
      video.play().catch(() => {});
    }
  });

  shotGate.addEventListener("click", () => {
    shotGate.classList.add("hidden");
    isFrozen = false;
    video.play().catch(() => {});
  });

  // ---------- Deteksi dukungan BarcodeDetector native ----------
  async function initDetector() {
    if (!("BarcodeDetector" in window)) return;
    try {
      barcodeDetector = new window.BarcodeDetector({ formats: ["qr_code"] });
      useBarcodeDetector = true;
    } catch (e) {
      useBarcodeDetector = false;
    }
  }

  // ---------- Kamera + loop scan ----------
  async function startCamera() {
    try {
      await initDetector();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });
      video.srcObject = stream;
      await video.play();
      statusEl.textContent = "Arahkan kamera ke QR Code SKU";

      setupCameraControls(stream);
      tick();
    } catch (err) {
      statusEl.textContent = "Tidak bisa akses kamera: izinkan akses kamera di browser";
    }
  }

  // Deteksi dukungan zoom asli kamera (kalau ada) + autofocus continuous.
  // Kalau HP tidak mendukung zoom hardware, fallback ke digital zoom
  // (crop + perbesar area tengah sebelum di-decode) supaya sticker kecil
  // tetap bisa dibesarkan sebelum di-scan.
  function setupCameraControls(stream) {
    videoTrack = stream.getVideoTracks()[0];
    if (!videoTrack) return;

    // Autofocus terus-menerus (kalau didukung) supaya sticker kecil tetap tajam
    if (videoTrack.applyConstraints) {
      videoTrack.applyConstraints({ advanced: [{ focusMode: "continuous" }] }).catch(() => {});
    }

    const caps = videoTrack.getCapabilities ? videoTrack.getCapabilities() : null;
    if (caps && caps.zoom) {
      hasHardwareZoom = true;
      zoomRange.min = caps.zoom.min;
      zoomRange.max = Math.min(caps.zoom.max, 8); // batasi biar slider tetap enak dipakai
      zoomRange.step = caps.zoom.step || 0.1;
      zoomRange.value = videoTrack.getSettings().zoom || caps.zoom.min;
      zoomLevel = parseFloat(zoomRange.value);
    } else {
      hasHardwareZoom = false;
      zoomRange.min = 1;
      zoomRange.max = 3;
      zoomRange.step = 0.1;
      zoomRange.value = 1;
      zoomLevel = 1;
    }
  }

  zoomRange.addEventListener("input", () => {
    zoomLevel = parseFloat(zoomRange.value);
    if (hasHardwareZoom && videoTrack) {
      videoTrack.applyConstraints({ advanced: [{ zoom: zoomLevel }] }).catch(() => {});
      video.style.transform = "";
    } else {
      // Digital zoom: perbesar tampilan video secara visual
      video.style.transform = `scale(${zoomLevel})`;
    }
  });

  function tick() {
    if (!scanning) return;

    if (isFrozen || busyDetect || video.readyState !== video.HAVE_ENOUGH_DATA) {
      rafId = requestAnimationFrame(tick);
      return;
    }

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const needsCrop = !hasHardwareZoom && zoomLevel > 1;

    if (useBarcodeDetector && barcodeDetector) {
      // ---- Jalur cepat: decoder native OS (hardware-accelerated) ----
      let source = video;
      if (needsCrop) {
        // Kalau pakai digital zoom, tetap perlu crop lewat canvas dulu
        canvas.width = vw;
        canvas.height = vh;
        const cw = vw / zoomLevel;
        const ch = vh / zoomLevel;
        ctx.drawImage(video, (vw - cw) / 2, (vh - ch) / 2, cw, ch, 0, 0, vw, vh);
        source = canvas;
      }
      busyDetect = true;
      barcodeDetector
        .detect(source)
        .then((codes) => {
          if (codes && codes.length > 0 && codes[0].rawValue) {
            handleDecoded(codes[0].rawValue.trim());
          }
        })
        .catch(() => { /* frame dilewati, coba lagi frame berikutnya */ })
        .finally(() => {
          busyDetect = false;
        });
    } else if (window.jsQR) {
      // ---- Fallback: jsQR di JS, di-downscale biar tetap ringan ----
      const scale = Math.min(1, DECODE_MAX_WIDTH / vw);
      const outW = Math.round(vw * scale);
      const outH = Math.round(vh * scale);
      canvas.width = outW;
      canvas.height = outH;

      if (needsCrop) {
        const cw = vw / zoomLevel;
        const ch = vh / zoomLevel;
        ctx.drawImage(video, (vw - cw) / 2, (vh - ch) / 2, cw, ch, 0, 0, outW, outH);
      } else {
        ctx.drawImage(video, 0, 0, outW, outH);
      }

      const imgData = ctx.getImageData(0, 0, outW, outH);
      const code = window.jsQR(imgData.data, outW, outH, {
        inversionAttempts: "dontInvert"
      });
      if (code && code.data) handleDecoded(code.data.trim());
    }

    rafId = requestAnimationFrame(tick);
  }

  // ---------- Data SKU (read-only dari D1 sku_master) ----------
  async function loadSkuList() {
    skuEmpty.textContent = "Memuat data SKU...";
    skuEmpty.classList.remove("hidden");
    skuList.innerHTML = "";
    try {
      // Pakai endpoint /api/sku/variants tanpa filter → ambil semua lewat endpoint baru
      const res = await fetch("/api/sku/all");
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Gagal ambil data");
      skuAllRows = data.rows || [];
      renderSkuList(skuAllRows);
    } catch (err) {
      skuEmpty.classList.remove("hidden");
      skuEmpty.textContent = "Gagal memuat data SKU (cek koneksi)";
    }
  }

  function renderSkuList(rows) {
    skuList.innerHTML = "";
    skuEmpty.classList.toggle("hidden", rows.length > 0);
    if (rows.length === 0) { skuEmpty.textContent = "Tidak ada data SKU ditemukan"; return; }
    for (const r of rows) {
      const li = document.createElement("li");
      const label = [r.product_name, r.type, r.name].filter(Boolean).join(" · ");
      const meta  = [r.sku, r.kategori].filter(Boolean).join(" • ");
      li.innerHTML = `
        <div style="flex:1;min-width:0">
          <div class="history-sku" style="white-space:normal">${escapeHtml(label || r.sku)}</div>
          <div class="history-time">${escapeHtml(meta)}</div>
        </div>`;
      skuList.appendChild(li);
    }
  }

  // Filter pencarian
  skuSearch.addEventListener("input", () => {
    const q = skuSearch.value.trim().toLowerCase();
    if (!q) { renderSkuList(skuAllRows); return; }
    const filtered = skuAllRows.filter(r =>
      (r.sku         || "").toLowerCase().includes(q) ||
      (r.product_name|| "").toLowerCase().includes(q) ||
      (r.type        || "").toLowerCase().includes(q) ||
      (r.name        || "").toLowerCase().includes(q) ||
      (r.kategori    || "").toLowerCase().includes(q)
    );
    renderSkuList(filtered);
  });

  skuRefreshBtn.addEventListener("click", () => {
    skuSearch.value = "";
    loadSkuList();
  });

  // ---------- RETUR ----------
  const returProduct  = document.getElementById("returProduct");
  const returTypeWrap = document.getElementById("returTypeWrap");
  const returType     = document.getElementById("returType");
  const returWarnaWrap= document.getElementById("returWarnaWrap");
  const returWarna    = document.getElementById("returWarna");
  const returQtyWrap  = document.getElementById("returQtyWrap");
  const returQty      = document.getElementById("returQty");
  const returForm     = document.getElementById("returForm");
  const returStatus   = document.getElementById("returStatus");
  const returList     = document.getElementById("returList");
  const returEmpty    = document.getElementById("returEmpty");
  const returSubmitBtn= document.getElementById("returSubmitBtn");
  const returSelectedInfo = document.getElementById("returSelectedInfo");
  const clearReturBtn = document.getElementById("clearRetur");

  // Data dari API untuk dropdown
  let returAllVariants = []; // semua variants dari produk yg dipilih

  // ---------- Retur history localStorage ----------
  const RETUR_KEY = "latela_retur_v1";
  const MAX_RETUR = 200;
  function loadReturLocal() {
    try { return JSON.parse(localStorage.getItem(RETUR_KEY)) || []; } catch { return []; }
  }
  function saveReturLocal(list) {
    try { localStorage.setItem(RETUR_KEY, JSON.stringify(list.slice(0, MAX_RETUR))); } catch {}
  }
  function addReturLocal(row) {
    const list = loadReturLocal();
    list.unshift(row);
    saveReturLocal(list);
  }

  function showReturStatus(msg, ok) {
    returStatus.textContent = msg;
    returStatus.className = "sku-status " + (ok ? "ok" : "err");
    returStatus.classList.remove("hidden");
    setTimeout(() => returStatus.classList.add("hidden"), 3000);
  }

  async function loadReturProducts() {
    try {
      const res = await fetch("/api/sku/products");
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      returProduct.innerHTML = '<option value="">— Pilih Nama Barang —</option>';
      (data.rows || []).forEach(r => {
        const opt = document.createElement("option");
        opt.value = r.product_name;
        opt.textContent = r.product_name;
        returProduct.appendChild(opt);
      });
    } catch (err) {
      showReturStatus("Gagal memuat data produk (cek koneksi)", false);
    }
  }

  returProduct.addEventListener("change", async () => {
    const product = returProduct.value;
    // Reset semua downstream
    returTypeWrap.style.display  = "none";
    returWarnaWrap.style.display = "none";
    returQtyWrap.style.display   = "none";
    returSubmitBtn.classList.add("hidden");
    returSelectedInfo.classList.add("hidden");
    returType.innerHTML  = '<option value="">— Pilih Type —</option>';
    returWarna.innerHTML = '<option value="">— Pilih Warna —</option>';
    returQty.value = "";
    returAllVariants = [];

    if (!product) return;

    try {
      const res = await fetch("/api/sku/variants?product_name=" + encodeURIComponent(product));
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      returAllVariants = data.rows || [];

      // Cek apakah ada type yang isi (bukan kosong semua)
      const types = [...new Set(returAllVariants.map(r => r.type).filter(Boolean))];

      if (types.length > 0) {
        // Ada type — tampilkan dropdown type dulu
        types.forEach(t => {
          const opt = document.createElement("option");
          opt.value = t;
          opt.textContent = t;
          returType.appendChild(opt);
        });
        returTypeWrap.style.display = "block";
      } else {
        // Tidak ada type — langsung ke warna
        returAllVariants.forEach(r => {
          const opt = document.createElement("option");
          opt.value = r.sku;
          opt.dataset.sku = r.sku;
          opt.textContent = r.name;
          returWarna.appendChild(opt);
        });
        returWarnaWrap.style.display = "block";
      }
    } catch (err) {
      showReturStatus("Gagal memuat variasi produk", false);
    }
  });

  returType.addEventListener("change", () => {
    const type = returType.value;
    returWarna.innerHTML = '<option value="">— Pilih Warna —</option>';
    returWarnaWrap.style.display = "none";
    returQtyWrap.style.display   = "none";
    returSubmitBtn.classList.add("hidden");
    returSelectedInfo.classList.add("hidden");

    if (!type) return;

    const filtered = returAllVariants.filter(r => r.type === type);
    filtered.forEach(r => {
      const opt = document.createElement("option");
      opt.value = r.sku;
      opt.dataset.sku = r.sku;
      opt.textContent = r.name;
      returWarna.appendChild(opt);
    });
    returWarnaWrap.style.display = "block";
  });

  returWarna.addEventListener("change", () => {
    const sku = returWarna.value;
    returQtyWrap.style.display = "none";
    returSubmitBtn.classList.add("hidden");
    returSelectedInfo.classList.add("hidden");
    if (!sku) return;

    const variant = returAllVariants.find(r => r.sku === sku);
    if (variant) {
      returSelectedInfo.textContent =
        `${returProduct.value}${variant.type ? " · " + variant.type : ""} · ${variant.name} (${sku})`;
      returSelectedInfo.classList.remove("hidden");
    }
    returQtyWrap.style.display = "block";
    returQty.value = "";
  });

  returQty.addEventListener("input", () => {
    const qty = parseInt(returQty.value);
    if (qty > 0) {
      returSubmitBtn.classList.remove("hidden");
    } else {
      returSubmitBtn.classList.add("hidden");
    }
  });

  returForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const sku          = returWarna.value;
    const product_name = returProduct.value;
    const type         = returType.value || "";
    const variant      = returAllVariants.find(r => r.sku === sku);
    const warna        = variant ? variant.name : "";
    const qty          = parseInt(returQty.value);

    if (!sku || !product_name || qty <= 0) {
      showReturStatus("Lengkapi semua pilihan dulu", false);
      return;
    }

    returSubmitBtn.disabled = true;
    returSubmitBtn.textContent = "Menyimpan...";

    try {
      const res = await fetch("/api/retur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku, product_name, type, warna, qty })
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Gagal simpan");

      showReturStatus(`Retur tersimpan! (${qty} pcs)`, true);

      // Simpan ke localStorage
      const newRow = {
        sku,
        product_name,
        type,
        warna,
        qty,
        waktu: new Date().toISOString()
      };
      addReturLocal(newRow);

      // Tampilkan langsung di list
      renderReturHistory(loadReturLocal());

      // Reset form
      returForm.reset();
      returTypeWrap.style.display  = "none";
      returWarnaWrap.style.display = "none";
      returQtyWrap.style.display   = "none";
      returSubmitBtn.classList.add("hidden");
      returSelectedInfo.classList.add("hidden");
      returAllVariants = [];
    } catch (err) {
      showReturStatus("Gagal menyimpan retur (cek koneksi)", false);
    } finally {
      returSubmitBtn.disabled = false;
      returSubmitBtn.textContent = "Simpan Retur";
    }
  });

  function loadReturHistory() {
    renderReturHistory(loadReturLocal());
  }

  function renderReturHistory(rows) {
    returList.innerHTML = "";
    returEmpty.classList.toggle("hidden", rows.length > 0);
    if (rows.length === 0) { returEmpty.textContent = "Belum ada riwayat retur"; return; }
    for (const r of rows) {
      const li = document.createElement("li");
      const d = new Date(r.waktu);
      const label = [r.product_name, r.type, r.warna].filter(Boolean).join(" · ");
      li.innerHTML = `
        <div>
          <div class="history-sku">${escapeHtml(label)}</div>
          <div class="history-time">${escapeHtml(r.sku)} • ${d.toLocaleString("id-ID")}</div>
        </div>
        <span class="history-status ok">${r.qty} pcs</span>`;
      returList.appendChild(li);
    }
  }

  // ---------- Navigasi tab ----------
  const views = {
    scan: document.getElementById("view-scan"),
    history: document.getElementById("view-history"),
    retur: document.getElementById("view-retur"),
    sku: document.getElementById("view-sku")
  };
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      Object.values(views).forEach(v => v.classList.remove("active"));
      views[btn.dataset.view].classList.add("active");
      scanning = btn.dataset.view === "scan";
      if (scanning) tick();
      if (btn.dataset.view === "sku") loadSkuList();
      if (btn.dataset.view === "retur") { loadReturProducts(); loadReturHistory(); }
    });
  });

  // ---------- Init ----------
  renderHistory();

  // Kamera baru dinyalakan setelah user nge-tap tombol ini. Ini penting:
  // Chrome Android baru mengizinkan navigator.vibrate() jalan kalau sudah
  // ada minimal 1 tap di halaman -- tanpa gate ini, getar bisa senyap-senyap
  // di-block browser karena kamera (dan scan pertama) jalan otomatis tanpa
  // interaksi user sama sekali.
  startGate.addEventListener("click", () => {
    startGate.classList.add("hidden");

    // "Bangunkan" AudioContext di dalam gesture yang sama biar bunyi klik
    // juga gak ke-block autoplay policy.
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
    } catch (e) {}

    // Tap "percobaan" super pendek supaya Chrome mencatat sudah ada user
    // gesture untuk vibrate di halaman ini (tidak terasa oleh user).
    if (navigator.vibrate) navigator.vibrate(1);

    startCamera();
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    });
  }

  } // end initApp()

})();
