# 📂 DataLoop — Penjelasan Lengkap Semua File & Folder

> Dokumen ini menjelaskan **setiap file dan folder** dalam proyek DataLoop secara teknis dan mudah dipahami.
> Dibuat untuk membantu developer baru maupun pemilik proyek memahami peran masing-masing bagian kode.

---

## 🗂️ Gambaran Besar Struktur

```
C:\DataLoop\Website\
├── frontend/       → Aplikasi Next.js (yang dilihat user di browser)
├── backend/        → Server API Express.js (logika bisnis & database)
├── database/       → Skema SQL dan file migrasi database
├── .eslintrc.json  → Aturan kualitas kode
├── .gitignore      → File yang tidak dikirim ke Git
└── .prettierrc     → Aturan format penulisan kode
```

---

## ⚙️ File Root (Level Paling Atas)

### `.gitignore`
**Teknis:** File konfigurasi Git yang mendefinisikan pola file/folder mana yang **tidak akan di-commit** ke repository.
**Mudah dipahami:** Daftar "file rahasia atau tidak penting" yang tidak boleh diunggah ke GitHub. Contohnya: file `.env` (berisi password), folder `node_modules` (terlalu besar), dan folder `.next` (hasil build otomatis).

---

### `.prettierrc`
**Teknis:** File konfigurasi Prettier — code formatter otomatis. Mendefinisikan aturan seperti ukuran indentasi, penggunaan single/double quote, panjang baris maksimum, dan trailing comma.
**Mudah dipahami:** "Aturan tata tulis kode" agar semua developer di tim menulis kode dengan gaya yang sama. Misalnya: selalu pakai tanda kutip tunggal, indentasi 2 spasi, selalu ada koma di akhir baris terakhir object.

---

### `.eslintrc.json`
**Teknis:** File konfigurasi ESLint — static analysis tool untuk mendeteksi bug dan masalah kode sebelum dijalankan. Mendefinisikan rules seperti `no-unused-vars`, `no-console`, dan integrasi dengan TypeScript.
**Mudah dipahami:** "Polisi kode" yang otomatis mendeteksi kesalahan penulisan sebelum kamu menjalankan programnya. Misalnya: variabel yang dideklarasikan tapi tidak dipakai, atau import yang salah.

---

---

## 🗄️ Folder `database/`

Folder ini berisi seluruh definisi struktur database PostgreSQL. Tidak ada logika aplikasi di sini — murni SQL.

---

### `database/schema.sql`
**Teknis:** DDL (Data Definition Language) lengkap — berisi semua perintah `CREATE TABLE`, `CREATE INDEX`, dan `ALTER TABLE` yang mendefinisikan seluruh struktur database DataLoop dari awal.
**Mudah dipahami:** "Cetak biru" database. Kalau kamu mau setup database baru dari nol, file inilah yang dijalankan pertama. Isinya semua tabel: users, surveys, targeting, distribution, responses, qc_results, points.

---

### `database/seed.sql`
**Teknis:** DML (Data Manipulation Language) berisi perintah `INSERT INTO` dengan data dummy/dummy data untuk mengisi database kosong agar bisa langsung digunakan saat development dan testing.
**Mudah dipahami:** "Data contoh" untuk keperluan development. Misalnya: 5 akun researcher dummy, 10 akun respondent dummy, 3 survey contoh. Jadi kamu tidak perlu input data manual setiap kali reset database.

---

### `database/migrations/`
**Teknis:** Folder berisi file SQL yang dieksekusi secara berurutan (incremental) untuk mengubah struktur database dari satu versi ke versi berikutnya. Setiap file memiliki nomor urut sebagai prefix.
**Mudah dipahami:** "Riwayat perubahan database". Kalau suatu hari kamu perlu tambah kolom baru atau ubah tabel, kamu tidak mengedit `schema.sql` langsung — tapi buat file migration baru. Ini memastikan semua anggota tim punya database yang sama persis.

| File | Isi |
|---|---|
| `001_create_users.sql` | Buat tabel `users` dan `respondent_profiles` |
| `002_create_surveys.sql` | Buat tabel `surveys` |
| `003_create_targeting.sql` | Buat tabel `survey_targeting` |
| `004_create_distribution.sql` | Buat tabel `survey_distribution` |
| `005_create_responses.sql` | Buat tabel `responses` |
| `006_create_qc_results.sql` | Buat tabel `qc_results` |
| `007_create_points.sql` | Buat tabel `points` |

---

---

## ⚙️ Folder `backend/`

Server Express.js yang menangani semua request dari frontend. Ini adalah "otak" aplikasi yang berinteraksi langsung dengan database.

---

### File Root Backend

#### `backend/server.ts`
**Teknis:** Entry point aplikasi Node.js. File ini membuat instance HTTP server, memulai koneksi database, lalu menjalankan app Express pada port yang dikonfigurasi.
**Mudah dipahami:** "Tombol ON" server backend. Ini file pertama yang dijalankan saat kamu ketik `npm run dev` di backend. Semua dimulai dari sini.

#### `backend/src/app.ts`
**Teknis:** Konfigurasi utama aplikasi Express — tempat middlewares global dipasang (cors, json parser, rate limiter), semua router dari modules di-mount ke path `/api/...`, dan error handler global didaftarkan.
**Mudah dipahami:** "Pusat kontrol" backend. `server.ts` menghidupkan server, tapi `app.ts` yang mengatur: "kalau ada request ke `/api/auth`, kirim ke modul auth. Kalau ada error, tangani begini."

