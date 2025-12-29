/* game.js - FINAL ENGINE (With Top Up & Bet Control) */

if (typeof CONFIG === "undefined") {
  alert("Error: File config.js tidak ditemukan!");
}

// --- STATE ---
let balance = CONFIG.startingBalance;
let currentBet = CONFIG.betAmount; // Taruhan dinamis, bisa diubah user
let currentScenarioIndex = 0;
let isSpinning = false;
let nextOutcomeOverride = null;

// --- CONFIG TAMBAHAN (Internal) ---
const MIN_BET = 5000;
const MAX_BET = 1000000;
const TOP_UP_AMOUNT = 500000; // Sekali klik tambah 500rb

const TECH_CONFIG = { symbolHeight: 80, totalSymbolsInReel: 24 };

// --- SOUND ASSETS ---
const audio = {
  spin: new Audio("sounds/spin.mp3"),
  win: new Audio("sounds/win.mp3"),
  lose: new Audio("sounds/lose.mp3"),
  coin: new Audio("sounds/coin.mp3"), // (Opsional) Suara koin
};
// Set volume
audio.spin.volume = 0.5;

// --- DOM ELEMENTS ---
const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3"),
];
const spinBtn = document.getElementById("spin-btn");
const msgDisplay = document.getElementById("status-msg");
const balanceDisplay = document.getElementById("balance-display");
const betDisplay = document.getElementById("bet-display");
const payline = document.querySelector(".payline");
const gameContainer = document.querySelector(".game-container");

// --- INIT ---
window.onload = () => {
  updateUI();
  reels.forEach(
    (reel) => (reel.innerHTML = generateReelHTML(getRandomSymbol()))
  );
};

// --- USER ACTIONS: BET & TOP UP ---

// Fungsi Ganti Taruhan
window.adjustBet = function (amount) {
  if (isSpinning) return;

  let newBet = currentBet + amount;

  // Batasan Minimum & Maksimum
  if (newBet < MIN_BET) newBet = MIN_BET;
  if (newBet > MAX_BET) newBet = MAX_BET;

  // Cek apakah saldo cukup (Opsional, di sini kita biarkan user set tinggi meski saldo kurang, nanti dicek pas spin)

  currentBet = newBet;
  playSound("coin"); // Efek suara klik (kalau ada filenya)
  updateUI();
};

// --- FITUR DEPOSIT BARU (POP UP) ---

// 1. Buka Menu
window.openDepositModal = function () {
  document.getElementById("deposit-modal").style.display = "flex";
  // Reset input manual biar kosong pas dibuka
  document.getElementById("manual-amount").value = "";
};

// 2. Tutup Menu
window.closeDepositModal = function () {
  document.getElementById("deposit-modal").style.display = "none";
};

// 3. Proses Deposit (Otomatis dari Tombol)
window.processDeposit = function (amount) {
  addBalance(amount);
  closeDepositModal();
};

// 4. Proses Deposit (Manual Input)
window.processManualDeposit = function () {
  const inputEl = document.getElementById("manual-amount");
  const amount = parseInt(inputEl.value);

  if (!amount || amount <= 0) {
    alert("Masukkan jumlah uang yang benar bos!");
    return;
  }

  addBalance(amount);
  closeDepositModal();
};

// Fungsi Internal Menambah Saldo & Efek
function addBalance(amount) {
  balance += amount;

  playSound("win"); // Suara 'Tring!'

  // Efek Animasi Angka
  balanceDisplay.classList.remove("pop-anim");
  void balanceDisplay.offsetWidth; // Trigger reflow
  balanceDisplay.classList.add("pop-anim");

  // Pesan Sukses
  msgDisplay.innerText = `✅ Deposit Rp ${amount.toLocaleString()} Berhasil!`;
  msgDisplay.style.color = "#00ff00";

  updateUI();
}

// --- SPIN ACTION ---
spinBtn.addEventListener("click", () => {
  if (isSpinning) return;

  // Cek Saldo vs Taruhan Saat Ini
  if (balance < currentBet) {
    msgDisplay.innerText = "❌ Saldo Kurang! Top Up dulu bos.";
    msgDisplay.style.color = "red";
    playSound("lose");

    // Highlight tombol top up (Visual cue)
    document.querySelector(".btn-topup").style.boxShadow = "0 0 10px red";
    setTimeout(
      () => (document.querySelector(".btn-topup").style.boxShadow = "none"),
      1000
    );

    return;
  }

  balance -= currentBet;
  updateUI();

  // Start Spin
  isSpinning = true;
  spinBtn.disabled = true;
  msgDisplay.innerText = "Semoga gacor...";
  msgDisplay.style.color = "#aaa";
  payline.style.display = "none";
  gameContainer.classList.remove("win-animation");

  playSound("spin");

  const outcome = getFinalOutcome();

  // Jalankan Animasi
  spinReel(0, outcome.symbols[0], 0);
  spinReel(1, outcome.symbols[1], 300);
  spinReel(2, outcome.symbols[2], 600);

  setTimeout(() => {
    handleResult(outcome);
    isSpinning = false;
    spinBtn.disabled = false;
    audio.spin.pause();
    audio.spin.currentTime = 0;
  }, CONFIG.spinSpeed + 800);
});

