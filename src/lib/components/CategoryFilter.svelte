<script lang="ts">
  interface Props { categories: string[]; selected: string; }
  let { categories, selected = $bindable("all") }: Props = $props();
</script>

<nav aria-label="Product categories">
  <h3>Categories</h3>
  <ul>
    {#each categories as cat}
      <li>
        <button
          class="cat-btn"
          class:active={selected === cat}
          onclick={() => (selected = cat)}
          aria-pressed={selected === cat}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav { padding-top: 0.25rem; }
  h3 { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin-bottom: 0.75rem; }
  ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.25rem; }
  .cat-btn { width: 100%; text-align: left; padding: 0.5rem 0.75rem; background: none; border: none; border-radius: 0.5rem; cursor: pointer; font-size: 0.9375rem; color: #475569; transition: background 0.15s; }
  .cat-btn:hover { background: #f1f5f9; }
  .cat-btn.active { background: #eff6ff; color: #1e40af; font-weight: 600; }
</style>