#### `backend/package.json`
**Teknis:** Manifest proyek Node.js yang mendefinisikan: nama proyek, versi, daftar dependencies (express, pg, bcrypt, jsonwebtoken, dll), devDependencies (typescript, ts-node, nodemon), dan script (`start`, `dev`, `build`).
**Mudah dipahami:** "Daftar belanja" library yang dibutuhkan backend. Saat kamu jalankan `npm install`, Node.js membaca file ini dan mengunduh semua yang diperlukan.

#### `backend/tsconfig.json`
**Teknis:** Konfigurasi TypeScript compiler untuk backend — mendefinisikan target ES version, module system (CommonJS), strict mode, paths alias, dan direktori output kompilasi.
**Mudah dipahami:** "Pengaturan bahasa" untuk TypeScript di backend. Memberitahu compiler TypeScript: "compile ke versi JavaScript apa, seberapa ketat pengecekan tipenya, simpan hasilnya di mana."

#### `backend/.env`
**Teknis:** File environment variables untuk development lokal — berisi nilai sensitif seperti `DATABASE_URL`, `JWT_SECRET`, `PORT`, dan konfigurasi lainnya yang berbeda per environment.
**Mudah dipahami:** "File rahasia" berisi password database, secret token JWT, dan konfigurasi sensitif lainnya. File ini **tidak boleh diunggah ke GitHub** (sudah ada di `.gitignore`).

#### `backend/.env.example`
**Teknis:** Template file `.env` tanpa nilai aktual — hanya berisi nama variabel dengan nilai kosong atau contoh. Ini yang di-commit ke repository sebagai panduan setup environment.
**Mudah dipahami:** "Panduan" bagi developer lain tentang variabel apa saja yang perlu diisi di `.env` mereka. Contoh isi: `DATABASE_URL=`, `JWT_SECRET=`, `PORT=5000`.

---

### `backend/src/config/`

Folder konfigurasi — pengaturan koneksi dan infrastruktur dasar server.

#### `db.ts`
**Teknis:** Inisialisasi PostgreSQL connection pool menggunakan library `pg`. Mengekspor instance `Pool` yang akan digunakan oleh semua model di seluruh aplikasi untuk menjalankan query ke database.
**Mudah dipahami:** "Kabel penghubung" antara backend dan database. File ini yang membuat dan mengelola koneksi ke PostgreSQL. Semua file lain yang butuh akses database akan import dari sini.

#### `env.ts`
**Teknis:** Validasi dan parsing environment variables menggunakan library seperti `zod` atau `dotenv`. Mengekspor objek typed yang berisi semua config, sehingga error langsung terdeteksi saat server startup jika ada variabel yang hilang.
**Mudah dipahami:** "Penjaga konfigurasi". Saat server dinyalakan, file ini memeriksa apakah semua variabel penting (database URL, JWT secret, dll) sudah ada. Kalau ada yang kurang, server langsung error dengan pesan yang jelas.

#### `cors.ts`
**Teknis:** Konfigurasi CORS (Cross-Origin Resource Sharing) — mendefinisikan domain mana yang boleh mengirim request ke API ini, method HTTP apa yang diizinkan, dan header apa yang diperbolehkan.
**Mudah dipahami:** "Penjaga gerbang" yang memastikan hanya website DataLoop (frontend) yang boleh mengakses API ini. Mencegah website random lain untuk menyalahgunakan API kamu.

---

### `backend/src/middleware/`

Middleware adalah kode yang berjalan **di antara** request masuk dan handler yang menanganinya. Seperti "pos pemeriksaan" sebelum request sampai ke tujuan.

#### `authenticate.ts`
**Teknis:** Middleware JWT (JSON Web Token) verifikasi — mengekstrak token dari header `Authorization: Bearer <token>`, memverifikasi signature dan expiry menggunakan `jwt.verify()`, lalu attach data user ke `req.user` untuk digunakan handler selanjutnya.
**Mudah dipahami:** "Pemeriksa KTP". Setiap request ke endpoint yang butuh login akan diperiksa di sini: "Apakah kamu sudah login? Apakah token kamu masih valid?" Kalau tidak, langsung ditolak dengan status 401.

#### `roleGuard.ts`
**Teknis:** Middleware RBAC (Role-Based Access Control) — memeriksa `req.user.role` setelah autentikasi berhasil, lalu memvalidasi apakah role tersebut memiliki izin untuk mengakses endpoint yang diminta.
**Mudah dipahami:** "Penjaga area khusus". Setelah `authenticate.ts` memastikan kamu sudah login, `roleGuard.ts` mengecek: "Apakah kamu researcher atau respondent?" Misalnya, endpoint create survey hanya boleh diakses researcher.

#### `errorHandler.ts`
**Teknis:** Global error handling middleware Express (4 parameter: `err, req, res, next`). Menangkap semua error yang di-throw dari handler manapun, memetakannya ke HTTP status code yang tepat, dan mengembalikan response JSON terstruktur.
**Mudah dipahami:** "Jaring pengaman" untuk semua error. Kalau ada error di mana saja di backend (database error, validasi gagal, dll), file ini yang menangkapnya dan mengembalikan pesan error yang rapi ke frontend — bukan error mentah yang membingungkan.

#### `rateLimiter.ts`
**Teknis:** Middleware berbasis `express-rate-limit` yang membatasi jumlah request dari satu IP address dalam window waktu tertentu (misalnya: max 100 request per 15 menit). Mencegah abuse dan DoS attacks.
**Mudah dipahami:** "Pembatas kecepatan". Mencegah seseorang mengirim ribuan request sekaligus ke server (baik disengaja untuk menyerang, maupun karena bug infinite loop di frontend). Kalau melebihi batas, request ditolak sementara.

---

### `backend/src/modules/`

Inti dari backend. Setiap modul = satu domain bisnis. Setiap modul punya 4 lapisan yang konsisten: **model → service → controller → routes**.

