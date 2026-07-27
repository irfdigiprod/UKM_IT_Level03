# Pertemuan 7: Integrasi Fetch API dengan Authorization Bearer JWT

## 📖 Teori & Konsep Dasar
1. **HTTP Headers**: Token JWT harus dikirim pada request header `Authorization: Bearer <token>` agar diizinkan masuk oleh middleware JWT di server Bun Hono.
2. **Lifecycle `onMount`**: Fungsi hook bawaan Svelte yang otomatis dieksekusi sekali tepat setelah komponen selesai dimuat di layar browser. Cocok untuk mengambil data awal (fetch initial data).

## 💻 Panduan Praktik
1. Nyalakan backend Bun Hono di port 3000. Lakukan login untuk menyimpan token di local storage.
2. Jalankan aplikasi Svelte ini.
3. Tambah, muat, dan hapus santri dan amati log request di console terminal backend Bun Hono.

## ✍️ Tugas Mandiri
Buat penanganan UI loading yang menampilkan animasi teks `"Sedang memuat data dari database..."` di layar selama proses fetch `loadSantri()` berjalan.
