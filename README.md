# C-137 Archive — Rick and Morty Explorer

Aplikasi eksplorasi karakter dari serial *Rick and Morty*, dibangun dengan **React JS** untuk memenuhi tugas UAS mata kuliah **Kerangka Kerja Pengembangan Antarmuka Website**.

## Deskripsi Proyek

C-137 Archive adalah "arsip antar-dimensi" yang memungkinkan pengguna menjelajahi seluruh karakter dari serial Rick and Morty, menyaring berdasarkan status/spesies, melihat detail lengkap tiap karakter, serta menyimpan karakter favorit ke database pribadi (dengan fitur create, read, update, delete) setelah login.

## API yang Digunakan

[Rick and Morty API](https://rickandmortyapi.com/) — REST API publik gratis tanpa API key, menyediakan data karakter, lokasi, dan episode dari serial Rick and Morty.

## Fitur Utama

- **Daftar karakter (Home)** dengan pencarian nama (debounced) dan pagination
- **Filter kategori** berdasarkan status (Alive/Dead/unknown) dan spesies
- **Halaman detail** karakter: info lengkap, lokasi asal, daftar episode
- **Autentikasi sederhana** (2 akun demo) menggunakan Context API + localStorage
- **Proteksi halaman (middleware)**: halaman Favorit hanya bisa diakses setelah login, dengan redirect otomatis ke `/login`
- **CRUD Favorit**:
  - Create: tambah karakter ke favorit dari halaman Detail
  - Read: lihat semua favorit di halaman Favorit
  - Update: edit catatan pribadi pada tiap favorit
  - Delete: hapus favorit
- **Form & validasi** pada halaman Login (validasi manual: panjang minimum, field wajib)
- **State management**: `useState`, `useEffect`, dan dua React Context (`AuthContext`, `FavoritesContext`)
- Desain responsif bertema "portal antar-dimensi" dengan animasi ringan

## Struktur Halaman dan Routing

| Path | Halaman | Keterangan |
|---|---|---|
| `/` | Home | Daftar seluruh karakter + pencarian + pagination |
| `/kategori` | Category | Filter karakter berdasarkan status & spesies |
| `/karakter/:id` | Detail | Detail satu karakter + tombol tambah/hapus favorit |
| `/login` | Login | Form login dengan validasi |
| `/favorit` | Favorites | **Protected route** — CRUD daftar favorit pengguna |
| `*` | NotFound | Halaman 404 |

## Teknologi

- React 19 + Vite
- React Router DOM v7
- Axios untuk pemanggilan API
- CSS murni (custom design system, tanpa framework CSS)

## Cara Menjalankan Secara Lokal

```bash
# 1. Clone repository
git clone <link-repo-anda>
cd rick-morty-explorer

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev

# 4. Buka di browser
http://localhost:5173
```

Untuk build produksi:

```bash
npm run build
npm run preview
```

## Akun Demo

| Username | Password |
|---|---|
| `rick` | `wubbalubba` |
| `morty` | `aw-geez` |

## Link Live Demo

https://rick-morty-explorer-five.vercel.app/