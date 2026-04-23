<script lang="ts">
  import "../app.css";
  import Nav from "$lib/components/Nav.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { authStore } from "$lib/stores/auth.svelte";
  import type { LayoutData } from "./$types";

  let { data, children }: { data: LayoutData; children: import("svelte").Snippet } = $props();

  // Sync server-provided user into client-side auth store
  $effect(() => {
    authStore.setUser(data.user ?? null);
  });
</script>

<Nav user={data.user ?? null} />
{@render children()}
<Footer />
