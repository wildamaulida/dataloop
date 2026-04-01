# 📂 DataLoop — Penjelasan File & Folder

> Dokumen ini menjelaskan setiap file dan folder dalam proyek DataLoop secara sederhana.
> Dibuat untuk membantu developer memahami peran masing-masing bagian kode.

---

## 🗂️ Gambaran Besar Struktur

```
DataLoop/Website/
├── frontend/      → Aplikasi Next.js (tampilan yang dilihat user di browser)
├── backend/       → Server API Express.js (logika bisnis & database)
├── database/      → Skema SQL database
├── .gitignore     → Daftar file yang tidak dikirim ke Git
├── .prettierrc    → Aturan format penulisan kode
└── README.md      → Dokumentasi proyek
```

---

## ⚙️ File Root (Level Paling Atas)

### `.gitignore`
**Mudah dipahami:** Daftar "file yang tidak boleh diunggah ke GitHub". Contoh: file `.env` (berisi password), folder `node_modules` (terlalu besar).

### `.prettierrc`
**Mudah dipahami:** "Aturan tata tulis kode" agar semua developer menulis kode dengan gaya yang sama — misalnya pakai tanda kutip tunggal, indentasi 2 spasi.

### `README.md`
**Mudah dipahami:** Halaman depan proyek. Berisi penjelasan apa itu DataLoop, cara menjalankan project, dan teknologi yang digunakan.

---

## 🗄️ Folder `database/`

### `database/schema.sql`
**Mudah dipahami:** "Cetak biru" database. Berisi perintah SQL untuk membuat semua tabel: users, surveys, targeting, distribution, responses, qc_results, points. Jalankan file ini pertama kali saat setup database baru.

---

## ⚙️ Folder `backend/`

Server Express.js yang menangani semua request dari frontend dan berinteraksi dengan database.

### File Root Backend

#### `backend/server.ts`
**Mudah dipahami:** "Tombol ON" server. File pertama yang dijalankan saat kamu ketik `npm run dev` di backend. Menghidupkan server di port tertentu (biasanya 5000).

#### `backend/src/app.ts`
**Mudah dipahami:** "Pusat kontrol" backend. Mendaftarkan semua route dan middleware ke Express. Kalau ada request masuk, `app.ts` yang mengarahkan ke handler yang tepat.

#### `backend/src/db.ts`
**Mudah dipahami:** "Kabel penghubung" antara backend dan database PostgreSQL. File ini yang membuat dan mengelola koneksi. Semua file lain yang butuh akses database import dari sini.

#### `backend/package.json`
**Mudah dipahami:** "Daftar belanja" library yang dibutuhkan backend. Saat kamu jalankan `npm install`, Node.js membaca file ini.

#### `backend/.env`
**Mudah dipahami:** "File rahasia" berisi password database, secret token JWT, dan konfigurasi sensitif. **Tidak boleh diunggah ke GitHub.**

#### `backend/.env.example`
**Mudah dipahami:** Panduan bagi developer lain tentang variabel apa saja yang perlu diisi di `.env` mereka. Contoh isi: `DATABASE_URL=`, `JWT_SECRET=`.

---

### `backend/src/routes/`

Folder ini berisi semua endpoint API — satu file per domain bisnis. Setiap file menangani request masuk, memvalidasi data, menjalankan logika bisnis, dan mengakses database.

> **Alur request:** `HTTP Request masuk` → `middleware auth` → `routes/*.ts` → `db.ts` → `Response balik ke frontend`

| File | Endpoint yang Ditangani | Fungsi |
|---|---|---|
| `auth.ts` | `POST /api/auth/login`, `/register`, `GET /api/auth/me` | Login, register akun baru, ambil data user yg sedang login |
| `survey.ts` | `GET/POST /api/surveys`, `GET/PATCH /api/surveys/:id` | Buat, ambil, dan update data survey |
| `targeting.ts` | `POST /api/surveys/:id/targeting`, `GET /api/surveys/:id/targeting/match-count` | Simpan kriteria filter responden, hitung berapa yang cocok |
| `distribution.ts` | `POST /api/surveys/:id/distribute`, `GET /api/surveys/:id/distribution` | Mulai distribusi survey ke responden yang cocok |
| `response.ts` | `POST /api/responses`, `GET /api/surveys/:id/responses` | Responden kirim bukti pengisian, researcher lihat semua respons |
| `qc.ts` | `GET /api/surveys/:id/qc`, `PATCH /api/qc/:id` | Lihat hasil quality control, override status manual |
| `points.ts` | `GET /api/points` | Responden lihat saldo poin dan riwayat transaksi |

