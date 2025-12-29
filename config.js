/* config.js - PUSAT PENGATURAN & SKENARIO
   Edit file ini untuk mengatur jalannya permainan.
*/

// --- 1. PENGATURAN UMUM ---
const CONFIG = {
  startingBalance: 0, // Saldo Awal (Rp)
  betAmount: 10000, // Biaya sekali putar (Rp)
  spinSpeed: 7000, // Lama putaran mesin (ms) - 2000 artinya 2 detik
};

// --- 2. DAFTAR HADIAH (Berapa kali lipat kemenangannya) ---
const PAYOUTS = {
  "💎": 50, // Jika dapat 3 Diamond, taruhan dikali 50
  "7️⃣": 20,
  "🔔": 10,
  "🍒": 5,
  "🍋": 2,
};

// --- 3. SKENARIO NASIB (Di sini kamu jadi Sutradara) ---
/* Tipe (type) yang bisa dipakai:
   - "win"       : Menang (Simbol 777 atau Lonceng)
   - "jackpot"   : Menang Besar (Diamond)
   - "loss"      : Kalah
   - "near-miss" : Nyaris Menang (Paling bikin penasaran)
   - "small-win" : Menang Kecil (Balik modal dikit)
*/

const GAME_SCENARIOS = [
  { type: "win", msg: "Wih hoki pemula!" }, // Menang 1x
  { type: "jackpot", msg: "gacor" }, // Kalah 2
  { type: "win", msg: "gacor" }, // Kalah 1
  { type: "jackpot", msg: "gacoor" }, // Kalah 4
  { type: "win", msg: "gacor" }, // Kalah 3
  { type: "jackpot", msg: "gacor" }, // Kalah 5
  // ... copy paste terus sampai dia bangkrut
];

// --- 4. SIMBOL YANG DIPAKAI ---
const SYMBOLS = ["💎", "7️⃣", "🔔", "🍒", "🍋"];
