<div align="center">

# 📊 DataLoop

**Platform Distribusi Kuesioner Akademik yang Cerdas & Terstruktur**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express-4-lightgrey?style=for-the-badge&logo=express)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org)

</div>

---

## 📖 Tentang DataLoop

DataLoop adalah platform web yang menghubungkan **peneliti** dengan **responden** untuk membantu proses pengisian kuesioner secara lebih cepat, terarah, dan terkontrol kualitasnya.

### 😩 Masalah yang diselesaikan

| Masalah | Solusi DataLoop |
|---|---|
| Sulit mencari responden sesuai kriteria | ✅ Sistem targeting berdasarkan usia, gender, lokasi |
| Data respons sering tidak valid | ✅ Quality Control otomatis (durasi, kelengkapan) |
| Distribusi kuesioner tidak terarah | ✅ Distribusi terstruktur & semi-otomatis |
| Tidak ada insentif untuk responden | ✅ Sistem poin reward per survey valid |

---

## ✨ Fitur MVP

### 🔐 Autentikasi (2 Role)
- Register & login dengan pemilihan role: **Peneliti** atau **Responden**
- Onboarding profil khusus responden (untuk keperluan targeting)
- JWT-based authentication

### 📋 Manajemen Survey (Peneliti)
- Upload survey dengan judul, deskripsi, link Google Form, target responden, dan reward poin
- Dashboard ringkasan: total survey, total respons, progress distribusi
- Monitoring per-responden secara real-time

### 🎯 Targeting Responden
- Filter responden berdasarkan: rentang usia, gender, domisili, status (mahasiswa/umum)
- Preview jumlah responden yang cocok sebelum distribusi dimulai

### 📡 Distribusi Survey
- Sistem assign otomatis responden yang sesuai kriteria targeting
- Tracking status per responden: `assigned` → `completed` / `rejected`

### 🏆 Sistem Poin
- Responden mendapat poin setiap kali menyelesaikan survey dengan valid
- Riwayat transaksi poin bisa dilihat kapanpun

### 🔍 Quality Control
- Deteksi respons tidak valid berdasarkan:
  - Durasi pengerjaan terlalu cepat (< 30 detik)
  - Tidak mengklik link survey
- Status QC: ✅ Valid / ⚠️ Suspicious / ❌ Rejected
- Researcher dapat melakukan override manual

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | PostgreSQL |
| **Auth** | JWT (JSON Web Token) |
| **Hosting** | Vercel (Frontend) / Railway (Backend) |

---

## 📁 Struktur Proyek

```
dataloop/
├── frontend/                   # Next.js App (App Router)
│   └── src/
│       ├── app/                # Routing — (auth), (researcher), (respondent)
│       ├── components/         # UI primitives, layout shells, shared components
│       ├── features/           # Domain modules: auth, survey, targeting, dll
│       ├── hooks/              # Global hooks
│       ├── lib/                # API client, auth helpers
│       ├── context/            # React Context (auth, toast)
│       ├── types/              # Global TypeScript types
│       ├── constants/          # Routes, roles, status enums
│       └── utils/              # Pure utility functions
│
├── backend/                    # Express.js API Server
│   └── src/
│       ├── modules/            # Domain modules: auth, user, survey, dll
│       ├── middleware/         # authenticate, roleGuard, errorHandler
│       ├── config/             # db, env, cors
│       └── utils/              # token, hash, logger, apiResponse
│
└── database/
    ├── schema.sql              # Full PostgreSQL schema
    ├── seed.sql                # Data dummy development
    └── migrations/             # Versioned SQL migrations (001–007)
```

> 📄 Lihat [`ProjectStructure.md`](./ProjectStructure.md) untuk struktur lengkap dengan penjelasan tiap file.
> 📄 Lihat [`FileExplanation.md`](./FileExplanation.md) untuk penjelasan detail setiap file dan folder.

---

## 🚀 Cara Menjalankan Proyek

### Prerequisites