// --- LOGIKA MESIN & ANIMASI (Sama seperti sebelumnya) ---

function spinReel(reelIndex, targetSymbol, delay) {
  const reel = reels[reelIndex];
  let stripHTML = "";
  for (let i = 0; i < TECH_CONFIG.totalSymbolsInReel; i++)
    stripHTML += `<div class="symbol">${getRandomSymbol()}</div>`;
  stripHTML += `<div class="symbol">${targetSymbol}</div>`;
  stripHTML += `<div class="symbol">${getRandomSymbol()}</div>`;

  reel.innerHTML = stripHTML;
  reel.style.transition = "none";
  reel.style.transform = "translateY(0)";
  reel.offsetHeight;

  setTimeout(() => {
    const moveY =
      -(TECH_CONFIG.totalSymbolsInReel * TECH_CONFIG.symbolHeight) +
      TECH_CONFIG.symbolHeight;
    reel.style.transition = `transform ${CONFIG.spinSpeed}ms cubic-bezier(0.1, 0.8, 0.1, 1)`;
    reel.style.transform = `translateY(${moveY}px)`;
    reel.style.filter = "blur(1px)";
  }, delay);

  setTimeout(() => {
    reel.style.filter = "none";
  }, delay + CONFIG.spinSpeed);
}

function getFinalOutcome() {
  if (nextOutcomeOverride) {
    const type = nextOutcomeOverride;
    nextOutcomeOverride = null;
    updateAdminStatusUI();
    return generateOutcomeByType(type, "⚠️ BANDAR INTERVENTION");
  }

  const scenario = GAME_SCENARIOS[currentScenarioIndex];
  currentScenarioIndex = (currentScenarioIndex + 1) % GAME_SCENARIOS.length;

  return generateOutcomeByType(scenario.type, scenario.msg);
}

function generateOutcomeByType(type, msg) {
  let s1, s2, s3;
  if (type === "jackpot") {
    s1 = s2 = s3 = "💎";
  } else if (type === "win") {
    const winSym = "7️⃣";
    s1 = s2 = s3 = winSym;
  } else if (type === "small-win") {
    const smallSym = "🍒";
    s1 = s2 = s3 = smallSym;
  } else if (type === "near-miss") {
    s1 = "7️⃣";
    s2 = "7️⃣";
    s3 = "🍒";
  } else {
    s1 = getRandomSymbol();
    do {
      s2 = getRandomSymbol();
    } while (s2 === s1);
    s3 = getRandomSymbol();
  }
  return { symbols: [s1, s2, s3], msg: msg, type: type };
}

// --- RESULT HANDLER (Cari bagian ini di game.js) ---
function handleResult(outcome) {
  if (
    outcome.symbols[0] === outcome.symbols[1] &&
    outcome.symbols[1] === outcome.symbols[2]
  ) {
    // MENANG
    msgDisplay.innerText = `🎉 ${outcome.msg} 🎉`;
    msgDisplay.style.color = "#ffd700";
    payline.style.display = "block";
    gameContainer.classList.add("win-animation");

    playSound("win");

    // ---> TAMBAHKAN BARIS INI UNTUK EFEK LEDAKAN <---
    // Cek apakah ini jackpot (diamond) atau menang biasa untuk bedakan efeknya
    const winType = outcome.symbols[0] === "💎" ? "jackpot" : "normal";
    triggerWinEffects(winType);
    // ------------------------------------------------

    const multiplier = PAYOUTS[outcome.symbols[0]] || 0;
    const winAmount = currentBet * multiplier;

    balance += winAmount;
    msgDisplay.innerText += ` (+Rp ${winAmount.toLocaleString()})`;
  } else {
    // KALAH
    // ... (sisanya sama)
  }
  updateUI();
}

// --- HELPER & UI UPDATER ---

