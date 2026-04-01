# 🎨 DataLoop Full Color Palette System
*(Light Mode Only)*

> **Style direction:** Clean • Data-centric • Professional • Minimal • Trustworthy

---

## ✅ 1. Brand Colors (Global)

Dipakai konsisten di seluruh sistem.

| Token Name | Hex | Usage |
|---|---|---|
| Brand/Primary | `#2563EB` | CTA utama, button penting |
| Brand/Secondary | `#16A34A` | Validasi, success, poin |
| Brand/Accent | `#F59E0B` | Highlight, progress, attention |
| Brand/Neutral-Dark | `#111827` | Teks utama |
| Brand/Neutral-Light | `#F9FAFB` | Background utama |
| Brand/Gray | `#6B7280` | Subtitle, secondary text |

---

## 🌞 2. Light Mode Color Palette

### 2.1 Background

| Token | Hex | Usage |
|---|---|---|
| BG/Primary | `#FFFFFF` | Background utama |
| BG/Secondary | `#F9FAFB` | Section, dashboard area |
| BG/Tertiary | `#EFF6FF` | Highlight section (biru soft) |
| BG/Overlay | `rgba(0,0,0,0.05)` | Modal, overlay |

> **👉 Insight UX:** Biru soft (`#EFF6FF`) dipakai hemat untuk guiding focus

---

### 2.2 Surface / Card Colors

| Token | Hex | Usage |
|---|---|---|
| Surface/Default | `#FFFFFF` | Card utama |
| Surface/Variant | `#F3F4F6` | Card alternatif |
| Surface/Accent | `#EFF6FF` | Card highlight (insight/data penting) |

---

### 2.3 Text Colors

| Token | Hex | Usage |
|---|---|---|
| Text/Primary | `#111827` | Judul, teks utama |
| Text/Secondary | `#6B7280` | Deskripsi |
| Text/Tertiary | `#9CA3AF` | Placeholder |
| Text/Inverse | `#FFFFFF` | Teks di button biru |

> **👉 Ini penting:** Kontras tinggi → nyaman baca survey panjang

---

### 2.4 Action & CTA

| Token | Hex | Usage |
|---|---|---|
| CTA/Primary | `#2563EB` | Submit, Publish Survey |
| CTA/Primary-Pressed | `#1D4ED8` | Hover/active |
| CTA/Secondary | `#E5E7EB` | Button netral |
| CTA/Secondary-Pressed | `#D1D5DB` | Hover |
| CTA/Success | `#16A34A` | Confirm / valid |
| CTA/Warning | `#F59E0B` | Attention |

---

### 2.5 Borders & Lines

| Token | Hex |
|---|---|
| Border/Light | `#E5E7EB` |
| Border/Medium | `#D1D5DB` |
| Border/Accent | `#2563EB` |

---

### 2.6 Status Colors

| Type | Hex | Description |
|---|---|---|
| Success | `#16A34A` | Data valid, QC lolos |
| Warning | `#F59E0B` | Hampir cukup responden |
| Danger | `#DC2626` | Error / invalid data |
| Info | `#0EA5E9` | Informasi sistem |

---

## 📱 3. Recommended UI Usage per Element

### Headers / Title
- `#111827` (bold, clean, readable)

### Navbar
- Background: putih (`#FFFFFF`)
- Border bawah: `#E5E7EB`
- Active menu: biru (`#2563EB`)

### Cards (Dashboard Survey)
- Default: putih
- Hover: subtle shadow + border biru tipis
- Insight penting: pakai `Surface/Accent` (`#EFF6FF`)

### Buttons
- Primary: biru (`#2563EB`)
- Secondary: abu (`#E5E7EB`)
- Success: hijau (`#16A34A`)
- Danger: merah (`#DC2626`)

### Form Survey
- Input border: `#D1D5DB`
- Focus: biru (`#2563EB`)
- Error: merah (`#DC2626`)
- Valid: hijau (`#16A34A`)

> **👉 Ini penting banget untuk UX form panjang**

### Dashboard / Charts

Gunakan kombinasi:
- 🔵 Biru → data utama
- 🟢 Hijau → valid / success
- 🟠 Orange → progress
- ⬜ Abu → baseline

> **👉 Jangan lebih dari 4 warna dalam 1 chart**

---

## ⚠️ Rules Penting (Agar UX Tidak Rusak)

- ❌ Jangan semua elemen jadi biru
- ❌ Jangan pakai warna accent berlebihan
- ❌ Jangan pakai background berwarna kuat
- ❌ Jangan campur makna warna

---

## 🔥 Summary (Versi Singkat untuk Dev / Figma)

**Core Palette:**

| Token | Hex |
|---|---|
| Primary | `#2563EB` |
| Success | `#16A34A` |
| Accent | `#F59E0B` |
| Background | `#F9FAFB` |
| Text | `#111827` |
