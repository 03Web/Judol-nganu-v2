/* scenarios.js - PENGATUR NASIB PEMAIN
   Di sini kamu menentukan urutan kejadian. Mesin akan membaca daftar ini dari atas ke bawah.
   
   Tipe (type) yang tersedia:
   1. "win"       -> Menang biasa (nominal tergantung simbol yang keluar)
   2. "small-win" -> Menang kecil (balik modal sedikit)
   3. "loss"      -> Kalah total (simbol berantakan)
   4. "near-miss" -> NYARIS MENANG (2 simbol sama, 1 beda). Ini paling jahat buat psikologis.
   5. "jackpot"   -> Menang Besar (Simbol 777 atau Diamond semua)
*/

const GAME_SCENARIOS = [
  // --- FASE 1: UMPAN (HOOK) ---
  // Kasih menang dulu biar senang dan percaya diri.
  { type: "jackpot", msg: "WOW BARU DAFTAR LANGSUNG MAXWIN!" },
  { type: "loss", msg: "Ah, kurang beruntung." },
  { type: "win", msg: "GACOR! Saldo nambah bos!" },

  // --- FASE 2: MEMBANGUN HARAPAN (NEAR MISS) ---
  // Mulai bikin geregetan. Seolah-olah "kurang dikit lagi".
  { type: "near-miss", msg: "ARGH! Dikit lagi Jackpot!!" },
  { type: "loss", msg: "Ayo coba lagi, mesin udah panas!" },
  { type: "near-miss", msg: "Aduh! Kepleset satu angka doang!" },

  // --- FASE 3: PENYEDOTAN (DRAIN) ---
  // Sedot saldonya pelan-pelan sampai habis.
  { type: "loss", msg: "Jangan nyerah, kejar terus!" },
  { type: "loss", msg: "Saldo menipis? Depo lagi dong." },
  { type: "loss", msg: "Kayaknya putaran depan jackpot nih..." },
  { type: "loss", msg: "Yah... habis deh." },

  // (Kalau daftar habis, dia akan mengulang lagi dari atas)
];

// Konfigurasi Tambahan
const GAME_CONFIG = {
  startingBalance: 100000, // Saldo awal
  betAmount: 2000, // Sekali putar bayar berapa
  spinDuration: 2000, // Lama putaran (ms) biar deg-degan
};
