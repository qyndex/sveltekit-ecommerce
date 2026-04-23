<script lang="ts">
  import ProductCard from "$lib/components/ProductCard.svelte";
  import CartDrawer from "$lib/components/CartDrawer.svelte";
  import CategoryFilter from "$lib/components/CategoryFilter.svelte";
  import { cart } from "$lib/stores/cart.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let selectedCategory = $state("all");
  let cartOpen = $state(false);

  let visibleProducts = $derived(
    selectedCategory === "all"
      ? data.products
      : data.products.filter((p) => p.category === selectedCategory)
  );
</script>

<svelte:head><title>Shop — Discover great products</title></svelte:head>

<header class="shop-header">
  <div class="container">
    <h1>Shop</h1>
    <button
      class="cart-btn"
      onclick={() => (cartOpen = true)}
      aria-label="Open cart, {cart.count} items"
    >
      🛒 Cart <span class="badge">{cart.count}</span>
    </button>
  </div>
</header>

<div class="shop-body container">
  <aside aria-label="Category filter">
    <CategoryFilter
      categories={data.categories}
      bind:selected={selectedCategory}
    />
  </aside>
  <main>
    <p class="count">{visibleProducts.length} products</p>
    <div class="grid" aria-label="Product listing">
      {#each visibleProducts as product (product.id)}
        <ProductCard {product} on:addToCart={() => cart.add(product)} />
      {/each}
    </div>
  </main>
</div>

<CartDrawer open={cartOpen} on:close={() => (cartOpen = false)} />

<style>
  .shop-header { background: white; border-bottom: 1px solid #f1f5f9; padding: 1rem 0; }
  .container { max-width: 72rem; margin: 0 auto; padding: 0 1.5rem; }
  .shop-header .container { display: flex; justify-content: space-between; align-items: center; }
  h1 { font-size: 1.5rem; font-weight: 700; }
  .cart-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: #1e40af; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600; }
  .badge { background: white; color: #1e40af; border-radius: 9999px; padding: 0 0.4rem; font-size: 0.75rem; font-weight: 700; }
  .shop-body { display: grid; grid-template-columns: 200px 1fr; gap: 2rem; padding-top: 2rem; padding-bottom: 3rem; }
  .count { color: #94a3b8; font-size: 0.875rem; margin-bottom: 1rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem; }
</style>
