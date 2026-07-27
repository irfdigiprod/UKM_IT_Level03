<script lang="ts">
  let nama = "";
  let kelas = "10-A";
  let gender = "L";
  
  let santriList: any[] = [];
  
  function handleFormSubmit() {
    const newSantri = {
      id: Date.now(),
      nama,
      kelas,
      gender
    };
    
    // Add item to array with reactivity (triggering assignment)
    santriList = [...santriList, newSantri];
    
    // Reset form
    nama = "";
  }
  
  function hapusSantri(id: number) {
    santriList = santriList.filter(s => s.id !== id);
  }
</script>

<main>
  <div class="layout">
    <div class="card form-card">
      <h3>Pendaftaran Santri Baru</h3>
      <form on:submit|preventDefault={handleFormSubmit}>
        <div class="form-group">
          <label>Nama Lengkap</label>
          <input type="text" bind:value={nama} placeholder="Masukkan nama santri" required />
        </div>
        <div class="form-group">
          <label>Kelas</label>
          <select bind:value={kelas}>
            <option value="10-A">Kelas 10-A</option>
            <option value="10-B">Kelas 10-B</option>
            <option value="11-A">Kelas 11-A</option>
            <option value="11-B">Kelas 11-B</option>
          </select>
        </div>
        <div class="form-group">
          <label>Gender</label>
          <div class="radio-group">
            <label><input type="radio" bind:group={gender} value="L" /> Ikhwan</label>
            <label><input type="radio" bind:group={gender} value="P" /> Akhwat</label>
          </div>
        </div>
        <button type="submit">Daftarkan Santri</button>
      </form>
    </div>

    <div class="card list-card">
      <h3>Daftar Santri Terdaftar ({santriList.length})</h3>
      <ul>
        {#each santriList as santri}
          <li>
            <span>{santri.nama} - {santri.kelas}</span>
            <button class="btn-delete" on:click={() => hapusSantri(santri.id)}>Hapus</button>
          </li>
        {:else}
          <p>Belum ada santri terdaftar.</p>
        {/each}
      </ul>
    </div>
  </div>
</main>

<style>
  :global(body) {
    background-color: #f3f4f6;
    font-family: sans-serif;
  }
  .layout {
    max-width: 800px;
    margin: 40px auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  input[type="text"], select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .radio-group {
    display: flex;
    gap: 15px;
  }
  button {
    background-color: #10b981;
    color: white;
    padding: 10px;
    border: none;
    width: 100%;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn-delete {
    background-color: #ef4444;
    padding: 4px 8px;
    width: auto;
    font-size: 12px;
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