> **Pola alur request:**
> `HTTP Request` → `routes` → `controller` → `service` → `model` → `Database`

---

#### 🔐 Modul `auth/`

| File | Peran | Penjelasan |
|---|---|---|
| `auth.routes.ts` | Router | Mendaftarkan endpoint: `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/me`. Menentukan middleware mana yang dijalankan sebelum controller. |
| `auth.controller.ts` | Controller | Menerima HTTP request, mengekstrak data dari `req.body`, memanggil service, lalu mengembalikan HTTP response. Tidak boleh ada logika bisnis di sini. |
| `auth.service.ts` | Service (**logika bisnis**) | Tempat logika utama: cek apakah email sudah terdaftar, hash password, buat JWT token, verifikasi kredensial login. Inilah "otak" modul auth. |
| `auth.middleware.ts` | Middleware spesifik | Middleware khusus auth seperti verifikasi refresh token atau session check yang spesifik untuk modul ini saja. |
| `auth.validator.ts` | Validator | Validasi request body menggunakan Zod/Joi: pastikan email formatnya benar, password minimal 8 karakter, dll. Dijalankan sebelum masuk controller. |

---

#### 👤 Modul `user/`

| File | Peran | Penjelasan |
|---|---|---|
| `user.model.ts` | Model | Berisi fungsi-fungsi query SQL langsung ke tabel `users` dan `respondent_profiles`. Contoh: `findById(id)`, `updateProfile(id, data)`. |
| `user.service.ts` | Service | Logika bisnis user: get profil lengkap, update data onboarding respondent, dll. Layer ini yang memanggil model. |
| `user.controller.ts` | Controller | Handler HTTP untuk endpoint user: `GET /api/users/me`, `PUT /api/users/profile`. |
| `user.routes.ts` | Router | Pendaftaran route user dengan middleware `authenticate` — semua endpoint user butuh login. |

---

#### 📋 Modul `survey/`

| File | Peran | Penjelasan |
|---|---|---|
| `survey.model.ts` | Model | Query SQL untuk tabel `surveys`: `create`, `findById`, `findByResearcherId`, `updateStatus`. |
| `survey.service.ts` | Service | Logika bisnis survey: buat survey baru (validasi data, set status 'draft'), publish survey, ambil daftar survey milik researcher. |
| `survey.controller.ts` | Controller | Handler: `POST /api/surveys`, `GET /api/surveys`, `GET /api/surveys/:id`, `PATCH /api/surveys/:id/status`. |
| `survey.routes.ts` | Router | Route survey dengan role guard: hanya researcher yang bisa create/update survey. |
| `survey.validator.ts` | Validator | Validasi payload create survey: title wajib ada, form_link harus URL valid, target_count harus angka positif. |

---

#### 🎯 Modul `targeting/`

| File | Peran | Penjelasan |
|---|---|---|
| `targeting.model.ts` | Model | Query SQL untuk tabel `survey_targeting`. Query krusial: filter users dari `respondent_profiles` berdasarkan kriteria (usia, gender, lokasi). |
| `targeting.service.ts` | Service | Algoritma matching: ambil kriteria targeting, query respondent yang memenuhi syarat, hitung jumlah match, simpan konfigurasi targeting. |
| `targeting.controller.ts` | Controller | Handler: `POST /api/surveys/:id/targeting`, `GET /api/surveys/:id/targeting/match-count`. |
| `targeting.routes.ts` | Router | Route targeting — hanya researcher yang bisa mengatur targeting surveynya. |

---

#### 📡 Modul `distribution/`

| File | Peran | Penjelasan |
|---|---|---|
| `distribution.model.ts` | Model | Query SQL untuk tabel `survey_distribution`. Menyimpan relasi: survey mana, respondent siapa, status apa. |
| `distribution.service.ts` | Service | Logika distribusi: ambil eligible respondents dari targeting, buat record distribution untuk setiap respondent, update status survey menjadi 'active'. |
| `distribution.controller.ts` | Controller | Handler: `POST /api/surveys/:id/distribute` (mulai distribusi), `GET /api/surveys/:id/distribution` (lihat status per respondent). |
| `distribution.routes.ts` | Router | Route distribusi — researcher yang memulai, tapi respondent yang membaca daftar survey yang di-assign kepadanya. |

---

#### 📝 Modul `response/`

| File | Peran | Penjelasan |
|---|---|---|
| `response.model.ts` | Model | Query SQL untuk tabel `responses`: insert submission baru, find by survey, find by respondent. |
| `response.service.ts` | Service | Logika submit: validasi respondent memang di-assign ke survey ini, simpan response, trigger QC check otomatis, update status distribution. |
| `response.controller.ts` | Controller | Handler: `POST /api/responses` (submit jawaban + bukti), `GET /api/surveys/:id/responses` (researcher lihat semua respons). |
| `response.routes.ts` | Router | Route response dengan guard: respondent bisa submit, researcher bisa lihat. |

---

#### 🔍 Modul `quality-control/`

| File | Peran | Penjelasan |
|---|---|---|
| `qc.model.ts` | Model | Query SQL untuk tabel `qc_results`: insert hasil QC, update status, ambil hasil per survey. |
| `qc.service.ts` | Service | **Algoritma QC**: hitung skor berdasarkan durasi pengerjaan (apakah terlalu cepat?), kelengkapan (completion rate 100%?), konsistensi jawaban. Tentukan status: valid/suspicious/rejected. |
| `qc.controller.ts` | Controller | Handler: `GET /api/surveys/:id/qc` (researcher lihat hasil QC), `PATCH /api/qc/:id` (researcher override hasil QC manual). |
| `qc.routes.ts` | Router | Route QC — hanya bisa diakses researcher untuk survey miliknya. |

---

#### 🏆 Modul `points/`