---

### `backend/src/middleware/`

Middleware adalah kode yang berjalan **sebelum** request mencapai handler utama — seperti "pos pemeriksaan".

#### `middleware/auth.ts`
**Mudah dipahami:** "Pemeriksa KTP". Setiap request ke endpoint yang butuh login diperiksa di sini: "Apakah token JWT kamu valid?" Kalau tidak, langsung ditolak dengan status 401 Unauthorized.

#### `middleware/roleGuard.ts`
**Mudah dipahami:** "Penjaga area khusus". Setelah `auth.ts` memastikan kamu sudah login, `roleGuard.ts` mengecek: "Apakah role kamu sesuai?" Misalnya, endpoint create survey hanya boleh diakses researcher.

#### `middleware/errorHandler.ts`
**Mudah dipahami:** "Jaring pengaman". Kalau ada error di mana saja di backend, file ini yang menangkapnya dan mengembalikan pesan error yang rapi ke frontend — bukan error mentah yang membingungkan.

---

## 🖥️ Folder `frontend/`

Aplikasi Next.js yang dijalankan di browser user. Menggunakan App Router, TypeScript, dan Tailwind CSS.

### File Root Frontend

#### `frontend/package.json`
Daftar dependencies frontend: `next`, `react`, `tailwindcss`, `axios`, dll.

#### `frontend/next.config.ts`
**Mudah dipahami:** "Pengaturan utama" framework Next.js — domain gambar yang diizinkan, environment variables, dll.

#### `frontend/tailwind.config.ts`
**Mudah dipahami:** "Pengaturan desain sistem". Di sini kamu bisa menambahkan warna brand DataLoop, font, ukuran spacing khusus.

#### `frontend/tsconfig.json`
Konfigurasi TypeScript untuk frontend. Biasanya mendefinisikan path alias seperti `@/` yang merujuk ke `src/`.

#### `frontend/.env.local`
Variabel environment khusus frontend, misalnya `NEXT_PUBLIC_API_URL=http://localhost:5000`.

---

### `frontend/public/`

File di sini bisa diakses langsung via URL tanpa diproses Next.js.

| Path | Penjelasan |
|---|---|
| `public/favicon.ico` | Ikon kecil yang muncul di tab browser |
| `public/images/` | Gambar statis: logo DataLoop, gambar hero landing page |

---

### `frontend/src/styles/globals.css`
**Mudah dipahami:** "File CSS utama". Berisi setup Tailwind dan variabel warna brand DataLoop. Ini satu-satunya file CSS global yang ditulis manual.

---

### `frontend/src/app/` — Halaman (URL Routing)

Setiap folder di sini = URL di browser. Next.js otomatis membuat routing berdasarkan struktur folder.

#### File Root App

| File | URL | Penjelasan |
|---|---|---|
| `layout.tsx` | Semua halaman | **Root Layout** — wrapper paling luar. Tempat mendaftarkan font global dan provider (AuthContext). |
| `page.tsx` | `/` | **Landing Page** — halaman pertama yang dilihat pengunjung. Berisi hero, fitur, tombol daftar/login. |
| `not-found.tsx` | Error 404 | Halaman yang tampil ketika user akses URL yang tidak ada. |

---

#### Route Group `(auth)/`

> Tanda kurung `(auth)` artinya ini hanya **grup logis** — tidak muncul di URL. URL tetap `/login`, bukan `/auth/login`.

| File | URL | Penjelasan |
|---|---|---|
| `login/page.tsx` | `/login` | Halaman login — form email & password. |
| `register/page.tsx` | `/register` | Halaman registrasi — ada pilihan role (Researcher / Respondent). |
| `onboarding/page.tsx` | `/onboarding` | **Khusus Respondent** — isi profil (usia, gender, lokasi) setelah register untuk keperluan targeting. |

