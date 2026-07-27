<script lang="ts">
  let namaSantri = "";
  let juzTercapai = 0;
  
  // Reactivity statement (computed value)
  $: sisaJuz = 30 - juzTercapai;
  $: statusKelulusan = juzTercapai >= 30 ? "Lulus (Khatam)" : "Sedang Berjuang";
</script>

<main>
  <div class="form-container">
    <h2>Reactivity Tester: Pencapaian Juz</h2>
    <input type="text" bind:value={namaSantri} placeholder="Masukkan Nama Santri" />
    <input type="number" bind:value={juzTercapai} placeholder="Juz yang Sudah Dihafal" min="0" max="30" />
    
    <div class="result">
      <p>Santri: <strong>{namaSantri || '-'}</strong></p>
      <p>Juz Dihafal: {juzTercapai} Juz</p>
      <p>Sisa Target: {sisaJuz} Juz</p>
      <p>Status: <span class="badge">{statusKelulusan}</span></p>
    </div>
  </div>
</main>

<style>
  :global(body) {
    background-color: #f7f9fc;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    padding-top: 50px;
  }
  .form-container {
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    width: 320px;
  }
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .result {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }
  .badge {
    background-color: #e2e8f0;
    padding: 4px 8px;
    border-radius: 99px;
    font-size: 12px;
  }
</style>