# 📊 DataLoop — Project Structure (MVP)

> **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · PostgreSQL · Express.js

---

## 📁 Project Tree Structure

```
dataloop/
│
├── frontend/                              # Next.js App
│   ├── public/
│   │   ├── images/                        # Logo, gambar hero, ilustrasi
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── app/                           # Halaman (URL routing otomatis)
│   │   │   ├── layout.tsx                 # Root layout (font, provider global)
│   │   │   ├── page.tsx                   # Landing Page (/)
│   │   │   ├── not-found.tsx              # Halaman 404
│   │   │   │
│   │   │   ├── (auth)/                    # Grup halaman autentikasi
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx           # /login
│   │   │   │   ├── register/
│   │   │   │   │   └── page.tsx           # /register
│   │   │   │   └── onboarding/
│   │   │   │       └── page.tsx           # /onboarding (isi profil respondent)
│   │   │   │
│   │   │   ├── (researcher)/              # Halaman khusus Researcher
│   │   │   │   ├── layout.tsx             # Layout researcher (sidebar + header)
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx           # /dashboard
│   │   │   │   ├── survey/
│   │   │   │   │   ├── page.tsx           # /survey (daftar survey)
│   │   │   │   │   ├── create/
│   │   │   │   │   │   └── page.tsx       # /survey/create
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── page.tsx       # /survey/[id] (detail)
│   │   │   │   │       ├── targeting/
│   │   │   │   │       │   └── page.tsx   # /survey/[id]/targeting
│   │   │   │   │       ├── distribution/
│   │   │   │   │       │   └── page.tsx   # /survey/[id]/distribution
│   │   │   │   │       ├── monitoring/
│   │   │   │   │       │   └── page.tsx   # /survey/[id]/monitoring
│   │   │   │   │       └── qc/
│   │   │   │   │           └── page.tsx   # /survey/[id]/qc
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx           # /settings
│   │   │   │
│   │   │   └── (respondent)/              # Halaman khusus Respondent
│   │   │       ├── layout.tsx             # Layout respondent (bottom nav)
│   │   │       ├── home/
│   │   │       │   └── page.tsx           # /home (daftar survey tersedia)
│   │   │       ├── survey/
│   │   │       │   └── [id]/
│   │   │       │       ├── page.tsx       # /survey/[id] (detail survey)
│   │   │       │       └── submit/
│   │   │       │           └── page.tsx   # /survey/[id]/submit (upload bukti)
│   │   │       ├── points/
│   │   │       │   └── page.tsx           # /points (saldo & riwayat poin)
│   │   │       └── profile/
│   │   │           └── page.tsx           # /profile
│   │   │
│   │   ├── components/                    # Komponen UI yang bisa dipakai ulang
│   │   │   ├── ui/                        # Elemen dasar: Button, Input, Card, dll
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Spinner.tsx
│   │   │   │   └── ...
│   │   │   └── layout/                    # Kerangka halaman
│   │   │       ├── Navbar.tsx
│   │   │       ├── Sidebar.tsx
│   │   │       ├── BottomNav.tsx
│   │   │       └── Footer.tsx
│   │   │
│   │   ├── hooks/                         # Semua custom React hooks
│   │   │   ├── useAuth.ts                 # Login, logout, session user
│   │   │   ├── useSurveys.ts              # Fetch data survey
│   │   │   ├── useToast.ts                # Notifikasi toast
│   │   │   └── useDebounce.ts             # Delay input (cegah request berlebih)
│   │   │
│   │   ├── services/                      # Semua pemanggilan API ke backend
│   │   │   ├── api.ts                     # Axios base instance + interceptor
│   │   │   ├── auth.ts                    # API: login, register, me
│   │   │   ├── survey.ts                  # API: CRUD survey, targeting, distribusi
│   │   │   ├── response.ts                # API: submit jawaban & bukti
│   │   │   ├── points.ts                  # API: saldo & riwayat poin
│   │   │   └── qc.ts                      # API: hasil quality control
│   │   │
│   │   ├── types/                         # Semua TypeScript type definitions
│   │   │   └── index.ts                   # Satu file berisi semua types
│   │   │
│   │   ├── lib/
│   │   │   └── auth.ts                    # Helper session (simpan/baca token)
│   │   │
│   │   ├── constants.ts                   # Semua konstanta (routes, roles, status)
│   │   ├── utils.ts                       # Fungsi bantu (format tanggal, poin, dll)
│   │   └── styles/
│   │       └── globals.css                # Tailwind directives + variabel warna
│   │
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.js
│   ├── .env.local
│   ├── .env.example
│   └── package.json
│
├── backend/                               # Server Express.js
│   ├── src/
│   │   ├── routes/                        # Semua endpoint API (satu file per domain)
│   │   │   ├── auth.ts                    # POST /api/auth/login, /register
│   │   │   ├── survey.ts                  # CRUD /api/surveys
│   │   │   ├── targeting.ts               # POST /api/surveys/:id/targeting
│   │   │   ├── distribution.ts            # POST /api/surveys/:id/distribute
│   │   │   ├── response.ts                # POST /api/responses
│   │   │   ├── qc.ts                      # GET /api/surveys/:id/qc
│   │   │   └── points.ts                  # GET /api/points
│   │   │
│   │   ├── middleware/                    # Middleware Express
│   │   │   ├── auth.ts                    # Verifikasi JWT token
│   │   │   ├── roleGuard.ts               # Cek role (researcher/respondent)
│   │   │   └── errorHandler.ts            # Tangkap & format semua error
│   │   │
│   │   ├── db.ts                          # Koneksi ke database PostgreSQL
│   │   └── app.ts                         # Setup Express (pasang routes & middleware)
│   │
│   ├── server.ts                          # Entry point — jalankan server
│   ├── .env
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
│
├── database/
│   └── schema.sql                         # Seluruh definisi tabel database
│
├── .gitignore
├── .prettierrc
└── README.md
```

