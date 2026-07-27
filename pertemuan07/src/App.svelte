<script lang="ts">
  import { onMount } from 'svelte';
  import { tokenStore, santriStore } from './store';
  
  let nama = "";
  let kelas = "10-A";
  let gender = "L";
  let message = "";
  
  // Ambil data santri dari backend API terproteksi
  async function loadSantri() {
    try {
      const res = await fetch("http://localhost:3000/api/protected/santri", {
        headers: {
          "Authorization": `Bearer ${$tokenStore}`
        }
      });
      if (res.status === 401) {
        tokenStore.set("");
        message = "Sesi telah berakhir. Silakan login ulang.";
        return;
      }
      const data = await res.json();
      santriStore.set(data);
    } catch (err: any) {
      message = "Gagal memuat data dari server.";
    }
  }
  
  async function tambahSantri() {
    if (!nama) return;
    try {
      const res = await fetch("http://localhost:3000/api/protected/santri", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${$tokenStore}`
        },
        body: JSON.stringify({ nama, kelas, gender })
      });
      if (res.ok) {
        nama = "";
        loadSantri(); // Refresh list data
      }
    } catch (err) {
      message = "Gagal menambah data.";
    }
  }

  async function hapusSantri(id: number) {
    try {
      const res = await fetch(`http://localhost:3000/api/protected/santri/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${$tokenStore}`
        }
      });
      if (res.ok) {
        loadSantri(); // Refresh list data
      }
    } catch (err) {
      message = "Gagal menghapus data.";
    }
  }
  
  onMount(() => {
    if ($tokenStore) {
      loadSantri();
    }
  });
</script>

<main>
  <div class="app-layout">
    {#if !$tokenStore}
      <div class="login-alert">
        <p>Anda belum Login. Buka folder Pertemuan 5 untuk melakukan login admin terlebih dahulu.</p>
        <button on:click={() => tokenStore.set("simulasi-token")}>Gunakan Token Sementara</button>
      </div>
    {:else}
      <div class="card form-box">
        <h3>Form Tambah Santri (API Sync)</h3>
        <input type="text" bind:value={nama} placeholder="Nama Santri" />
        <select bind:value={kelas}>
          <option value="10-A">Kelas 10-A</option>
          <option value="10-B">Kelas 10-B</option>
        </select>
        <select bind:value={gender}>
          <option value="L">Laki-laki</option>
          <option value="P">Perempuan</option>
        </select>
        <button on:click={tambahSantri}>Kirim ke Database</button>
      </div>
      
      <div class="card list-box">
        <h3>Daftar Santri Real-time</h3>
        {#if message}
          <p class="error-msg">{message}</p>
        {/if}
        <ul>
          {#each $santriStore as s}
            <li>
              <span>{s.nama} ({s.kelas}) - {s.gender}</span>
              <button class="btn-del" on:click={() => hapusSantri(s.id)}>Hapus</button>
            </li>
          {:else}
            <p>Data kosong di server.</p>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</main>

<style>
  :global(body) {
    background-color: #f3f4f6;
    font-family: sans-serif;
  }
  .app-layout {
    max-width: 800px;
    margin: 50px auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }
  input, select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  button {
    background-color: #2563eb;
    color: white;
    border: none;
    padding: 10px;
    width: 100%;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn-del {
    background-color: #dc2626;
    padding: 4px 8px;
    width: auto;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    padding: 8px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>