/* game.js - FINAL VERSION (WITH ZEUS MULTIPLIER) */

// --- 1. CONFIG & DATA ---
// Simbol Biasa (0-8) + Simbol Multiplier (99)
const SYMBOLS = [
  { id: 0, char: "💎", val: 0.25, color: "sym-1" },
  { id: 1, char: "🟢", val: 0.4, color: "sym-2" },
  { id: 2, char: "🟡", val: 0.5, color: "sym-3" },
  { id: 3, char: "🔻", val: 0.8, color: "sym-4" },
  { id: 4, char: "❤️", val: 1.0, color: "sym-0" },
  { id: 5, char: "🏆", val: 1.5, color: "sym-3" },
  { id: 6, char: "💍", val: 2.0, color: "sym-1" },
  { id: 7, char: "⏳", val: 5.0, color: "sym-2" },
  { id: 8, char: "👑", val: 10.0, color: "sym-3" },
];

// Config
let balance = 100000;
let currentBet = 200;
let isSpinning = false;
let gridState = [];
let roundMultipliers = []; // Menyimpan angka pengali yang muncul di layar

// DOM Elements
const gridEl = document.getElementById("grid-container");
const balanceEl = document.getElementById("balance");
const winDisplayEl = document.getElementById("tumble-win");
const spinBtn = document.getElementById("spin-btn");
const zeusImg = document.querySelector(".zeus-img");
const flashOverlay = document.getElementById("flash-overlay");

// --- 2. CORE FUNCTIONS ---

window.onload = initGame;

function initGame() {
  updateUI();
  fillGridRandom(false); // False = jangan kasih multiplier pas awal
  renderGrid();
}

// Logic Random Simbol (Sekarang bisa muncul Bola Multiplier)
function getRandomWeightedSymbol(allowMultiplier = true) {
  const rand = Math.random() * 100;

  // 5% Peluang Muncul Multiplier (Hanya saat spin/tumble, bukan init)
  if (allowMultiplier && rand > 95) {
    return createMultiplierSymbol();
  }

  // Logic Simbol Biasa
  if (rand < 35) return SYMBOLS[0];
  if (rand < 60) return SYMBOLS[1];
  if (rand < 75) return SYMBOLS[2];
  if (rand < 85) return SYMBOLS[3];
  if (rand < 92) return SYMBOLS[4];
  if (rand < 96) return SYMBOLS[5];
  if (rand < 98) return SYMBOLS[6];
  if (rand < 99.5) return SYMBOLS[7];
  return SYMBOLS[8];
}

// Membuat Objek Bola Pengali (x2 s/d x500)
function createMultiplierSymbol() {
  const mults = [2, 3, 4, 5, 8, 10, 15, 25, 50, 100, 500];
  // Berat ke angka kecil
  const val = mults[Math.floor(Math.pow(Math.random(), 3) * mults.length)]; // Math bias ke index rendah

  let colorClass = "orb-green";
  if (val >= 10) colorClass = "orb-blue";
  if (val >= 50) colorClass = "orb-purple";
  if (val >= 100) colorClass = "orb-red";

  return {
    id: 99, // ID Khusus Multiplier
    type: "multiplier",
    val: val,
    color: colorClass,
    char: `${val}x`,
  };
}

function fillGridRandom(allowMultiplier) {
  gridState = [];
  roundMultipliers = []; // Reset pengali ronde ini
  for (let col = 0; col < 6; col++) {
    let column = [];
    for (let row = 0; row < 5; row++) {
      column.push(getRandomWeightedSymbol(allowMultiplier));
    }
    gridState.push(column);
  }
}

function renderGrid() {
  gridEl.innerHTML = "";
  roundMultipliers = []; // Hitung ulang apa yang ada di layar

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 6; col++) {
      const sym = gridState[col][row];
      const cell = document.createElement("div");

      // Unik ID
      cell.id = `cell-${col}-${row}`;

      if (sym) {
        if (sym.type === "multiplier") {
          // Render Bola
          const orb = document.createElement("div");
          orb.classList.add("multiplier-orb", sym.color);
          orb.innerText = sym.char;
          cell.appendChild(orb);
          cell.classList.add("grid-cell"); // Tetap kotak, tapi isinya bola

          // Catat ada pengali di layar
          roundMultipliers.push(sym.val);
        } else {
          // Render Simbol Biasa
          cell.classList.add("grid-cell", sym.color);
          cell.innerText = sym.char;
        }
      } else {
        cell.classList.add("grid-cell"); // Kosong
      }
      gridEl.appendChild(cell);
    }
  }
}

// --- 3. GAMEPLAY LOGIC ---

spinBtn.addEventListener("click", () => {
  if (isSpinning) return;
  if (balance < currentBet) return alert("Saldo Kurang!");

  // Start
  balance -= currentBet;
  updateUI();
  isSpinning = true;
  spinBtn.style.opacity = "0.5";
  winDisplayEl.innerText = "0";

  // ZEUS EFFECT: 30% Chance Kakek Angkat Tangan Pas Spin
  if (Math.random() < 0.3) triggerZeus();

  gridEl.style.opacity = "0.3";

  setTimeout(() => {
    fillGridRandom(true); // Boleh ada multiplier
    renderGrid();
    gridEl.style.opacity = "1";

    processGameLogic(0);
  }, 400);
});