| File | Peran | Penjelasan |
|---|---|---|
| `points.model.ts` | Model | Query SQL untuk tabel `points`: insert transaksi poin baru, sum total poin per user, ambil history transaksi. |
| `points.service.ts` | Service | Logika poin: dipanggil otomatis setelah QC lulus, hitung jumlah poin dari konfigurasi survey, catat transaksi. |
| `points.controller.ts` | Controller | Handler: `GET /api/points` (respondent lihat saldo dan history poin). |
| `points.routes.ts` | Router | Route points — hanya respondent yang bisa melihat poin mereka sendiri. |

---

### `backend/src/utils/`

Fungsi-fungsi helper yang dipakai bersama oleh banyak modul.

| File | Penjelasan |
|---|---|
| `generateToken.ts` | Wrapper untuk `jsonwebtoken` — fungsi `signToken(payload)` dan `verifyToken(token)`. Memastikan semua JWT dibuat dengan secret dan expiry yang konsisten. |
| `hashPassword.ts` | Wrapper untuk `bcrypt` — fungsi `hash(password)` dan `compare(password, hash)`. Mengabstraksi detail implementasi hashing agar mudah diganti kalau library berubah. |
| `apiResponse.ts` | Helper untuk membuat response HTTP yang konsisten — `success(res, data, code)` dan `error(res, message, code)`. Memastikan semua response punya format JSON yang sama: `{ success, data, message }`. |
| `logger.ts` | Konfigurasi logger (Winston/Pino) — mencatat semua event penting server: request masuk, error, koneksi database. Lebih terstruktur daripada `console.log` biasa. |

---

### `backend/src/types/express.d.ts`
**Teknis:** TypeScript Declaration file untuk meng-augment (memperluas) tipe bawaan Express. Secara spesifik, menambahkan properti `user` ke interface `Request` milik Express agar `req.user` dikenali TypeScript tanpa error.
**Mudah dipahami:** "Pemberitahuan ke TypeScript" bahwa object `req` (request) punya properti tambahan bernama `user` yang kita tambahkan sendiri lewat middleware `authenticate.ts`. Tanpa ini, TypeScript akan complain setiap kali kita akses `req.user`.

---

---

## 🖥️ Folder `frontend/`

Aplikasi Next.js yang dijalankan di browser user. Menggunakan App Router (Next.js 14+), TypeScript, dan Tailwind CSS.

---

### File Root Frontend

#### `frontend/package.json`
Sama seperti backend — daftar dependencies frontend: `next`, `react`, `tailwindcss`, `axios`, dan library UI lainnya.

#### `frontend/next.config.ts`
**Teknis:** Konfigurasi Next.js — mengatur fitur seperti `experimental.appDir`, `images.domains` (domain gambar yang diizinkan), environment variables yang diekspor ke client, dan konfigurasi webpack kustom.
**Mudah dipahami:** "Pengaturan utama" framework Next.js. Di sini kamu bisa mengatur hal-hal seperti: domain gambar mana yang boleh diload, variabel environment apa yang boleh diakses di browser, dll.

#### `frontend/tailwind.config.ts`
**Teknis:** Konfigurasi Tailwind CSS — mendefinisikan `content` paths untuk purging, `theme.extend` untuk custom colors/fonts/spacing yang sesuai brand DataLoop, dan plugins yang digunakan.
**Mudah dipahami:** "Pengaturan desain sistem". Di sini kamu mendefinisikan warna brand DataLoop (primer, sekunder), font yang dipakai, ukuran spacing, dll. Ini yang membuat Tailwind "tahu" tentang warna khusus DataLoop.

#### `frontend/tsconfig.json`
Konfigurasi TypeScript untuk frontend — sama konsepnya dengan backend, tapi disesuaikan untuk environment browser (target `ES2017`, module `esnext`). Biasanya juga mendefinisikan path alias seperti `@/` yang merujuk ke `src/`.

#### `frontend/postcss.config.js`
**Teknis:** Konfigurasi PostCSS — tool yang memproses CSS. Untuk proyek Tailwind, file ini minimal: hanya mendaftarkan plugin `tailwindcss` dan `autoprefixer`.
**Mudah dipahami:** "Jembatan" antara Tailwind dan browser. PostCSS yang mengubah class Tailwind (`text-blue-500`) menjadi CSS sungguhan, dan menambahkan prefix vendor otomatis (`-webkit-`, `-moz-`) agar kompatibel dengan berbagai browser.

#### `frontend/.env.local` dan `.env.example`
Sama konsepnya dengan backend — `.env.local` berisi variabel seperti `NEXT_PUBLIC_API_URL=http://localhost:5000`. Prefix `NEXT_PUBLIC_` berarti variabel tersebut aman diakses di browser.

---

### `frontend/public/`

Semua file di sini bisa diakses langsung via URL tanpa diproses oleh Next.js.

| Path | Penjelasan |
|---|---|
| `public/favicon.ico` | Ikon kecil yang muncul di tab browser — logo DataLoop berukuran 16x16 atau 32x32 px |
| `public/assets/images/` | Gambar statis: logo DataLoop, gambar hero landing page, ilustrasi onboarding |
| `public/assets/icons/` | File SVG untuk ikon-ikon yang digunakan berulang di UI (ikon survey, ikon poin, dll) |
| `public/assets/fonts/` | File font yang di-host sendiri (`.woff2`) jika tidak menggunakan Google Fonts CDN |

---

### `frontend/src/styles/globals.css`
**Teknis:** Entry point CSS global — berisi Tailwind directives (`@tailwind base/components/utilities`), CSS custom properties (design tokens seperti `--color-primary`), dan style global untuk reset atau elemen HTML dasar.
**Mudah dipahami:** "File CSS utama". Ini satu-satunya file CSS global yang langsung ditulis. Semua styling lain menggunakan Tailwind class. Di sinilah kamu mendefinisikan variabel warna brand DataLoop.

