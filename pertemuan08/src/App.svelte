<script lang="ts">
  import { onMount } from 'svelte';
  import { tokenStore, santriStore, hafalanStore } from './store';

  let activeTab = "dashboard";
  let message = "";
  
  // Forms
  let loginUser = "";
  let loginPass = "";
  
  let newNama = "";
  let newKelas = "10-A";
  let newGender = "L";

  let selSantriId = 0;
  let newSurah = "";
  let newAyatMulai = 1;
  let newAyatSelesai = 10;
  let newPredikat = "Jayyid";
  let newPenguji = "";
  
  // API Fetch helper
  async function fetchAPI(url: string, method = "GET", body: any = null) {
    const headers: any = {};
    if ($tokenStore) {
      headers["Authorization"] = `Bearer ${$tokenStore}`;
    }
    if (body) {
      headers["Content-Type"] = "application/json";
    }
    
    const config: any = { method, headers };
    if (body) config.body = JSON.stringify(body);
    
    const res = await fetch(`http://localhost:3000${url}`, config);
    if (res.status === 401) {
      tokenStore.set("");
      activeTab = "login";
      throw new Error("Sesi login berakhir.");
    }
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Gagal memproses request.");
    }
    return res.json();
  }

  async function handleLogin() {
    try {
      const data = await fetchAPI("/api/auth/login", "POST", { username: loginUser, password: loginPass });
      tokenStore.set(data.token);
      activeTab = "dashboard";
      loadAllData();
    } catch (err: any) {
      alert(err.message);
    }
  }

  function handleLogout() {
    tokenStore.set("");
    activeTab = "login";
  }

  async function loadAllData() {
    if (!$tokenStore) return;
    try {
      const santri = await fetchAPI("/api/protected/santri");
      santriStore.set(santri);
      
      const hafalan = await fetchAPI("/api/protected/hafalan");
      hafalanStore.set(hafalan);
    } catch (err: any) {
      message = err.message;
    }
  }

  async function addSantri() {
    if (!newNama) return;
    try {
      await fetchAPI("/api/protected/santri", "POST", { nama: newNama, kelas: newKelas, gender: newGender });
      newNama = "";
      loadAllData();
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function deleteSantri(id: number) {
    if (!confirm("Apakah Anda yakin ingin menghapus santri ini? Semua riwayat hafalan santri akan terpengaruh.")) return;
    try {
      await fetchAPI(`/api/protected/santri/${id}`, "DELETE");
      loadAllData();
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function addHafalan() {
    if (!selSantriId || !newSurah || !newPenguji) {
      alert("Lengkapi semua field input hafalan!");
      return;
    }
    const payload = {
      santri_id: Number(selSantriId),
      surah: newSurah,
      ayat_mulai: Number(newAyatMulai),
      ayat_selesai: Number(newAyatSelesai),
      predikat: newPredikat,
      tanggal: new Date().toISOString().split('T')[0],
      penguji: newPenguji
    };
    try {
      await fetchAPI("/api/protected/hafalan", "POST", payload);
      newSurah = "";
      newPenguji = "";
      loadAllData();
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function deleteHafalan(id: number) {
    try {
      await fetchAPI(`/api/protected/hafalan/${id}`, "DELETE");
      loadAllData();
    } catch (err: any) {
      alert(err.message);
    }
  }

  onMount(() => {
    if ($tokenStore) {
      activeTab = "dashboard";
      loadAllData();
    } else {
      activeTab = "login";
    }
  });
</script>

<div class="app-container">
  <header class="header">
    <div class="logo">🕌 <span>STAI Hafalan Tracker</span></div>
    {#if $tokenStore}
      <nav class="nav-menu">
        <button class:active={activeTab === 'dashboard'} on:click={() => activeTab = 'dashboard'}>Dashboard</button>
        <button class:active={activeTab === 'santri'} on:click={() => activeTab = 'santri'}>Data Santri</button>
        <button class:active={activeTab === 'hafalan'} on:click={() => activeTab = 'hafalan'}>Setor Hafalan</button>
        <button class="logout-btn" on:click={handleLogout}>Keluar</button>
      </nav>
    {/if}
  </header>

  <main class="content">
    {#if activeTab === 'login'}
      <div class="auth-card">
        <h2>Pintu Masuk Admin</h2>
        <input type="text" bind:value={loginUser} placeholder="Username Admin" />
        <input type="password" bind:value={loginPass} placeholder="Password" />
        <button on:click={handleLogin}>Masuk Aplikasi</button>
      </div>

    {:else if activeTab === 'dashboard'}
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Santri</h3>
          <p class="stat-val">{$santriStore.length}</p>
        </div>
        <div class="stat-card">
          <h3>Hafalan Tercatat</h3>
          <p class="stat-val">{$hafalanStore.length}</p>
        </div>
        <div class="stat-card">
          <h3>Pembimbing Aktif</h3>
          <p class="stat-val">Ikhwan & Akhwat</p>
        </div>
      </div>

      <div class="table-card">
        <h3>5 Setoran Hafalan Terakhir</h3>
        <table>
          <thead>
            <tr>
              <th>Nama Santri</th>
              <th>Kelas</th>
              <th>Surah</th>
              <th>Ayat</th>
              <th>Predikat</th>
              <th>Tanggal</th>
              <th>Penguji</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {#each $hafalanStore.slice(0, 5) as h}
              <tr>
                <td>{h.nama_santri}</td>
                <td>{h.kelas_santri}</td>
                <td>{h.surah}</td>
                <td>{h.ayat_mulai} - {h.ayat_selesai}</td>
                <td><span class="badge {h.predikat}">{h.predikat}</span></td>
                <td>{h.tanggal}</td>
                <td>{h.penguji}</td>
                <td><button class="btn-table-del" on:click={() => deleteHafalan(h.id)}>Hapus</button></td>
              </tr>
            {:else}
              <tr>
                <td colspan="8" style="text-align: center;">Belum ada hafalan disetor.</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

    {:else if activeTab === 'santri'}
      <div class="split-layout">
        <div class="sidebar-form">
          <h3>Tambah Santri</h3>
          <input type="text" bind:value={newNama} placeholder="Nama Santri" />
          <select bind:value={newKelas}>
            <option value="10-A">Kelas 10-A</option>
            <option value="10-B">Kelas 10-B</option>
            <option value="11-A">Kelas 11-A</option>
            <option value="11-B">Kelas 11-B</option>
          </select>
          <select bind:value={newGender}>
            <option value="L">Ikhwan (Laki-laki)</option>
            <option value="P">Akhwat (Perempuan)</option>
          </select>
          <button on:click={addSantri}>Simpan Santri</button>
        </div>

        <div class="main-table">
          <h3>Daftar Santri</h3>
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Gender</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {#each $santriStore as s}
                <tr>
                  <td>{s.nama}</td>
                  <td>{s.kelas}</td>
                  <td>{s.gender === 'L' ? 'Ikhwan' : 'Akhwat'}</td>
                  <td><button class="btn-table-del" on:click={() => deleteSantri(s.id)}>Hapus</button></td>
                </tr>
              {:else}
                <tr>
                  <td colspan="4" style="text-align: center;">Belum ada santri terdaftar.</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>

    {:else if activeTab === 'hafalan'}
      <div class="split-layout">
        <div class="sidebar-form">
          <h3>Setor Hafalan Baru</h3>
          
          <label for="santri-select">Pilih Santri</label>
          <select id="santri-select" bind:value={selSantriId}>
            <option value="0">-- Pilih Santri --</option>
            {#each $santriStore as s}
              <option value={s.id}>{s.nama} ({s.kelas})</option>
            {/each}
          </select>

          <label for="surah-input">Nama Surah</label>
          <input id="surah-input" type="text" bind:value={newSurah} placeholder="Misal: Al-Mulk" />

          <div style="display: flex; gap: 10px;">
            <div>
              <label for="ayat-mulai">Mulai Ayat</label>
              <input id="ayat-mulai" type="number" bind:value={newAyatMulai} />
            </div>
            <div>
              <label for="ayat-selesai">Selesai Ayat</label>
              <input id="ayat-selesai" type="number" bind:value={newAyatSelesai} />
            </div>
          </div>

          <label for="predikat-select">Predikat</label>
          <select id="predikat-select" bind:value={newPredikat}>
            <option value="Mumtaz">Mumtaz (Istimewa)</option>
            <option value="Jayyid Jiddan">Jayyid Jiddan (Sangat Baik)</option>
            <option value="Jayyid">Jayyid (Baik)</option>
            <option value="Maqbul">Maqbul (Cukup)</option>
          </select>

          <label for="penguji-input">Penguji / Ustadz</label>
          <input id="penguji-input" type="text" bind:value={newPenguji} placeholder="Nama Ustadz" />

          <button on:click={addHafalan}>Simpan Setoran</button>
        </div>

        <div class="main-table">
          <h3>Seluruh Riwayat Setoran Hafalan</h3>
          <table>
            <thead>
              <tr>
                <th>Nama Santri</th>
                <th>Surah</th>
                <th>Ayat</th>
                <th>Predikat</th>
                <th>Tanggal</th>
                <th>Penguji</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {#each $hafalanStore as h}
                <tr>
                  <td>{h.nama_santri}</td>
                  <td>{h.surah}</td>
                  <td>{h.ayat_mulai} - {h.ayat_selesai}</td>
                  <td><span class="badge {h.predikat}">{h.predikat}</span></td>
                  <td>{h.tanggal}</td>
                  <td>{h.penguji}</td>
                  <td><button class="btn-table-del" on:click={() => deleteHafalan(h.id)}>Hapus</button></td>
                </tr>
              {:else}
                <tr>
                  <td colspan="7" style="text-align: center;">Belum ada hafalan disetor.</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}
  </main>
</div>

<style>
  :global(body) {
    background-color: #f0f3f6;
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    margin: 0;
    padding: 0;
  }
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .header {
    background-color: #1a5f7a;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 40px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  .logo {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .logo span {
    font-weight: 300;
  }
  .nav-menu {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  .nav-menu button {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.8);
    font-size: 15px;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 4px;
    transition: all 0.2s;
  }
  .nav-menu button.active, .nav-menu button:hover {
    color: white;
    background-color: rgba(255,255,255,0.1);
  }
  .nav-menu button.logout-btn {
    background-color: #e74c3c;
    color: white;
  }
  .nav-menu button.logout-btn:hover {
    background-color: #c0392b;
  }
  .content {
    flex: 1;
    padding: 30px 40px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }
  
  /* Auth Page */
  .auth-card {
    background: white;
    max-width: 360px;
    margin: 80px auto 0;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  }
  .auth-card h2 {
    color: #1a5f7a;
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
  }
  .auth-card input {
    width: 100%;
    padding: 10px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .auth-card button {
    background-color: #1a5f7a;
    color: white;
    border: none;
    width: 100%;
    padding: 12px;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
  }
  
  /* Stats Cards */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
  }
  .stat-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  }
  .stat-card h3 {
    margin: 0;
    color: #7f8c8d;
    font-size: 14px;
    text-transform: uppercase;
  }
  .stat-val {
    margin: 10px 0 0;
    font-size: 32px;
    font-weight: bold;
    color: #2c3e50;
  }

  /* Tables */
  .table-card {
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  }
  .table-card h3 {
    margin-top: 0;
    color: #1a5f7a;
    margin-bottom: 15px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    background-color: #f8f9fa;
    color: #7f8c8d;
    font-weight: 600;
    text-align: left;
    padding: 12px;
    font-size: 14px;
    border-bottom: 2px solid #eaeded;
  }
  td {
    padding: 12px;
    border-bottom: 1px solid #eaeded;
    font-size: 14px;
    color: #2c3e50;
  }
  .badge {
    padding: 4px 8px;
    border-radius: 99px;
    font-size: 11px;
    font-weight: 500;
    display: inline-block;
  }
  .badge.Mumtaz { background-color: #d4edda; color: #155724; }
  .badge.Jayyid { background-color: #d1ecf1; color: #0c5460; }
  .badge.Maqbul { background-color: #fff3cd; color: #856404; }
  
  .btn-table-del {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
  }

  /* Split Layout */
  .split-layout {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 30px;
    align-items: start;
  }
  .sidebar-form {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  }
  .sidebar-form h3 {
    margin-top: 0;
    color: #1a5f7a;
    margin-bottom: 15px;
  }
  .sidebar-form label {
    display: block;
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 13px;
    color: #7f8c8d;
    font-weight: 600;
  }
  .sidebar-form input, .sidebar-form select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .sidebar-form button {
    background-color: #1a5f7a;
    color: white;
    border: none;
    padding: 10px;
    width: 100%;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 15px;
  }
  .main-table {
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  }
  .main-table h3 {
    margin-top: 0;
    color: #1a5f7a;
    margin-bottom: 15px;
  }
</style>