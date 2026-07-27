# Pertemuan 3: Logic Blocks & Render Conditional

## 📖 Teori & Konsep Dasar
1. **Conditional Rendering (`#if`)**: Merender elemen HTML secara bersyarat. Sintaksnya: `{#if syarat} ... {:else} ... {/if}`.
2. **List Rendering (`#each`)**: Mengulang pembuatan elemen HTML berdasarkan array data. Sintaksnya: `{#each array as item} ... {/each}`.

## 💻 Panduan Praktik
1. Jalankan mode development Svelte.
2. Klik tombol "Ikhwan" atau "Akhwat" untuk menguji penyaringan data santri.
3. Amati bagaimana Svelte merender daftar santri secara kondisional berdasarkan tombol aktif.

## ✍️ Tugas Mandiri
Buat sebuah input form pencarian di atas tombol filter. Gunakan computed property `let searchQuery = ""` dan buat daftar santri otomatis terfilter hanya menampilkan santri yang namanya mengandung huruf pencarian tersebut.
