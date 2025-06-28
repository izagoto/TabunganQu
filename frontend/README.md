# TabunganQu

TabunganQu adalah aplikasi dashboard manajemen keuangan pribadi berbasis web, dibuat dengan React, Material Tailwind, Vite, Node.js, Express, dan PostgreSQL. Aplikasi ini memudahkan Anda mencatat pemasukan, pengeluaran, hutang/piutang, tagihan, serta mengelola akun dan laporan keuangan secara modern dan responsif.

## Fitur Utama
- **Autentikasi:** Login, register, logout, proteksi route (JWT).
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
- **Frontend:**
  - React 18
  - Material Tailwind React
  - Tailwind CSS
  - Vite
  - React Router DOM
  - Heroicons
- **Backend:**
  - Node.js + Express
  - Sequelize ORM
  - PostgreSQL
  - JWT, bcryptjs, dotenv, cors

## Struktur Folder
```
TabunganQu/
  ├── frontend/
  │   ├── public/
  │   ├── src/
  │   │   ├── pages/
  │   │   │   └── dashboard/   # Semua halaman fitur utama
  │   │   ├── layouts/         # Layout utama dashboard
  │   │   ├── widgets/         # Komponen UI (cards, charts, layout)
  │   │   ├── context/         # State global (sidebar, theme, dsb)
  │   │   ├── data/            # Data dummy
  │   │   └── ...
  │   ├── package.json
  │   └── ...
  ├── backend/
  │   ├── src/
  │   │   ├── controllers/
  │   │   ├── models/
  │   │   ├── routes/
  │   │   ├── middlewares/
  │   │   ├── config/
  │   │   └── app.js
  │   ├── .env
  │   ├── package.json
  │   └── ...
  └── ...
```

## Cara Instalasi & Menjalankan
### 1. **Clone repo:**
```bash
git clone <repo-url>
cd TabunganQu
```

### 2. **Setup & Jalankan Backend**
```bash
cd backend
npm install
# Edit file .env sesuai koneksi PostgreSQL Anda
npm run dev # atau npx nodemon src/app.js
```
Contoh file `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tabunganqu
DB_USER=postgres
DB_PASS=postgres
JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=1d
```

### 3. **Setup & Jalankan Frontend**
```bash
cd ../frontend
npm install
npm run dev
```
Akses aplikasi di [http://localhost:5173](http://localhost:5173)

## Build & Deploy
- Build frontend: `npm run build` (folder dist/)
- Deploy backend: pastikan environment dan database sudah sesuai

## API Endpoint Utama
- **Auth:**
  - POST `/api/auth/register` (register)
  - POST `/api/auth/login` (login)
- **AccountBank:** `/api/accounts` (CRUD)
- **Category:** `/api/categories` (CRUD)
- **Income:** `/api/incomes` (CRUD)
- (Lihat kode backend untuk endpoint lain)
