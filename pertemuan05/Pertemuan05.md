# Pertemuan 5: Halaman Register, Login & Manajemen Token JWT

## 📖 Teori & Konsep Dasar
1. **Integrasi Auth**: Frontend harus mengirimkan HTTP request dengan method POST dan payload JSON ke endpoint server auth, lalu menyimpan hasilnya (token) secara aman di LocalStorage klien.
2. **Session Persistence**: Membaca token dari `localStorage` saat startup halaman agar admin tidak perlu berulang kali login saat melakukan refresh halaman.

## 💻 Panduan Praktik
1. Jalankan backend Bun Hono di port 3000 terlebih dahulu.
2. Jalankan aplikasi Svelte ini. Lakukan pendaftaran akun admin baru, kemudian coba login menggunakan akun tersebut.
3. Amati token terisi di LocalStorage menggunakan Developer Tools browser (Application -> Local Storage).

## ✍️ Tugas Mandiri
Sembunyikan form input password menggunakan type `"password"` bawaan HTML, dan tambahkan tombol "Show Password" (eye icon) untuk mengubah type input menjadi `"text"` secara dinamis memanfaatkan status boolean reaktif Svelte.
