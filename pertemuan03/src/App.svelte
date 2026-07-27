<script lang="ts">
  let filterGender = "Semua";
  let santriList = [
    { id: 1, nama: "Ahmad Fauzi", kelas: "10-A", gender: "L" },
    { id: 2, nama: "Fatimah Az-Zahra", kelas: "10-B", gender: "P" },
    { id: 3, nama: "Zubair bin Awwam", kelas: "10-A", gender: "L" },
    { id: 4, nama: "Aisyah Humaira", kelas: "10-B", gender: "P" }
  ];
</script>

<main>
  <div class="list-container">
    <h2>Daftar Santri Pesantren</h2>
    
    <div class="filter">
      <button class:active={filterGender === 'Semua'} on:click={() => filterGender = 'Semua'}>Semua</button>
      <button class:active={filterGender === 'L'} on:click={() => filterGender = 'L'}>Ikhwan</button>
      <button class:active={filterGender === 'P'} on:click={() => filterGender = 'P'}>Akhwat</button>
    </div>

    <ul>
      {#each santriList as santri}
        {#if filterGender === 'Semua' || santri.gender === filterGender}
          <li>
            <span>{santri.nama} ({santri.kelas})</span>
            <span class="gender-badge {santri.gender}">{santri.gender === 'L' ? 'Ikhwan' : 'Akhwat'}</span>
          </li>
        {/if}
      {:else}
        <li>Data santri tidak ditemukan.</li>
      {/each}
    </ul>
  </div>
</main>

<style>
  :global(body) {
    background-color: #f3f4f6;
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    padding-top: 40px;
  }
  .list-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 350px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }
  .filter {
    display: flex;
    gap: 8px;
    margin-bottom: 15px;
  }
  button {
    flex: 1;
    padding: 6px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  button.active {
    background: #1a5f7a;
    color: white;
    border-color: #1a5f7a;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    padding: 8px 12px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .gender-badge {
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 4px;
    color: white;
  }
  .gender-badge.L { background-color: #3b82f6; }
  .gender-badge.P { background-color: #ec4899; }
</style>