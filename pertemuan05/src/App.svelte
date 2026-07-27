<script lang="ts">
  let isLoginMode = true;
  let username = "";
  let password = "";
  let message = "";
  let isSuccess = false;
  let token = localStorage.getItem("token") || "";

  async function handleAuth() {
    message = "";
    const endpoint = isLoginMode ? "/api/auth/login" : "/api/auth/register";
    try {
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || data.message || "Gagal melakukan autentikasi");
      }
      
      isSuccess = true;
      if (isLoginMode) {
        token = data.token;
        localStorage.setItem("token", data.token);
        message = "Login Berhasil!";
      } else {
        message = "Registrasi Berhasil! Silakan Login.";
        isLoginMode = true;
      }
      username = "";
      password = "";
    } catch (err: any) {
      isSuccess = false;
      message = err.message;
    }
  }

  function handleLogout() {
    token = "";
    localStorage.removeItem("token");
    message = "Berhasil logout.";
    isSuccess = true;
  }
</script>

<main>
  <div class="auth-container">
    {#if token}
      <div class="card logged-in">
        <h2>🔓 Mode Admin Aktif</h2>
        <p>Token Anda tersimpan di LocalStorage.</p>
        <button class="btn-logout" on:click={handleLogout}>Log Out / Keluar</button>
      </div>
    {:else}
      <div class="card">
        <h2>{isLoginMode ? "Masuk Admin" : "Daftar Admin Baru"}</h2>
        <form on:submit|preventDefault={handleAuth}>
          <input type="text" bind:value={username} placeholder="Username" required />
          <input type="password" bind:value={password} placeholder="Password" required />
          <button type="submit">{isLoginMode ? "Login" : "Register"}</button>
        </form>
        <p class="toggle-link">
          <button class="btn-link" on:click={() => isLoginMode = !isLoginMode}>
            {isLoginMode ? "Belum punya akun? Daftar" : "Sudah punya akun? Login"}
          </button>
        </p>
      </div>
    {/if}

    {#if message}
      <div class="alert" class:success={isSuccess}>{message}</div>
    {/if}
  </div>
</main>

<style>
  :global(body) {
    background-color: #e5e7eb;
    font-family: sans-serif;
  }
  .auth-container {
    max-width: 360px;
    margin: 100px auto;
  }
  .card {
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 12px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    box-sizing: border-box;
  }
  button[type="submit"] {
    background-color: #3b82f6;
    color: white;
    border: none;
    width: 100%;
    padding: 12px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }
  .btn-logout {
    background-color: #ef4444;
    color: white;
    border: none;
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn-link {
    background: none;
    border: none;
    color: #2563eb;
    cursor: pointer;
    text-decoration: underline;
  }
  .toggle-link {
    text-align: center;
    margin-top: 15px;
  }
  .alert {
    margin-top: 15px;
    padding: 10px;
    background-color: #fee2e2;
    color: #991b1b;
    border-radius: 4px;
    text-align: center;
  }
  .alert.success {
    background-color: #d1fae5;
    color: #065f46;
  }
</style>