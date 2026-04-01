# 📊 DETAIL SPRINT DATALOOP (6 MINGGU)

Siap, aku bikin versi **lebih detail + rapi tabel per minggu** biar bisa langsung kamu pakai buat proposal / laporan 👍  
Aku juga tambahin **alur kerja per task (frontend + backend + database)** supaya jelas banget siapa ngapain.

---

## 🗓️ MINGGU 1 — Fondasi & Autentikasi
🎯 **Goal:** User bisa register & login

| Bagian | Developer A | Developer B |
| :--- | :--- | :--- |
| **Database** | Jalankan `schema.sql` (tabel user) | Setup koneksi database (`db.ts`) |
| **Backend** | API Register (POST `/register`) | API Login (POST `/login`) + JWT |
| **Backend** | Hash password (bcrypt) | Middleware auth (JWT verify) |
| **Frontend** | Halaman Register | Halaman Login |
| **Frontend** | Form input + validasi | Navbar sederhana |
| **Testing** | Test register | Test login |

✅ **Output:**
- User bisa daftar & login
- Token JWT sudah jalan

---

## 🗓️ MINGGU 2 — Role & Profil
🎯 **Goal:** User punya role & profil

| Bagian | Developer A | Developer B |
| :--- | :--- | :--- |
| **Database** | Tambah field profil (umur, gender, dll) | Tambah field role (researcher/respondent) |
| **Backend** | API update profil | Middleware roleGuard |
| **Backend** | API get profil | Proteksi route berdasarkan role |
| **Frontend** | Halaman onboarding respondent | Layout dashboard researcher |
| **Frontend** | Bottom navigation | Sidebar navigation |
| **Testing** | Update profil | Cek akses role |

✅ **Output:**
- Role user berjalan
- Tampilan berbeda sesuai role

---

## 🗓️ MINGGU 3 — CRUD Survey
🎯 **Goal:** Bisa buat & lihat survey

| Bagian | Developer A | Developer B |
| :--- | :--- | :--- |
| **Database** | Tabel survey | Relasi user ↔ survey |
| **Backend** | API create survey | API get all survey |
| **Backend** | API update survey | API get detail survey |
| **Backend** | API delete survey | Pagination/filter (opsional) |
| **Frontend** | Form buat survey | List survey |
| **Frontend** | Input pertanyaan | Detail survey |
| **Testing** | Create & edit survey | Fetch & display survey |

✅ **Output:**
- Survey bisa dibuat, diedit, dilihat

---

## 🗓️ MINGGU 4 — Targeting & Distribusi
🎯 **Goal:** Survey dikirim ke target yang sesuai

| Bagian | Developer A | Developer B |
| :--- | :--- | :--- |
| **Database** | Tabel kriteria (umur, dll) | Tabel distribusi survey |
| **Backend** | API set kriteria | API distribusi survey |
| **Backend** | Logic matching respondent | API ambil survey untuk respondent |
| **Frontend** | Halaman set target | Halaman distribusi |
| **Frontend** | Input filter (umur, gender, dll) | Tombol aktifkan survey |
| **Testing** | Test filtering | Test distribusi |

✅ **Output:**
- Survey hanya muncul ke target yang sesuai

---

## 🗓️ MINGGU 5 — Flow Respondent & QC
🎯 **Goal:** Survey diisi & divalidasi

| Bagian | Developer A | Developer B |
| :--- | :--- | :--- |
| **Database** | Tabel response/jawaban | Tabel status QC |
| **Backend** | API submit jawaban | API validasi (approve/reject) |
| **Backend** | API upload bukti | API update status |
| **Frontend** | Halaman list survey respondent | Halaman QC researcher |
| **Frontend** | Form isi survey | Tombol approve/reject |
| **Frontend** | Upload file bukti | Tampilkan bukti |
| **Testing** | Submit response | Validasi QC |

✅ **Output:**
- Responden bisa isi survey
- Researcher bisa validasi

---

## 🗓️ MINGGU 6 — Poin & Finalisasi
🎯 **Goal:** Sistem selesai & siap dipakai

| Bagian | Developer A | Developer B |
| :--- | :--- | :--- |
| **Database** | Tabel poin / wallet | Relasi user ↔ poin |
| **Backend** | API tambah poin | Error handling global |
| **Backend** | API saldo user | Logging system |
| **Frontend** | Halaman saldo poin | Perbaikan UI/UX |
| **Frontend** | Riwayat poin | Integrasi semua halaman |
| **Testing** | Test poin masuk | End-to-end testing |

✅ **Output:**
- Sistem poin berjalan
- Semua fitur terintegrasi

---

## 🔥 RINGKASAN PEMBAGIAN KERJA

| Role | Fokus |
| :--- | :--- |
| 🧑‍💻 **Developer A** | Lebih ke **input & create (form, user action)** |
| 👨‍💻 **Developer B** | Lebih ke **display & control (list, validasi, sistem)** |

---

## 💡 POLA KERJA TIAP FITUR (WAJIB IKUT INI)
Setiap fitur harus dikerjakan dengan urutan:

1. **Database dulu**
2. **Backend API**
3. **Testing API** (Postman)
4. **Frontend UI**
5. **Integrasi**
6. **Testing ulang**
