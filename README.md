<div align="center">

# ☁️ Cloud Storage

**Aplikasi Penyimpanan File Berbasis Cloud yang Cepat, Aman, dan Modern.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://cloud-file-storage.pages.dev)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)

[Lihat Demo Live](https://cloud-file-storage.pages.dev) · [Laporkan Bug](https://github.com/asynclab-me/cloud-file-storage/issues) · [Ajukan Fitur](https://github.com/asynclab-me/cloud-file-storage/issues)

</div>

---

## 📖 Tentang Project

**Cloud Storage** adalah aplikasi web penyimpanan file personal berbasis *cloud* yang dibangun tanpa *framework* berat (*Vanilla Web Stack*) dan ditenagai oleh **Supabase** sebagai *Backend-as-a-Service*. Aplikasi ini memungkinkan pengguna untuk mendaftar, mengelola sesi autentikasi secara aman, serta mengunggah, mengunduh, dan menghapus file pribadi dari perangkat desktop maupun ponsel.

---

## ✨ Fitur Utama

- **🔐 Autentikasi & Proteksi Rute** — Sistem registrasi, login, dan logout terintegrasi dengan **Supabase Auth**, dilengkapi validasi sesi otomatis (`requireAuth`) di halaman dashboard.
- **📤 Upload File & Validasi Cerdas** — Mendukung berbagai format dokumen dan media (`PDF`, `JPG`, `PNG`, `WEBP`, `TXT`, `DOCX`, `XLSX`, `PPTX`, `ZIP`) dengan batas ukuran maksimal **10 MB** serta penamaan file unik berbasis `UUID` untuk mencegah tabrakan nama file.
- **🔗 Download Aman (*Signed URL*)** — File disimpan secara privat di bucket Supabase Storage dan diakses menggunakan tautan sementara (*Signed URL*) yang berlaku selama 60 detik.
- **🧹 Sinkronisasi Storage & Database** — Penghapusan file menghapus objek fisik di *Storage* sekaligus metadata di *Database*, dilengkapi mekanisme *auto-cleanup* jika proses pencatatan metadata gagal saat upload.
- **🎨 UI/UX Modern & Responsif** — Antarmuka bersih dengan *sticky glassmorphism navbar*, tipografi gradasi animatif, serta tata letak adaptif yang nyaman di layar desktop maupun *smartphone*.

---

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Custom Properties, Flexbox, Grid, Keyframe Animations), Vanilla JavaScript (ES6+) |
| **Backend & Auth** | Supabase Auth, Supabase PostgreSQL Database, Supabase Storage |
| **Deployment** | Cloudflare Pages (CI/CD otomatis dari GitHub) |

---

## 📂 Struktur Project

```text
cloud-file-storage/
├── css/
│   └── style.css          # Styling global, animasi UI, dan aturan responsif
├── js/
│   ├── config.js          # Inisialisasi koneksi Supabase Client
│   ├── auth.js            # Logika register, login, logout, dan proteksi sesi
│   ├── storage.js         # Validasi file, upload, signed URL, dan hapus storage
│   ├── files.js           # Operasi CRUD metadata file ke database PostgreSQL
│   └── app.js             # Kontroler utama antarmuka dan event dashboard
├── index.html             # Halaman utama (Landing Page)
├── login.html             # Halaman masuk pengguna
├── register.html          # Halaman pendaftaran akun baru
├── dashboard.html         # Halaman manajemen file pengguna
└── README.md              # Dokumentasi project

⚙️ Konfigurasi Supabase
Untuk menjalankan project ini dengan instance Supabase milikmu sendiri, siapkan tabel database dan storage bucket berikut:
1. Buat Tabel files di SQL Editor
create table public.files (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  file_name text not null,
  storage_path text not null,
  file_size bigint not null,
  mime_type text null,
  created_at timestamp with time zone not null default now(),
  constraint files_pkey primary key (id)
);

alter table public.files enable row level security;

2. Buat Storage Bucket
 * Buka menu Storage di dashboard Supabase.
 * Buat bucket baru bernama files (set sebagai Private).
 * Atur RLS Policies pada tabel files dan bucket files agar setiap pengguna hanya dapat mengakses data miliknya sendiri (auth.uid() = user_id).
🚀 Cara Menjalankan Secara Lokal
 * Clone repository ini
   git clone [https://github.com/asynclab-me/cloud-file-storage.git](https://github.com/asynclab-me/cloud-file-storage.git)
cd cloud-file-storage

 * Sesuaikan konfigurasi Supabase
   Buka file js/config.js dan masukkan Project URL serta Publishable / Anon Key milikmu:
   const SUPABASE_URL = "[https://your-project-id.supabase.co](https://your-project-id.supabase.co)";
const SUPABASE_ANON_KEY = "your-publishable-key";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

 * Jalankan di Browser
   Buka index.html menggunakan ekstensi Live Server di VS Code atau web server lokal pilihanmu.
👨‍💻 Author
Dikembangkan oleh asynclab-me