function triggerZeus() {
  // Animasi Petir
  zeusImg.classList.add("zeus-strike");
  flashOverlay.classList.add("flash-active");

  // Suara Petir (Placeholder)
  console.log("⚡ ZEUS STRIKE! ⚡");

  setTimeout(() => {
    zeusImg.classList.remove("zeus-strike");
    flashOverlay.classList.remove("flash-active");
  }, 500);
}

function processGameLogic(currentTumbleWin) {
  // A. Hitung Simbol Menang (Kecuali Multiplier Orb)
  const counts = {};
  const winCoords = [];

  for (let col = 0; col < 6; col++) {
    for (let row = 0; row < 5; row++) {
      const sym = gridState[col][row];
      if (!sym || sym.type === "multiplier") continue; // Bola tidak pecah

      if (!counts[sym.id]) counts[sym.id] = { count: 0, coords: [] };
      counts[sym.id].count++;
      counts[sym.id].coords.push({ c: col, r: row });
    }
  }

  // B. Cek Valid Win (>8)
  let roundWin = 0;
  let hasWin = false;

  for (const key in counts) {
    if (counts[key].count >= 8) {
      hasWin = true;
      // Rumus: (BaseVal * Jumlah) * (Bet / 5)
      const symVal = SYMBOLS.find((s) => s.id == key).val;
      roundWin += Math.floor(symVal * counts[key].count * (currentBet / 2));
      winCoords.push(...counts[key].coords);
    }
  }

  // C. Eksekusi
  if (hasWin) {
    currentTumbleWin += roundWin;
    winDisplayEl.innerText = `Rp ${currentTumbleWin.toLocaleString()}`;

    // Highlight
    winCoords.forEach((c) => {
      const el = document.getElementById(`cell-${c.c}-${c.r}`);
      if (el) el.classList.add("win-connect");
    });

    setTimeout(() => {
      // Hapus Simbol Menang
      winCoords.forEach((c) => {
        gridState[c.c][c.r] = null;
      });

      renderGrid();

      setTimeout(() => {
        applyGravity();
        refillGrid(); // Isi baru (bisa muncul multiplier lagi)
        renderGrid();

        // REKURSIF: Cek lagi
        processGameLogic(currentTumbleWin);
      }, 300);
    }, 600);
  } else {
    // --- FINISH TUMBLE: PERHITUNGAN AKHIR ---
    finalizeRound(currentTumbleWin);
  }
}

function finalizeRound(totalWin) {
  // Cek apakah ada Multiplier di layar?
  let finalMultiplier = 0;
  if (roundMultipliers.length > 0) {
    // Jumlahkan semua bola
    finalMultiplier = roundMultipliers.reduce((a, b) => a + b, 0);
  }

  // Jika menang dan ada multiplier -> Anime Petir
  if (totalWin > 0 && finalMultiplier > 0) {
    triggerZeus(); // Kakek nyambar bola

    setTimeout(() => {
      // Animasi total win dikali
      const finalPay = totalWin * finalMultiplier;
      winDisplayEl.innerHTML = `Rp ${totalWin.toLocaleString()} x <span style="color:#ff0040; font-size:1.5rem">${finalMultiplier}x</span>`;

      setTimeout(() => {
        winDisplayEl.innerText = `TOTAL: Rp ${finalPay.toLocaleString()}`;
        winDisplayEl.style.color = "#00e676"; // Hijau cuan
        balance += finalPay;
        updateUI();
        endGame();
      }, 1000);
    }, 600);
  } else {
    // Menang biasa atau kalah
    if (totalWin > 0) {
      balance += totalWin;
      updateUI();
    }
    endGame();
  }
}

function endGame() {
  isSpinning = false;
  spinBtn.style.opacity = "1";
  setTimeout(() => {
    winDisplayEl.style.color = "white";
  }, 2000);
}

// Utils (Gravity & Refill sama seperti Tahap 2)
function applyGravity() {
  for (let col = 0; col < 6; col++) {
    let newCol = gridState[col].filter((s) => s !== null);
    let missing = 5 - newCol.length;
    for (let i = 0; i < missing; i++) newCol.unshift(null);
    gridState[col] = newCol;
  }
}

function refillGrid() {
  for (let col = 0; col < 6; col++) {
    for (let row = 0; row < 5; row++) {
      if (gridState[col][row] === null) {
        // Saat refill, juga ada peluang muncul multiplier (Gacor mode)
        gridState[col][row] = getRandomWeightedSymbol(true);
      }
    }
  }
}

function updateUI() {
  balanceEl.innerText = balance.toLocaleString();
  betEl.innerText = currentBet.toLocaleString();
}