---

#### Route Group `(researcher)/`

> Semua halaman di sini hanya bisa diakses researcher.

| File | URL | Penjelasan |
|---|---|---|
| `layout.tsx` | Semua halaman researcher | Layout dengan Sidebar navigasi kiri. |
| `dashboard/page.tsx` | `/dashboard` | Ringkasan: total survey, total respons, progress. Ada tombol "Buat Survey Baru". |
| `survey/page.tsx` | `/survey` | Daftar semua survey milik researcher dengan status masing-masing. |
| `survey/create/page.tsx` | `/survey/create` | Form buat survey baru. |
| `survey/[id]/page.tsx` | `/survey/123` | Detail satu survey — navigasi ke sub-halaman. |
| `survey/[id]/targeting/page.tsx` | `/survey/123/targeting` | Setting kriteria responden (usia, gender, lokasi). |
| `survey/[id]/distribution/page.tsx` | `/survey/123/distribution` | Lihat jumlah responden cocok, tombol "Mulai Distribusi". |
| `survey/[id]/monitoring/page.tsx` | `/survey/123/monitoring` | Monitoring per responden: siapa sudah isi, siapa belum, progress bar. |
| `survey/[id]/qc/page.tsx` | `/survey/123/qc` | Hasil Quality Control: Valid ✅ / Suspicious ⚠️ / Rejected ❌. |
| `settings/page.tsx` | `/settings` | Profil dan pengaturan akun researcher. |

> **Catatan `[id]`:** Ini adalah **dynamic route** — `[id]` menangkap nilai apapun dari URL. Nilai ini bisa diakses via `params.id`.

---

#### Route Group `(respondent)/`

> Semua halaman di sini hanya bisa diakses respondent.

| File | URL | Penjelasan |
|---|---|---|
| `layout.tsx` | Semua halaman respondent | Layout mobile-friendly dengan BottomNav (navigasi bawah). |
| `home/page.tsx` | `/home` | Daftar survey yang tersedia dan sudah di-assign ke respondent ini. |
| `survey/[id]/page.tsx` | `/survey/123` | Detail survey: estimasi waktu, poin yang bisa didapat, tombol "Kerjakan". |
| `survey/[id]/submit/page.tsx` | `/survey/123/submit` | Upload screenshot sebagai bukti bahwa survey sudah diisi. |
| `points/page.tsx` | `/points` | Saldo poin saat ini dan riwayat poin per survey. |
| `profile/page.tsx` | `/profile` | Edit data diri yang digunakan untuk targeting. |

---

### `frontend/src/components/` — Komponen UI yang Bisa Dipakai Ulang

#### `components/ui/` — Elemen Dasar

Komponen-komponen ini **hanya urusan tampilan** — tidak ada API call atau logika bisnis.

| File | Penjelasan |
|---|---|
| `Button.tsx` | Tombol dengan berbagai varian: primary, secondary, ghost, danger. Ada prop `isLoading` untuk spinner. |
| `Input.tsx` | Input teks dengan label, helper text, dan state error (border merah). |
| `Card.tsx` | Container box dengan shadow — wrapper umum untuk konten. |
| `Badge.tsx` | Label kecil berwarna untuk status: `draft` (abu), `active` (hijau), `completed` (biru). |
| `Modal.tsx` | Popup dialog untuk konfirmasi aksi penting. |
| `Spinner.tsx` | Animasi loading berputar. |

#### `components/layout/` — Kerangka Halaman

| File | Penjelasan |
|---|---|
| `Navbar.tsx` | Navigation bar atas — tampil di landing page. Berisi logo dan tombol Login/Register. |
| `Sidebar.tsx` | Panel navigasi kiri khusus **researcher** — menu Dashboard, Survey, Settings. |
| `BottomNav.tsx` | Navigasi bawah layar khusus **respondent** — seperti tab bar aplikasi mobile. |
| `Footer.tsx` | Footer landing page — copyright dan link penting. |

---

### `frontend/src/hooks/` — Custom React Hooks

Hooks adalah cara React untuk memisahkan logika (ambil data, kelola state) dari tampilan.

