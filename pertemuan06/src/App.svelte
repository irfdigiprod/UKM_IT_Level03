<script lang="ts">
  import { tokenStore, santriStore } from './store';
  
  let newNama = "";
  let newKelas = "10-A";
  
  function addSantriGlobal() {
    if (!newNama) return;
    const item = { id: Date.now(), nama: newNama, kelas: newKelas };
    // update store menggunakan $store atau update() method
    santriStore.update(currentList => [...currentList, item]);
    newNama = "";
  }
  
  function hapusSantri(id: number) {
    santriStore.update(currentList => currentList.filter(s => s.id !== id));
  }
</script>

<main>
  <div class="container">
    <h2>State Global dengan Svelte Store</h2>
    
    <div class="auth-status">
      {#if $tokenStore}
        <p>Status Admin: <span class="badge active">Aktif</span></p>
        <button on:click={() => tokenStore.set("")}>Keluar / Reset Token</button>
      {:else}
        <p>Status Admin: <span class="badge offline">Offline</span></p>
        <button on:click={() => tokenStore.set("dummy-token-jwt")}>Simulasi Login</button>
      {/if}
    </div>
    
    <div class="crud-simulation">
      <input type="text" bind:value={newNama} placeholder="Nama Santri" />
      <button on:click={addSantriGlobal}>Tambah ke Store</button>
      
      <ul>
        {#each $santriStore as s}
          <li>
            <span>{s.nama} ({s.kelas})</span>
            <button class="danger" on:click={() => hapusSantri(s.id)}>Hapus</button>
          </li>
        {:else}
          <p>Belum ada data di Store global.</p>
        {/each}
      </ul>
    </div>
  </div>
</main>

<style>
  :global(body) {
    background-color: #f0f3f6;
    font-family: sans-serif;
  }
  .container {
    max-width: 400px;
    margin: 40px auto;
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  }
  .badge {
    padding: 2px 6px;
    border-radius: 4px;
    color: white;
  }
  .badge.active { background-color: #10b981; }
  .badge.offline { background-color: #ef4444; }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    padding: 8px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
  }
</style>