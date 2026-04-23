<script lang="ts">
  import { goto } from "$app/navigation";
  import { supabase } from "$lib/supabase";

  let email = $state("");
  let password = $state("");
  let loading = $state(false);
  let error = $state("");

  async function handleLogin(e: Event) {
    e.preventDefault();
    loading = true;
    error = "";

    const { error: err } = await supabase.auth.signInWithPassword({ email, password });

    if (err) {
      error = err.message;
      loading = false;
      return;
    }
    goto("/");
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div class="w-full max-w-sm space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold tracking-tight">Welcome back</h1>
      <p class="mt-2 text-sm text-gray-600">Sign in to your account</p>
    </div>

    {#if error}
      <div class="rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</div>
    {/if}

    <form class="space-y-4" onsubmit={handleLogin}>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          bind:value={email}
          type="email"
          required
          autocomplete="email"
          aria-label="Email address"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          bind:value={password}
          type="password"
          required
          autocomplete="current-password"
          aria-label="Password"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        aria-label="Sign in"
        class="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>

    <p class="text-center text-sm text-gray-600">
      Don't have an account?
      <a href="/auth/signup" class="text-indigo-600 hover:underline">Sign up</a>
    </p>
  </div>
</div>
