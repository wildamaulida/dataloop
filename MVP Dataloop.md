# DataLoop — MVP Documentation

**Version 1.0**

---

## 1. Overview

DataLoop adalah platform berbasis web yang menghubungkan peneliti (user) dengan responden untuk membantu proses pengisian kuesioner secara lebih cepat, terarah, dan terkontrol kualitasnya.

### Masalah Utama
- Sulit cari responden sesuai kriteria
- Data sering tidak valid
- Distribusi kuesioner tidak terarah

### Solusi DataLoop
- ✅ Targeting responden
- ✅ Distribusi terstruktur
- ✅ Quality Control sederhana
- ✅ Sistem insentif berbasis poin

> Sesuai proposal, sistem ini dirancang untuk mengelola proses upload, distribusi, dan validasi responden dalam satu platform.

---

## 2. Core MVP Scope

Fokus MVP (super minimal, tapi tetap "jualan jalan"):

1. Auth (2 Role: Peneliti & Responden)
2. Upload Survey
3. Targeting Responden
4. Distribusi Survey
5. Poin Responden
6. QC (Quality Control) Sederhana

---

## 3. Application Pages

### 3.1 Landing Page

**Fungsi:**
- Jelasin value DataLoop
- CTA:
  - "Saya Peneliti"
  - "Saya Responden"

---

### 3.2 Login / Register Page

**Fitur:**
- Register:
  - Name
  - Email
  - Password
  - Role (Peneliti / Responden)
- Login

**Output:**
- User masuk dashboard sesuai role

---

### 3.3 Dashboard Peneliti

**Fitur utama:**
- List survey milik peneliti
- Status:
  - Active
  - Completed
- Progress bar: target vs actual responden

**Quick action:**
- Upload Survey
- Lihat hasil

---

### 3.4 Dashboard Responden

**Fitur:**
- List survey tersedia (hasil targeting)
- Filter: kategori
- Informasi survey:
  - Judul
  - Estimasi waktu
  - Reward poin
- CTA: "Isi Survey"

---

### 3.5 Upload Survey Page (Peneliti)

**Form:**
- Judul survey
- Deskripsi
- Link (Google Form / eksternal)
- Target jumlah responden
- Reward poin

**Output:**
- Survey masuk ke sistem

---

### 3.6 Targeting Page

**Peneliti menentukan:**
- Umur (range)
- Gender
- Status (opsional: mahasiswa, dll)

**Output:**
- System akan match ke responden

> Sesuai proses proposal: sistem mengatur segmentasi dan distribusi sesuai karakteristik responden.

---

### 3.7 Survey Distribution Page

**Fungsi:**
- Menampilkan:
  - Berapa responden sudah dapat survey
  - Berapa belum
- Backend: assign survey ke responden

---

### 3.8 Survey Fill Page (Responden)

**Fitur:**
- Redirect ke link survey
- Tombol: "Saya sudah isi"

---

### 3.9 Poin & Reward Page

**Responden:**
- Total poin
- History pengerjaan survey

**Peneliti:**
- Total poin keluar

---

### 3.10 QC (Quality Control) Page

**Fitur minimal:**
- Valid / tidak valid
- Indikator:
  - Waktu isi terlalu cepat
  - Submit tanpa klik link

---

## 4. User Flows (Ringkas)

### Flow Peneliti
1. Login
2. Upload survey
3. Set target responden
4. Publish
5. Monitor progress
6. Lihat hasil

### Flow Responden
1. Login
2. Lihat survey tersedia
3. Klik survey
4. Isi survey
5. Klik "sudah isi"
6. Dapat poin

---

## 5. Database Structure (MVP Level)

### Users
| No | Field |
|---|---|
| 1 | `id` |
| 2 | `name` |
| 3 | `email` |
| 4 | `password` |
| 5 | `role` (peneliti/responden) |
| 6 | `age` |
| 7 | `gender` |
| 8 | `points` |

### Surveys
| No | Field |
|---|---|
| 9 | `id` |
| 10 | `title` |
| 11 | `description` |
| 12 | `link` |
| 13 | `creator_id` |
| 14 | `target_count` |
| 15 | `reward_points` |
| 16 | `status` |
| 17 | `created_at` |

### Targeting
| No | Field |
|---|---|
| 18 | `id` |
| 19 | `survey_id` |
| 20 | `age_min` |
| 21 | `age_max` |
| 22 | `gender` |

### SurveyAssignments *(relasi distribusi)*
| No | Field |
|---|---|
| 23 | `id` |
| 24 | `survey_id` |
| 25 | `user_id` |
| 26 | `status` (assigned / completed) |
| 27 | `is_valid` (true/false) |
| 28 | `completed_at` |

### PointTransactions
| No | Field |
|---|---|
| 29 | `id` |
| 30 | `user_id` |
| 31 | `survey_id` |
| 32 | `points` |
| 33 | `type` (earn/spend) |
| 34 | `created_at` |

---

## 6. MVP Technical Notes

Mirip struktur SparIN tapi versi web:

| Layer | Teknologi |
|---|---|
| Frontend | React / Next.js |
| Backend | Node.js (Express) / Firebase |
| Database | PostgreSQL / Firestore |
| Auth | JWT / Firebase Auth |
| Hosting | Vercel / Firebase Hosting |

### Logic Penting

**Matching Targeting:**
```sql
SELECT users
WHERE age BETWEEN min AND max
AND gender = target
```

**QC Sederhana:**
- Jika waktu isi < 30 detik → **invalid**
- Jika tidak klik link → **invalid**

**Poin:**
- +10 per survey valid
- Tidak dapat poin jika invalid

---

## 7. Out of Scope (Next Phase)

Jangan masuk MVP:

- ❌ AI validasi responden
- ❌ Auto scraping responden
- ❌ Payment system
- ❌ Rating responden
- ❌ Dashboard analytics kompleks
- ❌ Anti-cheat advanced

---

## 💡 Insight Penting

> MVP ini sudah benar banget fokusnya. Kuncinya bukan di fitur banyak — tapi di:
>
> **Matching + Validasi**
>
> Kalau itu jalan → produk ini "hidup" ✅
