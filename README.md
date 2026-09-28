Cloud File Storage

Cloud File Storage sederhana yang dibuat sebagai project pembelajaran dan portfolio.

Fitur

- Register
- Login
- Logout
- Upload file
- Menampilkan daftar file
- Download file
- Delete file
- Private Supabase Storage
- Row Level Security
- Validasi ukuran file
- Validasi tipe file

Teknologi

- HTML
- CSS
- JavaScript
- Supabase
- GitHub
- Cloudflare
- Squircle Ce

Struktur Project

cloud-file-storage/
│
├── index.html
├── login.html
├── register.html
├── dashboard.html
│
├── css/
│   └── style.css
│
└── js/
    ├── config.js
    ├── auth.js
    ├── storage.js
    ├── files.js
    └── app.js

Database

Project menggunakan Supabase Database dengan tabel:

files

Data yang disimpan meliputi:

- user ID
- nama file
- storage path
- ukuran file
- MIME type
- waktu upload

Storage

File disimpan pada Supabase Storage menggunakan struktur:

files/{user_id}/{random_file_name}

Bucket Storage dibuat sebagai private bucket.

Security

Project menggunakan:

- Supabase Authentication
- Row Level Security
- Storage Policies
- Private Storage Bucket

Setiap pengguna hanya dapat mengakses file miliknya sendiri.

Status

Project masih dalam tahap pengembangan.
