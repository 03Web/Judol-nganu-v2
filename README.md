<h1 align="center">🎰 Gates of Nganu — Judol-nganu-v2</h1>

<p align="center">
  <em>Simulasi edukasi slot bertema "Gates of Olympus" — dibuat sebagai kampanye anti judi online (judol).</em>
</p>

<p align="center">
  <a href="https://judol-nganu-v2.amazthegreatape.fun"><img src="https://img.shields.io/badge/Live%20Demo-Online-success?style=flat-square&logo=github" alt="Live Demo"></a>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/GitHub%20Pages-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub Pages">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="MIT License">
  <img src="https://img.shields.io/badge/Bahasa-Indonesia-red?style=flat-square" alt="Bahasa Indonesia">
</p>

---

## ⚠️ Disclaimer Penting

> **Proyek ini adalah SIMULASI EDUKASI. BUKAN judi sungguhan.**
>
> - ❌ **Tidak ada uang asli** yang dipakai, dimenangkan, atau bisa ditarik.
> - ❌ **Tidak ada microtransaction**, tidak ada pendaftaran, tidak ada deposit.
> - ❌ **Tidak ada koneksi** ke situs judi/taruhan manapun.
> - ✅ Tujuan satu-satunya: **menunjukkan betapa rugi & manipulatifnya sistem judi online**, lewat mode admin `RUNGKAD` (selalu kalah) dan `MAXWIN` (peluang menang dimanipulasi).
> - ✅ Saldo & taruhan hanyalah angka di memori browser — refresh halaman = reset.
>
> **Judi online MERUSAK keluarga, mental, dan ekonomi. Stop judol. Sayangi dirimu.**

---

## 📖 Daftar Isi