---

### `frontend/src/app/` — Next.js App Router

Setiap folder di sini = URL di browser. Next.js otomatis membuat routing berdasarkan struktur folder ini.

#### File Root App

| File | URL | Penjelasan |
|---|---|---|
| `layout.tsx` | Semua halaman | **Root Layout** — wrapper paling luar yang membungkus SEMUA halaman. Tempat mendaftarkan font global, provider (AuthContext, ToastContext), dan tag `<html>` dan `<body>`. |
| `page.tsx` | `/` | **Landing Page** DataLoop — halaman pertama yang dilihat pengunjung. Berisi hero section, fitur, CTA daftar/login. |
| `not-found.tsx` | Error 404 | Halaman yang tampil ketika user mengakses URL yang tidak ada. |
| `loading.tsx` | Semua halaman | **Global loading UI** — skeleton/spinner yang muncul secara otomatis saat halaman sedang di-fetch (Suspense boundary). |

---

#### Route Group `(auth)/`

> Tanda kurung `(auth)` artinya ini hanya **grup logis** — tidak muncul di URL. URL tetap `/login`, bukan `/auth/login`.

| File | URL | Penjelasan |
|---|---|---|
| `layout.tsx` | `/login`, `/register`, `/onboarding` | Layout khusus halaman auth — biasanya tampilan minimalis, card di tengah layar, tanpa sidebar/navbar dashboard. |
| `login/page.tsx` | `/login` | Halaman login — renders `LoginForm` component dari `features/auth`. |
| `register/page.tsx` | `/register` | Halaman registrasi — renders `RegisterForm`, ada pilihan role (Researcher / Respondent). |
| `onboarding/page.tsx` | `/onboarding` | **Khusus Respondent** — setelah register, respondent wajib mengisi profil (usia, gender, lokasi) untuk keperluan targeting. |

---

#### Route Group `(researcher)/`

> Semua route di sini hanya bisa diakses oleh user dengan role `researcher`. Dijaga oleh middleware/guard.

| File | URL | Penjelasan |
|---|---|---|
| `layout.tsx` | Semua halaman researcher | Layout researcher — berisi `Sidebar` navigasi kiri dan header atas. Semua halaman di bawah ini otomatis punya sidebar. |
| `dashboard/page.tsx` | `/dashboard` | Dashboard utama researcher: ringkasan total survey, total respons, progress distribusi. Ada tombol "Buat Survey Baru". |
| `survey/page.tsx` | `/survey` | Daftar semua survey milik researcher — tampilan list/grid dengan status masing-masing. |
| `survey/create/page.tsx` | `/survey/create` | Form buat survey baru — renders `SurveyForm` component. |
| `survey/[id]/page.tsx` | `/survey/123` | Detail satu survey spesifik — overview, statistik singkat, dan navigasi ke sub-halaman (targeting, distribusi, QC). |
| `survey/[id]/targeting/page.tsx` | `/survey/123/targeting` | Halaman setting targeting — researcher memilih kriteria responden (usia, gender, lokasi). |
| `survey/[id]/distribution/page.tsx` | `/survey/123/distribution` | Halaman distribusi — summary jumlah responden yang cocok, tombol "Mulai Distribusi". |
| `survey/[id]/monitoring/page.tsx` | `/survey/123/monitoring` | Monitoring real-time per responden: siapa yang sudah mengisi, siapa yang belum, progress bar. |
| `survey/[id]/qc/page.tsx` | `/survey/123/qc` | Hasil Quality Control — tabel respons dengan status Valid ✅ / Suspicious ⚠️ / Rejected ❌. |
| `settings/page.tsx` | `/settings` | Profil dan pengaturan akun researcher. |

> **Catatan `[id]`:** Ini adalah **dynamic route** — `[id]` dalam nama folder artinya Next.js akan menangkap nilai apapun di posisi itu dari URL. Nilai ini bisa diakses di component via `params.id`.

---

#### Route Group `(respondent)/`

> Semua route di sini hanya bisa diakses oleh user dengan role `respondent`.

| File | URL | Penjelasan |
|---|---|---|
| `layout.tsx` | Semua halaman respondent | Layout respondent — lebih mobile-friendly, berisi header sederhana dan `BottomNav` (navigasi bawah seperti aplikasi mobile). |
| `home/page.tsx` | `/home` | Dashboard respondent — daftar survey yang tersedia dan sudah di-assign kepada respondent ini. |
| `survey/[id]/page.tsx` | `/survey/123` | Detail survey untuk respondent: estimasi waktu, jumlah poin yang bisa didapat, tombol "Kerjakan". |
| `survey/[id]/submit/page.tsx` | `/survey/123/submit` | Halaman submit bukti — upload screenshot atau konfirmasi bahwa survey Google Form sudah diisi. |
| `points/page.tsx` | `/points` | Halaman poin: saldo poin saat ini dan riwayat poin per survey yang sudah dikerjakan. |
| `profile/page.tsx` | `/profile` | Profil respondent — bisa edit data diri yang digunakan untuk targeting. |

---

### `frontend/src/components/` — Komponen Reusable

Komponen yang dipakai di lebih dari satu tempat dan tidak terikat ke satu fitur spesifik.

---

#### `components/ui/` — Komponen Atom (Design System)

Fondasi visual DataLoop. Komponen-komponen ini **hanya urusan tampilan** — tidak ada API call atau logika bisnis.