Pastikan sudah terinstall:
- [Node.js](https://nodejs.org) v18 atau lebih baru
- [PostgreSQL](https://www.postgresql.org) v14 atau lebih baru
- [Git](https://git-scm.com)

---

### 1. Clone Repository

```bash
git clone https://github.com/wildamaulida/dataloop.git
cd dataloop
```

---

### 2. Setup Database

```bash
# Buat database PostgreSQL
psql -U postgres -c "CREATE DATABASE dataloop;"

# Jalankan schema (buat semua tabel)
psql -U postgres -d dataloop -f database/schema.sql

# (Opsional) Isi data dummy untuk development
psql -U postgres -d dataloop -f database/seed.sql
```

---

### 3. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Salin file environment
cp .env.example .env
```

Edit file `.env` dan isi dengan konfigurasi kamu:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/dataloop
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

```bash
# Jalankan backend (development)
npm run dev
```

Backend akan berjalan di: `http://localhost:5000`

---

### 4. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Salin file environment
cp .env.example .env.local
```

Edit file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
# Jalankan frontend (development)
npm run dev
```

Frontend akan berjalan di: `http://localhost:3000`

---

## 👤 Role & Akses

| Role | Kemampuan |
|---|---|
| **Peneliti** | Upload survey, set targeting, mulai distribusi, monitoring, lihat QC |
| **Responden** | Lihat survey yang di-assign, isi survey, submit bukti, lihat poin |

### Flow Peneliti
```
Login → Upload Survey → Set Targeting → Mulai Distribusi → Monitor Progress → Lihat QC
```

### Flow Responden
```
Login → Onboarding Profil → Lihat Survey Tersedia → Isi Survey → Submit Bukti → Dapat Poin
```

---

## 🗄️ Skema Database

```
users               → Semua pengguna (peneliti & responden)
respondent_profiles → Data profil khusus responden (untuk targeting)
surveys             → Survey yang dibuat peneliti
survey_targeting    → Kriteria targeting per survey
survey_distribution → Relasi survey ↔ responden yang di-assign
responses           → Jawaban/submission responden
qc_results          → Hasil validasi Quality Control
points              → Riwayat transaksi poin responden
```

### Relasi Utama

```
users (peneliti)   ──1:N──►  surveys
surveys            ──1:1──►  survey_targeting
surveys            ──1:N──►  survey_distribution
users (responden)  ──1:1──►  respondent_profiles
users (responden)  ──1:N──►  responses
responses          ──1:1──►  qc_results
users (responden)  ──1:N──►  points
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/auth/register` | Daftar akun baru |
| `POST` | `/api/auth/login` | Login & dapatkan token |
| `GET` | `/api/auth/me` | Data user yang sedang login |

### Survey
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/surveys` | Daftar semua survey (peneliti) |
| `POST` | `/api/surveys` | Buat survey baru |
| `GET` | `/api/surveys/:id` | Detail survey |
| `PATCH` | `/api/surveys/:id/status` | Update status survey |

### Targeting
| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/surveys/:id/targeting` | Simpan kriteria targeting |
| `GET` | `/api/surveys/:id/targeting/match-count` | Preview jumlah responden yang cocok |

### Distribution
| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/surveys/:id/distribute` | Mulai distribusi survey |
| `GET` | `/api/surveys/:id/distribution` | Status distribusi per responden |

### Response & QC
| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/responses` | Submit respons survey |
| `GET` | `/api/surveys/:id/qc` | Hasil QC per survey |

### Points
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/points` | Saldo dan riwayat poin responden |

---

## 🧠 Business Rules

### QC (Quality Control)
```
Durasi < 30 detik  → REJECTED ❌
Tidak klik link    → REJECTED ❌
Durasi normal      → VALID ✅
```

### Sistem Poin
```
Response VALID     → +poin (sesuai reward yang diset peneliti)
Response REJECTED  → +0 poin
```

### Targeting Matching
```sql
SELECT users
WHERE age BETWEEN min_age AND max_age
  AND (gender = target_gender OR target_gender IS NULL)
  AND (location = target_location OR target_location IS NULL)
```

---

## ❌ Out of Scope (Next Phase)

Fitur berikut **tidak termasuk MVP** dan akan dikembangkan di versi berikutnya:

- AI validasi responden
- Auto-scraping responden
- Payment/withdrawal system
- Rating & reputasi responden
- Dashboard analytics kompleks
- Anti-cheat advanced
- Notifikasi email/push

---

## 📂 Dokumentasi Tambahan

| File | Isi |
|---|---|
| [`ProjectStructure.md`](./ProjectStructure.md) | Struktur folder lengkap + logic flow + ERD database |
| [`FileExplanation.md`](./FileExplanation.md) | Penjelasan detail setiap file dan folder |
| [`MVP Dataloop.md`](./MVP%20Dataloop.md) | Dokumen spesifikasi MVP original |

---

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch baru: `git checkout -b feature/nama-fitur`
3. Commit perubahan: `git commit -m "feat: tambah fitur X"`
4. Push ke branch: `git push origin feature/nama-fitur`
5. Buat Pull Request

### Konvensi Commit Message

```
feat: tambah fitur baru
fix: perbaikan bug
docs: update dokumentasi
refactor: refactor kode tanpa perubahan fungsionalitas
style: perubahan styling/formatting
chore: update dependency atau konfigurasi
```

---

## 📄 Lisensi

Project ini dibuat untuk keperluan akademik dan pengembangan produk. Hak cipta © 2026 DataLoop Team.

---

<div align="center">

**DataLoop** — *Riset lebih mudah, data lebih valid* 📊

</div>