1. [Tentang Proyek](#-tentang-proyek)
2. [Demo Live](#-demo-live)
3. [Fitur Utama](#-fitur-utama)
4. [Stack Teknologi](#-stack-teknologi)
5. [Struktur File](#-struktur-file)
6. [Cara Menjalankan Lokal](#-cara-menjalankan-lokal)
7. [Mekanik Game](#-mekanik-game)
8. [Mode Admin (Edukasi)](#-mode-admin-edukasi)
9. [Konfigurasi & Kustomisasi](#-konfigurasi--kustomisasi)
10. [Deployment ke GitHub Pages](#-deployment-ke-github-pages)
11. [Kontribusi](#-kontribusi)
12. [Lisensi](#-lisensi)
13. [Pesan Penutup](#-pesan-penutup)

---

## 🎯 Tentang Proyek

**Judol-nganu-v2** adalah simulasi web sederhana yang meniru tampilan & mekanik game slot online bertema dewa-dewa Olympus (Zeus, petir, mahkota emas). Dibangun **murni dengan HTML, CSS, dan JavaScript vanilla** tanpa framework apapun.

Walaupun terlihat seperti game slot beneran, sebenarnya proyek ini punya satu misi: **memperlihatkan bagaimana sistem judi online dirancang untuk membuat pemain rugi**. Lewat mode admin yang bisa diakses, pemain bisa membuktikan sendiri:

- Mode `RUNGKAD`: kalah terus, tidak ada multiplier — meniru "fase sedot" yang sering dipakai bandar.
- Mode `MAXWIN`: menang besar yang sengaja dipancing — meniru "fase pancing" agar pemain ketagihan.
- Mode `NORMAL`: RNG murni — tetap rugi dalam jangka panjang karena house edge.

**Target audiens**: pelajar, content creator anti-judol, edukator, dan siapapun yang ingin memahami cara kerja manipulasi UX di game slot.

---

## 🌐 Demo Live

🔗 **[https://judol-nganu-v2.amazthegreatape.fun](https://judol-nganu-v2.amazthegreatape.fun)**

Dihosting via **GitHub Pages** dengan custom domain (lihat file [`CNAME`](./CNAME)).

> Tidak perlu install apa-apa. Buka di browser desktop atau mobile — sudah responsive.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🎰 **Grid Tumble 6×5** | 6 kolom × 5 baris, cluster pay style (≥8 simbol sejenis = menang). |
| 💥 **Sistem Tumble** | Simbol menang pecah → simbol di atas turun (gravity) → grid diisi ulang → cek menang lagi (rekursif). |
| 🌟 **Multiplier Orbs** | Bola pengali x2 sampai x500, warna berbeda sesuai nilai. Total semua orb di grid dikalikan ke kemenangan. |
| ⚙️ **Mode Admin** | Tiga mode tersembunyi: `NORMAL`, `MAXWIN`, `RUNGKAD` — untuk demonstrasi manipulasi. |
| 💰 **Top-up Simulasi** | Tambah saldo (preset 100rb, 1jt, atau input manual). Saldo awal Rp 100.000. |
| 🎚️ **Taruhan Custom** | Naik/turun pakai tombol +/-, atau input manual via modal. |
| 🔊 **Sound Effects** | Audio spin, win, lose, top-up dari folder [`sounds/`](./sounds). |
| 🎬 **Big Win Modal** | Modal full-screen "BIG WIN / MEGA WIN / SENSATIONAL / MAX WIN" sesuai besar pengali. |
| ⚡ **Zeus Animation** | Karakter Zeus (👴🏻) bergetar dengan efek petir saat spin atau saat menang besar. |
| 📱 **Mobile Responsive** | Layout adaptif untuk layar < 768px — tata letak diatur ulang via CSS media query. |
| 🚫 **Zero Dependency** | Tidak butuh npm, build step, atau koneksi backend. Pure static. |

---

## 🛠️ Stack Teknologi

| Layer | Teknologi |
|---|---|
| **Markup** | HTML5 |
| **Styling** | CSS3 (CSS variables, Flexbox, Grid, `@keyframes` animation) |
| **Logic** | JavaScript (ES6+, vanilla — no jQuery, no React, no bundler) |
| **Font** | Google Fonts — `Cinzel` (judul) & `Roboto` (body) |
| **Audio** | HTML5 `<audio>` API via konstruktor `new Audio()` |
| **Hosting** | GitHub Pages + Custom Domain (CNAME) |
| **Editor** | VS Code + extension Live Server (port 5501) |

> **Catatan**: seluruh CSS dan JavaScript untuk aplikasi versi terbaru berada **inline di dalam `index.html`** (line 10–513 untuk CSS, line 682–1104 untuk JS). File `style.css` dan `game.js` adalah **artifact versi lama** yang masih tersimpan di repo sebagai referensi, tapi **tidak di-load** oleh `index.html`.

---

## 📂 Struktur File

```
Judol-nganu-v2/
├── index.html         # 🟢 FILE UTAMA — markup + CSS inline + JS inline
├── game.js            # 🟡 Legacy — script versi lama (tidak dipakai index.html)
├── style.css          # 🟡 Legacy — stylesheet versi lama (tidak dipakai index.html)
├── CNAME              # Custom domain GitHub Pages
├── README.md          # Dokumentasi ini
├── LICENSE            # Lisensi MIT
├── .vscode/
│   └── settings.json  # Konfigurasi Live Server (port 5501)
└── sounds/
    ├── spin.mp3       # Suara saat tombol spin ditekan
    ├── win.mp3        # Suara saat menang
    ├── lose.mp3       # Suara saat kalah ("RUNGKAD!")
    └── topup.mp3      # Suara saat menambah saldo
```

---

## 🚀 Cara Menjalankan Lokal

### Opsi 1 — Buka Langsung (paling cepat)

Cukup **double-click** file `index.html`. Browser akan langsung membukanya.

> ⚠️ **Kekurangan**: protokol `file://` di beberapa browser memblokir autoplay audio. Pakai opsi 2 atau 3 di bawah kalau suara tidak keluar.

### Opsi 2 — Live Server (VS Code)

1. Install extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) di VS Code.
2. Klik kanan `index.html` → **Open with Live Server**.
3. Browser akan otomatis terbuka di `http://127.0.0.1:5501` (port sudah dikonfigurasi di [`.vscode/settings.json`](./.vscode/settings.json)).

### Opsi 3 — HTTP Server Sederhana

```powershell
# Pakai Python (kalau sudah terinstall)
python -m http.server 8080
# Lalu buka: http://localhost:8080
```

```powershell
# Atau pakai Node.js + npx
npx serve .
```

```powershell
# Atau pakai PHP
php -S localhost:8080
```

---

## 🎮 Mekanik Game

### Tabel Simbol & Nilai

| ID | Simbol | Nilai (`val`) | Frekuensi Muncul (Mode NORMAL) |
|---:|:---:|---:|---|
| 0 | 💎 Diamond | 0.25 | ~18% (paling sering) |
| 1 | 🟩 Green Gem | 0.40 | ~16% |
| 2 | 🟡 Yellow Gem | 0.50 | ~14% |
| 3 | 🔻 Red Gem | 0.80 | ~12% |
| 4 | ❤️ Heart | 1.00 | ~10% |
| 5 | 🏆 Trophy | 1.50 | ~9% |
| 6 | 💍 Ring | 2.00 | ~8% |
| 7 | ⏳ Hourglass | 5.00 | ~7% |
| 8 | 👑 Crown | 20.00 | ~6% (paling langka) |

> Frekuensi di atas hanya berlaku saat mode `NORMAL`. Mode `MAXWIN` & `RUNGKAD` memanipulasi distribusi ini.

### Tabel Multiplier Orb

Saat tumble berlangsung, ada **~3% peluang muncul Multiplier Orb** per sel. Warna orb menunjukkan kelas pengali:

| Warna Orb | Nilai Pengali | Tampilan |
|:---:|:---:|:---|
| 🟢 `orb-green` | x2, x3, x5, x8 | Hijau menyala |
| 🟣 `orb-purple` | x10, x15, x25, x50 | Ungu menyala |
| 🔴 `orb-red` | x100, x500 | Merah menyala (jackpot vibes) |

**Cara kerja**: kalau ada kemenangan **DAN** ada orb di grid saat tumble selesai, semua nilai orb dijumlahkan, lalu dikalikan ke total kemenangan. Contoh: menang Rp 10.000, ada orb 5x + 10x → final = 10.000 × 15 = **Rp 150.000**.

### Aturan Menang

- **Cluster pay**: ≥ 8 simbol sejenis muncul di grid (posisi bebas, tidak harus segaris).
- **Bonus jumlah simbol**:
  - 10–11 simbol → payout × 1.5
  - ≥ 12 simbol → payout × 2
- **Rumus payout dasar**: `val × (bet / 2)` (per cluster, sebelum bonus & multiplier).

### Sistem Tumble

```
1. Spin → grid diisi simbol acak (shuffle visual 2 detik)
2. Cek cluster ≥ 8 simbol sejenis
3. Kalau ada:
   a. Border simbol menang berkedip (anim-win-border)
   b. Simbol pecah satu-satu (anim-explode, urutan acak)
   c. Gravity: simbol di atasnya turun
   d. Refill: cell kosong diisi simbol baru
   e. Ulangi dari langkah 2 (rekursif)
4. Kalau tidak ada:
   a. Cek total multiplier orb di grid
   b. Kalau menang DAN ada orb → kemenangan × total orb → trigger Big Win modal
   c. Kalau kalah → tampilkan "RUNGKAD!"
```

### Level Big Win

Modal pop-up otomatis muncul saat menang × multiplier. Judul disesuaikan dengan besar pengali:

| Total Multiplier | Judul Modal |
|:---:|:---|
| 2x–49x | 🏆 BIG WIN |
| 50x–99x | 💫 MEGA WIN |
| 100x–499x | ⭐ SENSATIONAL |
| ≥ 500x | ⚡ MAX WIN |

---

## ⚙️ Mode Admin (Edukasi)

Klik tombol **⚙️** di pojok kanan bawah untuk membuka panel admin. Ada 3 mode:

| Mode | Perilaku | Tujuan Edukasi |
|---|---|---|
| **NORMAL** | RNG murni — distribusi seperti tabel simbol di atas. | Tunjukkan bahwa game slot "wajar" pun tetap rugi karena house edge & RTP < 100%. |
| **⚡ MAXWIN** | Peluang Crown (👑) naik drastis, orb 100x sering muncul. | Mensimulasikan "fase pancing" — bandar sengaja kasih menang besar di awal supaya pemain ketagihan & deposit lebih banyak. |
| **💀 RUNGKAD** | Hanya simbol murah (id 0–4), **tidak pernah** muncul multiplier. | Mensimulasikan "fase sedot" — sistem sengaja dibuat kalah terus setelah pemain deposit besar. |

> **Pesan**: tiga mode ini adalah **bukti** bahwa hasil game slot sepenuhnya bisa dimanipulasi dari sisi server. Kamu tidak pernah "lagi sial" — sistem yang mengatur kapan kamu menang dan kapan rugi.

---

## 🔧 Konfigurasi & Kustomisasi

Semua nilai bisa diubah langsung di [`index.html`](./index.html). Berikut variabel utama dan lokasinya:

| Variabel | Default | Lokasi (line di `index.html`) | Fungsi |
|---|---:|:---:|---|
| `balance` | `5000` | line 695 | Saldo awal pemain |
| `bet` | `200` | line 696 | Taruhan awal |
| `SYMBOLS[].val` | beragam | line 683–693 | Nilai payout tiap simbol |
| Threshold cluster | `>= 8` | line 885 | Minimum simbol sejenis untuk menang |
| Bonus 10+ simbol | `× 1.5` | line 889 | Multiplier bonus jumlah |
| Bonus 12+ simbol | `× 2` | line 890 | Multiplier bonus jumlah |
| Peluang multiplier orb | `> 97` (≈3%) | line 742 | Probabilitas spawn orb |
| Daftar nilai orb | `[2,3,5,8,...,500]` | line 755 | Pool angka pengali |
| Durasi shuffle spin | `20 × 100ms` (2s) | line 848 | Lama animasi pengocokan |
| Volume audio | `0.5` | line 709 | Volume default semua suara |

### Contoh: ubah saldo awal jadi 1 juta

```javascript
// di index.html, sekitar line 695
let balance = 1000000; // semula: 5000
```

---

## 🚢 Deployment ke GitHub Pages

Proyek ini sudah live di custom domain. Kalau mau fork & deploy versimu sendiri:

1. **Fork** repo ini di GitHub.
2. Di repo hasil fork → **Settings** → **Pages**.
3. **Source**: Deploy from branch → pilih `main` / `(root)`.
4. (Opsional) **Custom domain**: edit file `CNAME` dengan domain milikmu. Tanpa custom domain, biarkan file `CNAME` dihapus.
5. Tunggu ~1 menit, refresh — situsmu sudah online di `https://<username>.github.io/Judol-nganu-v2/`.

### Update setelah edit

```powershell
git add .
git commit -m "feat: deskripsi perubahanmu"
git push origin main
```

GitHub Pages otomatis re-deploy dalam ~30 detik.

---

## 🤝 Kontribusi

Pull request disambut, terutama untuk:

- Animasi tambahan / efek visual.
- Penambahan simbol atau mode admin baru (mis. mode "Pinjol Trap").
- Terjemahan ke bahasa daerah (Jawa, Sunda, dll) untuk jangkauan edukasi lebih luas.
- Aksesibilitas (ARIA labels, kontras warna).

**Alur**:

```powershell
# 1. Fork & clone
git clone https://github.com/<username>/Judol-nganu-v2.git
cd Judol-nganu-v2

# 2. Buat branch fitur
git checkout -b feat/nama-fitur

# 3. Edit, commit, push
git add .
git commit -m "feat: deskripsi singkat"
git push origin feat/nama-fitur

# 4. Buka Pull Request di GitHub
```

---

## 📜 Lisensi

Distributed under the **MIT License**. Lihat file [`LICENSE`](./LICENSE) untuk detail.

Singkatnya: bebas dipakai, dimodifikasi, didistribusikan ulang — asalkan tetap mencantumkan kredit author asli & tidak menghapus notice lisensi.

---

## 💬 Pesan Penutup

> **Judol bukan jalan keluar. Judol adalah lubang.**
>
> Setiap kali simbol Crown muncul di layar slot beneran, ingat: itu bukan keberuntungan — itu adalah sistem yang sudah dirancang untuk menghisap uangmu pelan-pelan. Bandar tidak pernah rugi.
>
> Kalau kamu atau temanmu sedang terjebak judi online, hubungi:
> - **Halo Kemenkes**: 1500-567
> - **SEJIWA (Kemenkes)**: 119 ext. 8
> - **Yayasan Pulih**: pulih.or.id
>
> Sayangi dirimu. Sayangi keluargamu. **Stop judol.**

---

<p align="center">
  Dibuat dengan ❤️ oleh <a href="https://github.com/03Web">@03Web</a> · Untuk edukasi, bukan untuk taruhan.
</p>
