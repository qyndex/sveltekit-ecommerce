<script lang="ts">
  import { goto } from "$app/navigation";
  import { supabase } from "$lib/supabase";

  let email = $state("");
  let password = $state("");
  let confirmPassword = $state("");
  let loading = $state(false);
  let error = $state("");
  let success = $state(false);

  async function handleSignup(e: Event) {
    e.preventDefault();
    error = "";

    if (password !== confirmPassword) {
      error = "Passwords do not match";
      return;
    }

    if (password.length < 6) {
      error = "Password must be at least 6 characters";
      return;
    }

    loading = true;

    const { error: err } = await supabase.auth.signUp({ email, password });

    if (err) {
      error = err.message;
      loading = false;
      return;
    }

    success = true;
    loading = false;
    // Redirect to login after a short delay to show confirmation
    setTimeout(() => goto("/auth/login"), 2000);
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div class="w-full max-w-sm space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold tracking-tight">Create an account</h1>
      <p class="mt-2 text-sm text-gray-600">Sign up to start shopping</p>
    </div>

    {#if error}
      <div class="rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</div>
    {/if}

    {#if success}
      <div class="rounded-md bg-green-50 p-3 text-sm text-green-700" role="status">
        Account created! Check your email to confirm your address.
      </div>
    {/if}

    <form class="space-y-4" onsubmit={handleSignup}>
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
          autocomplete="new-password"
          aria-label="Password"
          minlength="6"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label for="confirm-password" class="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          bind:value={confirmPassword}
          type="password"
          required
          autocomplete="new-password"
          aria-label="Confirm password"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading || success}
        aria-label="Create account"
        class="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Sign Up"}
      </button>
    </form>

    <p class="text-center text-sm text-gray-600">
      Already have an account?
      <a href="/auth/login" class="text-indigo-600 hover:underline">Sign in</a>
    </p>
  </div>
</div>
