<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Product } from "../routes/+page.server";

  interface Props { product: Product; }
  let { product }: Props = $props();

  const dispatch = createEventDispatcher<{ addToCart: void }>();

  let added = $state(false);

  function handleAdd() {
    dispatch("addToCart");
    added = true;
    setTimeout(() => (added = false), 1200);
  }
</script>

<article class="card">
  {#if product.badge}
    <span class="badge">{product.badge}</span>
  {/if}
  <img src={product.image} alt={product.name} loading="lazy" width="400" height="300" />
  <div class="info">
    <h3>{product.name}</h3>
    <div class="meta">
      <span class="rating" aria-label="{product.rating} out of 5">★ {product.rating}</span>
      <span class="reviews">({product.reviews})</span>
    </div>
    <div class="footer">
      <p class="price">${product.price.toFixed(2)}</p>
      <button
        class="add-btn"
        class:added
        onclick={handleAdd}
        aria-label="Add {product.name} to cart"
      >
        {added ? "✓ Added" : "Add to Cart"}
      </button>
    </div>
  </div>
</article>

<style>
  .card { position: relative; background: white; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.06); transition: box-shadow 0.2s; }
  .card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  .badge { position: absolute; top: 0.75rem; left: 0.75rem; background: #1e40af; color: white; font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 9999px; text-transform: uppercase; }
  img { width: 100%; height: 200px; object-fit: cover; }
  .info { padding: 1rem; }
  h3 { font-size: 0.9375rem; font-weight: 600; margin-bottom: 0.375rem; line-height: 1.3; }
  .meta { display: flex; align-items: center; gap: 0.25rem; margin-bottom: 0.75rem; }
  .rating { color: #f59e0b; font-size: 0.8125rem; font-weight: 600; }
  .reviews { color: #94a3b8; font-size: 0.75rem; }
  .footer { display: flex; justify-content: space-between; align-items: center; }
  .price { font-size: 1.125rem; font-weight: 700; color: #1e293b; }
  .add-btn { padding: 0.4rem 0.875rem; background: #1e40af; color: white; border: none; border-radius: 0.375rem; cursor: pointer; font-size: 0.8125rem; font-weight: 600; transition: background 0.2s; }
  .add-btn.added { background: #16a34a; }
</style>
