<script lang="ts">
  let appName = "Aplikasi Admin Pendataan Hafalan Al-Qur'an";
  let ustadzName = "Irfan";
</script>

<main>
  <div class="card">
    <h1>Selamat Datang di {appName}</h1>
    <p>Dikembangkan oleh Ustadz/Admin: <strong>{ustadzName}</strong></p>
  </div>
</main>

<style>
  :global(body) {
    background-color: #f0f4f8;
    font-family: 'Outfit', sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    text-align: center;
  }
  h1 {
    color: #1a5f7a;
    font-size: 24px;
    margin-bottom: 10px;
  }
  p {
    color: #57606f;
  }
</style>