| File | Penjelasan |
|---|---|
| `Button.tsx` | Komponen tombol dengan berbagai varian: `primary`, `secondary`, `ghost`, `danger`. Mendukung prop `isLoading` yang menampilkan spinner otomatis. |
| `Input.tsx` | Input teks dengan label, helper text, dan state error (border merah + pesan). Dipakai di semua form. |
| `Textarea.tsx` | Input teks multi-baris — dipakai di form deskripsi survey. |
| `Select.tsx` | Dropdown pilihan — dipakai di filter targeting (gender, lokasi, status). |
| `Badge.tsx` | Label kecil berwarna untuk menampilkan status: `draft` (abu), `active` (hijau), `completed` (biru). |
| `Card.tsx` | Container box dengan shadow dan border radius — wrapper umum untuk konten. |
| `Modal.tsx` | Popup dialog dengan backdrop — untuk konfirmasi aksi penting seperti "Yakin ingin mulai distribusi?" |
| `Tooltip.tsx` | Popup kecil yang muncul saat hover — untuk memberikan penjelasan singkat pada elemen UI. |
| `Spinner.tsx` | Animasi loading berbentuk lingkaran berputar — dipakai di Button (saat submit) dan saat data di-fetch. |
| `ProgressBar.tsx` | Bar progress horizontal — dipakai di monitoring untuk menampilkan progres distribusi (X dari Y responden). |
| `Avatar.tsx` | Gambar profil bulat — menampilkan foto atau inisial nama jika tidak ada foto. |
| `Skeleton.tsx` | Placeholder abu-abu beranimasi yang muncul saat data sedang dimuat — mencegah layout shift. |

---

#### `components/layout/` — Komponen Kerangka Halaman

| File | Penjelasan |
|---|---|
| `Navbar.tsx` | Navigation bar bagian atas — tampil di landing page dan halaman auth. Berisi logo DataLoop dan tombol Login/Register. |
| `Sidebar.tsx` | Panel navigasi kiri khusus **researcher** — berisi menu: Dashboard, Survey, Settings. Highlights menu yang sedang aktif. |
| `BottomNav.tsx` | Navigasi bawah layar khusus **respondent** — seperti tab bar di aplikasi mobile (Home, Poin, Profil). |
| `Footer.tsx` | Footer halaman — ditampilkan di landing page. Berisi copyright dan link penting. |

---

#### `components/shared/` — Komponen Komposit Lintas Fitur

| File | Penjelasan |
|---|---|
| `SurveyCard.tsx` | Card survey yang dipakai di dua tempat: list survey researcher (tampil judul, status, respons count) dan list survey respondent (tampil judul, poin, estimasi waktu). |
| `StatsCard.tsx` | Card statistik angka — dipakai di dashboard researcher (Total Survey: 5, Total Respons: 48, dll). |
| `EmptyState.tsx` | UI yang tampil ketika data kosong — gambar ilustrasi + pesan + tombol aksi. Contoh: "Belum ada survey. Buat yang pertama!" |
| `ErrorBoundary.tsx` | React Error Boundary — menangkap JavaScript error di component tree dan menampilkan fallback UI alih-alih crash seluruh halaman. |
| `RoleGuard.tsx` | Component wrapper yang hanya me-render children-nya jika user punya role yang sesuai. Digunakan untuk menyembunyikan elemen UI berdasarkan role tanpa redirect. |

---

### `frontend/src/features/` — Modul Fitur (Domain Layer)

Ini inti dari frontend. Setiap domain punya folder sendiri yang berisi semua file terkait — komponen, hooks, service, dan types. Self-contained.

---

#### 🔐 `features/auth/`

| File | Penjelasan |
|---|---|
| `components/LoginForm.tsx` | Form UI login: input email & password, tombol submit, link ke register. Menggunakan hook `useAuth`. |
| `components/RegisterForm.tsx` | Form UI registrasi: nama, email, password, pilihan role. Submit → redirect ke onboarding (jika respondent) atau dashboard. |
| `components/OnboardingForm.tsx` | Form isian profil respondent setelah register: usia, gender, domisili, status (mahasiswa/umum). Data ini dipakai untuk targeting. |
| `hooks/useAuth.ts` | Custom hook yang mengekspos: `user` (data user saat ini), `login(email, pass)`, `logout()`, `isLoading`. Membaca state dari `AuthContext`. |
| `services/authService.ts` | Semua API call auth: `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/me`. Menggunakan `lib/api.ts` sebagai HTTP client. |
| `types/auth.types.ts` | TypeScript types: `User`, `UserRole` (`'researcher' \| 'respondent'`), `LoginPayload`, `RegisterPayload`, `AuthSession`. |
| `utils/authHelpers.ts` | Fungsi pembantu: `decodeToken(token)` (baca isi JWT), `isResearcher(user)`, `isRespondent(user)`, `getRedirectPath(role)`. |

---

#### 📋 `features/survey/`

| File | Penjelasan |
|---|---|
| `components/SurveyForm.tsx` | Form create/edit survey: judul, deskripsi, link Google Form, target jumlah responden, poin reward. Punya validasi client-side. |
| `components/SurveyList.tsx` | Komponen list survey untuk researcher — menampilkan semua survey dengan filter status dan tombol aksi. |
| `components/SurveyDetail.tsx` | Tampilan detail satu survey: info lengkap, statistik, dan navigasi ke sub-halaman (targeting, distribusi, monitoring, QC). |
| `components/SurveyStatusBadge.tsx` | Badge kecil yang menampilkan status survey dengan warna: `draft` (abu), `active` (hijau), `completed` (biru). |
| `hooks/useSurvey.ts` | Fetch data satu survey berdasarkan ID. Return: `{ survey, isLoading, error, refetch }`. |
| `hooks/useSurveyList.ts` | Fetch daftar semua survey (untuk researcher). Mendukung filter dan pagination. |
| `services/surveyService.ts` | API calls: `createSurvey()`, `getSurveys()`, `getSurveyById(id)`, `updateSurvey(id, data)`, `publishSurvey(id)`. |
| `types/survey.types.ts` | Types: `Survey`, `SurveyStatus` (`'draft' \| 'active' \| 'completed'`), `CreateSurveyPayload`. |
| `utils/surveyHelpers.ts` | Fungsi: `formatSurveyStatus(status)` → label teks, `getSurveyProgress(survey)` → persentase target terpenuhi. |