function updateUI() {
  // Update teks angka dengan format Rupiah (tanpa desimal)
  balanceDisplay.innerText = balance.toLocaleString("id-ID");
  betDisplay.innerText = currentBet.toLocaleString("id-ID");
}

function playSound(type) {
  try {
    if (audio[type]) {
      audio[type].currentTime = 0;
      audio[type].play().catch((e) => {});
    }
  } catch (e) {}
}

function generateReelHTML(symbol) {
  return `<div class="symbol">${getRandomSymbol()}</div><div class="symbol">${symbol}</div><div class="symbol">${getRandomSymbol()}</div>`;
}
function getRandomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

// --- ADMIN PANEL (Tetap Sama) ---
let adminClicks = 0;
window.toggleAdmin = function () {
  // Pakai window agar bisa diakses dari HTML
  adminClicks++;
  if (adminClicks >= 3) {
    const modal = document.getElementById("admin-modal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
    adminClicks = 0;
  }
};

window.setOverride = function (type) {
  nextOutcomeOverride = type;
  updateAdminStatusUI();
  document.getElementById("admin-modal").style.display = "none";
  alert(`⚡ MODE AKTIF: Putaran berikutnya pasti "${type.toUpperCase()}"`);
};

function updateAdminStatusUI() {
  const statusEl = document.getElementById("override-status");
  if (nextOutcomeOverride) {
    statusEl.innerText = "FORCE " + nextOutcomeOverride.toUpperCase();
    statusEl.style.color = "red";
  } else {
    statusEl.innerText = "Auto (Skenario)";
    statusEl.style.color = "yellow";
  }
}
// ==========================================
//  MESIN EFEK VISUAL (FIXED VERSION)
//  *Ganti seluruh bagian paling bawah game.js dengan ini*
// ==========================================

const canvas = document.getElementById("effect-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
let animationId = null;

// 1. PAKSA POINTER EVENTS NONE AGAR KLIK TEMBUS KE TOMBOL
if (canvas) {
  canvas.style.pointerEvents = "none";
}

function resizeCanvas() {
  if (gameContainer) {
    canvas.width = gameContainer.offsetWidth;
    canvas.height = gameContainer.offsetHeight;
  }
}
window.addEventListener("resize", resizeCanvas);
setTimeout(resizeCanvas, 500);

class Particle {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.colors = colors;
    this.radius = Math.random() * 5 + 2;
    // Kecepatan ledakan
    this.vx = (Math.random() - 0.5) * 12;
    this.vy = (Math.random() - 0.5) * 12;
    this.gravity = 0.25;
    this.friction = 0.94;
    this.life = 1.0;
    this.decay = Math.random() * 0.02 + 0.015;
  }

  update() {
    this.vy += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    // Pilih warna acak dari array
    const colorVal =
      this.colors[Math.floor(Math.random() * this.colors.length)];

    // Gunakan 'this.life' untuk transparansi, jadi makin lama makin pudar
    ctx.fillStyle = `rgba(${colorVal}, ${this.life})`;

    ctx.fill();
    ctx.restore();
  }
}

function triggerWinEffects(type) {
  try {
    // Reset animasi sebelumnya biar gak numpuk
    if (animationId) cancelAnimationFrame(animationId);
    particles = [];
    resizeCanvas();

    // BERSIHKAN LAYAR TOTAL DULU
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let colors = ["255, 215, 0", "255, 255, 200", "255, 165, 0"]; // Emas
    if (type === "jackpot") {
      colors = ["255, 215, 0", "0, 191, 255", "255, 255, 255", "255, 50, 50"]; // Warni-warni
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const particleCount = type === "jackpot" ? 200 : 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(centerX, centerY, colors));
    }

    animateParticles();

    // Stop otomatis setelah 3 detik biar hemat memori
    setTimeout(() => {
      if (animationId) cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Hapus bersih total
      particles = [];
    }, 3000);
  } catch (e) {
    console.error("Effect Error:", e);
    // Safety net: kalau error, hapus canvas biar game tetep jalan
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function animateParticles() {
  animationId = requestAnimationFrame(animateParticles);

  // --- PERBAIKAN UTAMA DI SINI ---
  // Gunakan clearRect (HAPUS BERSIH) bukan fillRect (TUMPUK WARNA)
  // Ini mencegah layar jadi hitam
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update dan gambar semua partikel
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    if (p.life > 0) {
      p.update();
      p.draw(ctx);
    } else {
      particles.splice(i, 1); // Hapus partikel mati
    }
  }

  // Stop loop jika partikel habis
  if (particles.length === 0) {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
