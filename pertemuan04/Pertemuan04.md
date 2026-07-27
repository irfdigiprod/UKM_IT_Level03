# Pertemuan 4: Event Handling & Component Bindings

## 📖 Teori & Konsep Dasar
1. **Event Modifiers**: Modifikasi event handling bawaan dengan modifier seperti `|preventDefault` untuk mencegah reload halaman bawaan form.
2. **Two-Way Binding (`bind:value`)**: Menyinkronkan variabel `<script>` secara langsung dua arah dengan input HTML.
3. **Array Mutation Reactivity**: Svelte mendeteksi reaktivitas array hanya bila terjadi penugasan ulang (assignment). Sehingga alih-alih `arr.push(item)`, kita harus menuliskan `arr = [...arr, item]`.

## 💻 Panduan Praktik
1. Jalankan program dan coba isi form data santri lalu submit.
2. Klik tombol "Hapus" pada salah satu baris santri dan perhatikan bagaimana UI memperbarui list.

## ✍️ Tugas Mandiri
Tambahkan fitur edit santri. Ketika nama santri diklik pada list, pindahkan nilainya kembali ke dalam form input untuk diedit, lalu ganti tombol "Daftarkan" menjadi "Simpan Perubahan".