| File | Penjelasan |
|---|---|
| `useAuth.ts` | Mengekspos: `user` (data user saat ini), `login(email, pass)`, `logout()`, `isLoading`. |
| `useSurveys.ts` | Fetch daftar survey dan satu survey berdasarkan ID. |
| `useToast.ts` | Munculkan notifikasi singkat dari mana saja. Contoh: `toast.success("Survey berhasil dibuat!")`. |
| `useDebounce.ts` | Tunda eksekusi function selama X ms setelah input berhenti berubah. Dipakai di targeting preview agar tidak kirim request setiap ketikan. |

---

### `frontend/src/services/` — Pemanggilan API

Semua komunikasi dengan backend terpusat di folder ini. Komponen tidak boleh memanggil API langsung.

| File | Penjelasan |
|---|---|
| `api.ts` | Instance Axios yang sudah dikonfigurasi: base URL ke backend, otomatis attach JWT token di setiap request, redirect ke login kalau token expired (401). Semua file lain import dari sini. |
| `auth.ts` | API call auth: `login()`, `register()`, `getMe()`. |
| `survey.ts` | API call survey: buat survey, ambil daftar, update status, simpan targeting, mulai distribusi. |
| `response.ts` | API call respons: kirim bukti pengisian, ambil daftar respons. |
| `points.ts` | API call poin: ambil saldo dan riwayat transaksi. |
| `qc.ts` | API call QC: ambil hasil quality control, override status manual. |

---

### `frontend/src/types/index.ts` — TypeScript Types

**Mudah dipahami:** Satu file yang mendefinisikan "bentuk" semua data dalam aplikasi. Misalnya: apa saja field yang ada di objek `Survey`, apa saja nilai yang valid untuk `status` survey.

Contoh isi:
```typescript
type UserRole = 'researcher' | 'respondent'
type SurveyStatus = 'draft' | 'active' | 'completed'
type QCStatus = 'valid' | 'suspicious' | 'rejected'

interface Survey {
  id: string
  title: string
  status: SurveyStatus
  targetCount: number
  rewardPoints: number
}
```

---

### `frontend/src/lib/auth.ts` — Helper Session

**Mudah dipahami:** Kumpulan fungsi untuk mengelola sesi login user di browser: simpan token ke localStorage, baca token, hapus token saat logout, dan cek apakah session masih valid.

---

### `frontend/src/constants.ts` — Konstanta Global

**Mudah dipahami:** Satu file berisi semua nilai tetap yang dipakai di banyak tempat.

```typescript
// URL semua halaman
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  SURVEY_DETAIL: (id: string) => `/survey/${id}`,
}

// Nama role yang valid
export const ROLES = {
  RESEARCHER: 'researcher',
  RESPONDENT: 'respondent',
}

// Status survey
export const SURVEY_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}
```

---

### `frontend/src/utils.ts` — Fungsi Bantu

**Mudah dipahami:** Satu file berisi fungsi-fungsi kecil yang membantu memformat atau mengolah data.

| Fungsi | Kegunaan |
|---|---|
| `formatDate(date)` | Ubah tanggal jadi teks: `"31 Maret 2026"` |
| `formatPoints(1500)` | Ubah angka jadi `"1.500 poin"` |
| `cn(...classes)` | Gabungkan class Tailwind CSS secara kondisional tanpa konflik |

---

## 📊 Ringkasan Alur Kerja Aplikasi

```
USER DI BROWSER
    ↓
Lihat halaman (app/page.tsx)
    ↓
Klik / isi form
    ↓
Hook (hooks/*.ts) handle state & panggil
    ↓
Service (services/*.ts) kirim HTTP request
    ↓  lewat api.ts (Axios + token JWT)
════ BACKEND ════
    ↓
middleware/auth.ts cek token
    ↓
routes/*.ts proses request & query database
    ↓  via db.ts
database/schema.sql (PostgreSQL)
    ↓
Response balik ke frontend
    ↓
Komponen tampilkan data ke user
```

> 💡 **Prinsip utama:** Setiap bagian punya tanggung jawab yang jelas.
> - **Halaman (app/)** = hanya susun layout dan tampilkan komponen
> - **Hooks** = ambil data dan kelola state
> - **Services** = kirim request ke backend
> - **Routes backend** = logika bisnis dan akses database
