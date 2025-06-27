# TabunganQu

TabunganQu adalah aplikasi dashboard manajemen keuangan pribadi berbasis web, dibuat dengan React, Material Tailwind, dan Vite. Aplikasi ini memudahkan Anda mencatat pemasukan, pengeluaran, hutang/piutang, tagihan, serta mengelola akun dan laporan keuangan secara modern dan responsif.

## Fitur Utama
- **Autentikasi:** Login & registrasi gratis.
- **Dashboard:** Ringkasan saldo, pemasukan, pengeluaran, dan pertumbuhan keuangan.
- **Pemasukan & Pengeluaran:** Catat dan kelola transaksi harian.
- **Kategori:** Kelola kategori pemasukan/pengeluaran.
- **Rekening & Dompet:** Manajemen akun bank dan dompet digital.
- **Hutang/Piutang:** Pantau hutang dan piutang Anda.
- **Tagihan & Pengingat:** Notifikasi tagihan jatuh tempo dan pengingat keuangan.
- **Laporan Keuangan:** Lihat laporan keuangan bulanan/tahunan.
- **Manajemen User:** (khusus admin) Kelola data user.
- **Pengaturan Akun:** Ubah profil, password, dan backup data.
- **Notifikasi:** Sistem notifikasi tagihan, hutang, dan pengingat.
- **Responsive:** Tampilan mobile & desktop, sidebar otomatis menjadi hamburger menu di mobile.

## Teknologi
- [React 18](https://reactjs.org/)
- [Material Tailwind React](https://www.material-tailwind.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Heroicons](https://heroicons.com/)

## Struktur Folder
```
frontend/
  ├── public/
  ├── src/
  │   ├── pages/
  │   │   └── dashboard/   # Semua halaman fitur utama
  │   ├── layouts/         # Layout utama dashboard
  │   ├── widgets/         # Komponen UI (cards, charts, layout)
  │   ├── context/         # State global (sidebar, theme, dsb)
  │   ├── data/            # Data dummy
  │   └── ...
  ├── package.json
  ├── tailwind.config.cjs
  └── ...
```

## Cara Instalasi & Menjalankan
1. **Clone repo:**
   ```bash
   git clone <repo-url>
   cd TabunganQu/frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
4. **Akses aplikasi:**
   Buka [http://localhost:5173](http://localhost:5173) di browser.

## Build & Deploy
- Build production: `npm run build`
- Preview build: `npm run preview`
- Deploy folder `dist/` ke hosting statis (lihat juga `gen.yaml` jika menggunakan Genezio).

