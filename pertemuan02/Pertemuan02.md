# Pertemuan 2: Sintaks Dasar Svelte & Reactivity

## 📖 Teori & Konsep Dasar
1. **Reaktivitas Variabel**: Svelte memperbarui DOM setiap kali ada penugasan nilai ulang (`let x = 10; x = 20;`).
2. **Reactivity Statement (`$: `)**: Adalah label JavaScript valid yang dimanfaatkan Svelte untuk mendefinisikan ekspresi reaktif yang bergantung pada variabel lain. Apabila variabel pendukungnya berubah, baris yang berlabel `$: ` akan dihitung ulang secara otomatis.

## 💻 Panduan Praktik
1. Jalankan `bun install` & `bun run dev`.
2. Ketikkan nama santri dan jumlah juz pada form input.
3. Amati bagaimana hasil kalkulasi computed `sisaJuz` langsung berubah di layar secara instan.

## ✍️ Tugas Mandiri
Tambahkan label reaktif `$: ` baru untuk menampilkan rekomendasi predikat kelulusan berdasarkan jumlah juz: jika juz >= 30: "Istimewa (Mumtaz)", juz >= 20: "Bagus (Jayyid Jiddan)", selain itu "Harus Ditingkatkan". Tampilkan predikat tersebut pada UI.