---

## 🗂️ Penjelasan Singkat Per Folder

### Frontend (`frontend/src/`)

| Folder / File | Fungsi |
|---|---|
| `app/` | Semua halaman — Next.js otomatis buat URL berdasarkan nama folder |
| `app/(auth)/` | Halaman login, register, onboarding — tidak perlu login untuk akses |
| `app/(researcher)/` | Halaman khusus researcher — dashboard, kelola survey |
| `app/(respondent)/` | Halaman khusus respondent — isi survey, lihat poin |
| `components/ui/` | Elemen dasar UI: tombol, input, card, modal, spinner |
| `components/layout/` | Kerangka halaman: navbar, sidebar, footer, navigasi bawah |
| `hooks/` | Logic React yang bisa dipakai ulang (ambil data, notifikasi, dll) |
| `services/` | Semua request ke backend API — dipisah per domain |
| `types/index.ts` | Satu file berisi semua definisi tipe TypeScript |
| `lib/auth.ts` | Simpan, baca, dan hapus token JWT dari browser |
| `constants.ts` | Semua nilai tetap: URL routes, nama role, status survey |
| `utils.ts` | Fungsi bantu murni: format tanggal, format poin, gabung class CSS |
| `styles/globals.css` | File CSS global: setup Tailwind + variabel warna brand DataLoop |

### Backend (`backend/src/`)

| Folder / File | Fungsi |
|---|---|
| `routes/` | Setiap file = satu domain API. Berisi endpoint, validasi, dan logika bisnis |
| `middleware/auth.ts` | Cek token JWT di setiap request yang butuh login |
| `middleware/roleGuard.ts` | Pastikan hanya role yang sesuai yang bisa akses endpoint tertentu |
| `middleware/errorHandler.ts` | Tangkap semua error dan kembalikan pesan yang rapi ke frontend |
| `db.ts` | Buat dan kelola koneksi ke PostgreSQL |
| `app.ts` | Pasang semua routes dan middleware ke Express |
| `server.ts` | Jalankan server di port tertentu |

### Database (`database/`)

| File | Fungsi |
|---|---|
| `schema.sql` | Definisi lengkap semua tabel database DataLoop |

---

## 🔄 Alur Request (Bagaimana Data Mengalir)

```
Browser (React)
    ↓  klik / submit form
hooks/use*.ts          ← ambil & kelola data
    ↓
services/*.ts          ← kirim request ke backend
    ↓  HTTP Request
lib/api.ts (Axios)     ← attach token otomatis
    ↓
════════════ BACKEND ════════════
    ↓
middleware/auth.ts     ← cek token valid
    ↓
routes/*.ts            ← proses request, query database
    ↓
db.ts (PostgreSQL)     ← simpan / ambil data
    ↓  HTTP Response
services/*.ts          ← terima hasil
    ↓
hooks/use*.ts          ← update state
    ↓
Component             ← tampilkan ke user
```

---

## 🔴 ERD Database (Tabel & Relasi)

### Tabel

| Tabel | Isi |
|---|---|
| `users` | Semua akun (researcher & respondent) |
| `respondent_profiles` | Data profil tambahan untuk respondent (usia, gender, lokasi) |
| `surveys` | Data survey yang dibuat researcher |
| `survey_targeting` | Kriteria filter respondent per survey |
| `survey_distribution` | Daftar respondent yang di-assign ke survey |
| `responses` | Jawaban & bukti yang dikirim respondent |
| `qc_results` | Hasil quality control per jawaban |
| `points` | Riwayat poin yang diterima respondent |

### Relasi Antar Tabel

```
users (researcher)   ──1:N──►  surveys
users (respondent)   ──1:1──►  respondent_profiles
users (respondent)   ──1:N──►  survey_distribution
users (respondent)   ──1:N──►  responses
users (respondent)   ──1:N──►  points
surveys              ──1:1──►  survey_targeting
surveys              ──1:N──►  survey_distribution
responses            ──1:1──►  qc_results
```

---

## ✅ Aturan Penulisan Kode

| Apa | Aturan | Contoh |
|---|---|---|
| Komponen React | PascalCase | `SurveyForm.tsx` |
| Hooks | camelCase, awalan `use` | `useAuth.ts` |
| Service | camelCase | `surveyService`, `authService` |
| Konstanta | HURUF_BESAR | `ROLES.RESEARCHER` |
| Tabel database | snake_case | `survey_targeting` |
| URL endpoint | kebab-case | `/api/quality-control` |