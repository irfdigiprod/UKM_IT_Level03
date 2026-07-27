# Pertemuan 6: State Management dengan Svelte Stores

## 📖 Teori & Konsep Dasar
1. **Svelte Stores**: Mekanisme bawaan Svelte untuk State Management terpusat yang bisa digunakan oleh banyak komponen secara simultan tanpa prop drilling.
2. **Writable Store**: Menyediakan method `subscribe` (berlangganan perubahan), `set` (mengganti nilai baru), dan `update` (mengubah nilai berdasarkan nilai sebelumnya).
3. **Auto-subscription (`$`)**: Menghilangkan kebutuhan untuk menulis method subscribe dan unsubscribe secara manual di dalam komponen `.svelte`.

## 💻 Panduan Praktik
1. Jalankan aplikasi dan coba klik tombol "Simulasi Login" lalu perhatikan perubahan status admin.
2. Masukkan data santri, klik "Tambah ke Store", dan perhatikan sinkronisasi data global.

## ✍️ Tugas Mandiri
Buat sebuah store baru bernama `hafalanStore` di file `src/store.ts`. Buat fungsi untuk menambahkan record hafalan baru di store tersebut dan buat tampilan counter ringkasan jumlah total hafalan di header aplikasi.