---

#### 🎯 `features/targeting/`

| File | Penjelasan |
|---|---|
| `components/TargetingForm.tsx` | Form filter targeting: range slider usia (min-max), dropdown gender, dropdown lokasi, dropdown status mahasiswa/umum. |
| `components/TargetingPreview.tsx` | Komponen yang realtime menampilkan "Estimasi X responden cocok dengan kriteria ini" berdasarkan input TargetingForm. |
| `hooks/useTargeting.ts` | Fetch data targeting yang sudah tersimpan untuk survey tertentu, dan fungsi untuk save targeting baru. |
| `services/targetingService.ts` | API calls: `saveTargeting(surveyId, criteria)`, `getMatchCount(criteria)` (preview jumlah match), `getTargeting(surveyId)`. |
| `types/targeting.types.ts` | Types: `TargetingCriteria` (minAge, maxAge, gender, location, status), `TargetingPreviewResult`. |

---

#### 📡 `features/distribution/`

| File | Penjelasan |
|---|---|
| `components/DistributionSummary.tsx` | Summary card sebelum distribusi dimulai: "Target: 50 responden. Tersedia: 73 yang cocok." Tombol "Mulai Distribusi". |
| `components/RespondentTable.tsx` | Tabel daftar responden yang sudah di-assign: nama, status (assigned/completed/rejected), tanggal assign. Bisa di-filter dan di-sort. |
| `hooks/useDistribution.ts` | Fetch status distribusi untuk survey tertentu, fungsi `startDistribution(surveyId)`. |
| `services/distributionService.ts` | API calls: `startDistribution(surveyId)`, `getDistributionStatus(surveyId)` (list respondent + status mereka). |
| `types/distribution.types.ts` | Types: `DistributionRecord` (surveyId, respondentId, status, assignedAt), `DistributionStatus` enum. |

---

#### 📝 `features/response/`

| File | Penjelasan |
|---|---|
| `components/SurveyFillView.tsx` | Komponen di sisi respondent yang menampilkan link Google Form atau embed form. Ada timer yang mulai berjalan saat halaman dibuka (untuk keperluan QC durasi). |
| `components/ProofUpload.tsx` | Komponen upload bukti pengisian: bisa upload screenshot atau auto-detect via konfirmasi checkmark. Preview gambar sebelum submit. |
| `hooks/useResponse.ts` | Handle state form submit: upload file, kirim proof, track loading state, handle success/error. |
| `services/responseService.ts` | API calls: `submitResponse(surveyId, data)` (termasuk duration dan proof URL), `getMyResponses()` (history respondent). |
| `types/response.types.ts` | Types: `Response` (responseId, surveyId, userId, duration, proofUrl, submittedAt), `SubmitResponsePayload`. |

---

#### 🏆 `features/points/`

| File | Penjelasan |
|---|---|
| `components/PointBalance.tsx` | Komponen besar yang menampilkan total saldo poin respondent saat ini. Biasanya tampil di header atau halaman poin. |
| `components/PointHistoryList.tsx` | List riwayat perolehan poin: nama survey, jumlah poin, tanggal. Mendukung pagination. |
| `hooks/usePoints.ts` | Fetch saldo poin dan riwayat transaksi untuk user yang sedang login. |
| `services/pointsService.ts` | API calls: `getMyPoints()` (saldo total + history). |
| `types/points.types.ts` | Types: `PointTransaction` (amount, sourceSurveyId, createdAt), `PointsSummary` (totalPoints, transactions[]). |

---

#### 🔍 `features/quality-control/`

| File | Penjelasan |
|---|---|
| `components/QCResultTable.tsx` | Tabel hasil QC per respons: nama respondent, durasi, skor QC, status (valid/suspicious/rejected). Researcher bisa override status secara manual. |
| `components/QCStatusBadge.tsx` | Badge kecil untuk status QC: ✅ Valid (hijau), ⚠️ Suspicious (kuning), ❌ Rejected (merah). |
| `hooks/useQC.ts` | Fetch hasil QC untuk survey tertentu. Return: `{ results, isLoading, refetch }`. |
| `services/qcService.ts` | API calls: `getQCResults(surveyId)`, `overrideQCStatus(qcId, status)` (researcher manual override). |
| `types/qc.types.ts` | Types: `QCResult` (qcId, responseId, status, score, notes), `QCStatus` enum (`'valid' \| 'suspicious' \| 'rejected'`). |
| `utils/qcRules.ts` | **Logika QC di sisi frontend** — fungsi client-side untuk validasi awal sebelum submit: `checkMinDuration(seconds)`, `checkCompletionRate(answers)`. Digunakan di `SurveyFillView` sebelum kirim ke backend. |

---

### `frontend/src/hooks/` — Global Hooks

Hooks reusable yang tidak terikat ke fitur manapun.

| File | Penjelasan |
|---|---|
| `useDebounce.ts` | Menunda eksekusi function selama X milidetik setelah input berhenti berubah. Dipakai di search/filter agar tidak kirim request setiap ketikan. Contoh: input targeting preview. |
| `useLocalStorage.ts` | Wrapper `useState` yang otomatis sync ke `localStorage`. Dipakai untuk menyimpan preferensi user (tema, filter terakhir) yang persisten walau halaman di-refresh. |
| `usePagination.ts` | Mengelola state pagination: halaman aktif, jumlah item per halaman, fungsi `nextPage()`, `prevPage()`. Dipakai di `SurveyList`, `RespondentTable`. |
| `useToast.ts` | Hook untuk memunculkan notifikasi toast (pop-up singkat) dari mana saja. Contoh: `toast.success("Survey berhasil dibuat!")`, `toast.error("Terjadi kesalahan")`. |

---

### `frontend/src/lib/` — Infrastruktur & Konfigurasi Library

| File | Penjelasan |
|---|---|
| `api.ts` | Instance Axios terkonfigurasi — base URL ke backend, header `Content-Type: application/json`, request interceptor (attach JWT token otomatis dari storage), response interceptor (handle 401 → redirect ke login). Semua service file import dari sini. |
| `auth.ts` | Helper untuk manajemen session: simpan/baca/hapus token dari cookie atau localStorage, parse user dari token JWT, cek apakah session masih valid. |
| `queryClient.ts` | Konfigurasi React Query (TanStack Query) / SWR client — mengatur cache time, retry policy, dan stale time. Dipakai sebagai provider di root `layout.tsx`. |

---

### `frontend/src/context/` — React Context (Global State)

| File | Penjelasan |
|---|---|
| `AuthContext.tsx` | Context yang menyimpan state user yang sedang login: `{ user, isAuthenticated, isLoading, login, logout }`. Di-wrap di root `layout.tsx` sehingga semua halaman bisa akses state auth. |
| `ToastContext.tsx` | Context untuk sistem notifikasi global. Menyimpan queue toast yang aktif dan fungsi untuk menambah/hapus toast. Dipakai oleh `useToast` hook. |

---

### `frontend/src/types/` — TypeScript Types Global

| File | Penjelasan |
|---|---|
| `api.types.ts` | Type wrapper standar untuk semua response API: `ApiResponse<T>` (`{ success: boolean, data: T, message: string }`), `PaginatedResponse<T>` (tambah `pagination: { page, total, limit }`). |
| `common.types.ts` | Types yang dipakai di mana-mana: `Status` enum, `Pagination` object, `SelectOption` (untuk dropdown), `DateRange`. |
| `index.ts` | Re-export semua types dari folder ini — agar bisa import dengan `import { ApiResponse } from '@/types'` bukan path panjang. |

---

### `frontend/src/constants/` — Konstanta Global

**Aturan penting:** Tidak ada string/angka hardcoded di komponen atau service. Semua nilai tetap harus didefinisikan di sini.

| File | Penjelasan |
|---|---|
| `routes.ts` | Object `ROUTES` berisi semua path URL: `ROUTES.LOGIN = '/login'`, `ROUTES.DASHBOARD = '/dashboard'`, `ROUTES.SURVEY_DETAIL = (id) => /survey/${id}`. Mencegah typo URL yang susah di-debug. |
| `roles.ts` | Enum atau object `ROLES`: `ROLES.RESEARCHER = 'researcher'`, `ROLES.RESPONDENT = 'respondent'`. Dipakai di `RoleGuard`, `useAuth`, `roleGuard` middleware. |
| `status.ts` | Kumpulan enum status yang dipakai di banyak domain: `SURVEY_STATUS`, `DISTRIBUTION_STATUS`, `QC_STATUS`. Dibuat terpusat agar konsisten di frontend dan saat display label. |
| `config.ts` | Konfigurasi aplikasi yang dibaca dari environment: `API_BASE_URL`, `APP_NAME`, feature flags (`ENABLE_QC_OVERRIDE`). Satu-satunya tempat yang boleh akses `process.env`. |

---

### `frontend/src/utils/` — Fungsi Utilitas Murni

Fungsi-fungsi **pure** (tidak ada side effect, tidak ada API call) yang hanya menerima input dan mengembalikan output.

| File | Penjelasan |
|---|---|
| `formatDate.ts` | Fungsi format tanggal: `formatDate(date)` → `"31 Maret 2026"`, `formatRelative(date)` → `"2 jam yang lalu"`. Menggunakan `Intl.DateTimeFormat` dengan locale Indonesia. |
| `formatPoints.ts` | Fungsi format angka poin: `formatPoints(1500)` → `"1.500 poin"`. Bisa juga handle singkatan: `"1,5K poin"`. |
| `cn.ts` | Utility `cn()` (className) — menggabungkan Tailwind class secara kondisional menggunakan `clsx` dan `tailwind-merge`. Mencegah konflik class Tailwind. Contoh: `cn('text-red-500', isActive && 'font-bold')`. |
| `validators.ts` | Skema validasi client-side menggunakan Zod: `loginSchema`, `registerSchema`, `surveySchema`, `targetingSchema`. Digunakan di React Hook Form untuk validasi form sebelum submit. |

---

## 📊 Ringkasan Pola Arsitektur

```
FRONTEND                           BACKEND
─────────────────────────────────  ─────────────────────────────────
page.tsx                           routes.ts
  ↓ renders                          ↓ di-handle oleh
feature/components/*.tsx           controller.ts
  ↓ pakai                            ↓ panggil
feature/hooks/*.ts                 service.ts        ← logika bisnis
  ↓ panggil                          ↓ query ke
feature/services/*.ts  →  API  →   model.ts
  ↓ pakai                            ↓ akses
lib/api.ts                         database/schema.sql
```

---

> 💡 **Prinsip utama:** Setiap lapisan punya tanggung jawab yang jelas dan tidak boleh melampaui batas perannya. Component hanya render. Service hanya HTTP call. Controller hanya terima-kirim HTTP. Service backend hanya logika bisnis. Model hanya query database.
