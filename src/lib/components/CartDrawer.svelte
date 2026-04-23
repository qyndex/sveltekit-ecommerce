<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { cart } from "$lib/stores/cart.svelte";

  interface Props { open: boolean; }
  let { open }: Props = $props();

  const dispatch = createEventDispatcher<{ close: void }>();
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="overlay" onclick={() => dispatch("close")} aria-hidden="true"></div>
{/if}

<aside class="drawer" class:open aria-label="Shopping cart" aria-hidden={!open}>
  <div class="header">
    <h2>Cart ({cart.count})</h2>
    <button onclick={() => dispatch("close")} aria-label="Close cart">✕</button>
  </div>
  <div class="items">
    {#each cart.items as item (item.id)}
      <div class="item">
        <img src={item.image} alt={item.name} width="64" height="64" />
        <div class="item-info">
          <p class="item-name">{item.name}</p>
          <p class="item-price">${item.price.toFixed(2)}</p>
          <div class="qty">
            <button onclick={() => cart.updateQty(item.id, item.quantity - 1)} aria-label="Decrease quantity">−</button>
            <span aria-label="Quantity: {item.quantity}">{item.quantity}</span>
            <button onclick={() => cart.updateQty(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="remove" onclick={() => cart.remove(item.id)} aria-label="Remove {item.name}">✕</button>
      </div>
    {:else}
      <p class="empty">Your cart is empty.</p>
    {/each}
  </div>
  <div class="footer">
    <div class="total"><span>Total</span><span>${cart.total.toFixed(2)}</span></div>
    <a href="/checkout" class="checkout-btn">Proceed to Checkout</a>
    <button class="clear" onclick={() => cart.clear()}>Clear Cart</button>
  </div>
</aside>

<style>
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 40; }
  .drawer { position: fixed; right: 0; top: 0; bottom: 0; width: 380px; max-width: 100vw; background: white; z-index: 50; display: flex; flex-direction: column; transform: translateX(100%); transition: transform 0.3s; box-shadow: -4px 0 24px rgba(0,0,0,0.12); }
  .drawer.open { transform: translateX(0); }
  .header { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; border-bottom: 1px solid #f1f5f9; }
  h2 { font-size: 1.125rem; font-weight: 700; }
  .header button { background: none; border: none; cursor: pointer; font-size: 1.25rem; color: #94a3b8; }
  .items { flex: 1; overflow-y: auto; padding: 1rem 1.5rem; display: grid; gap: 1rem; align-content: start; }
  .item { display: grid; grid-template-columns: 64px 1fr auto; gap: 0.75rem; align-items: start; }
  .item img { width: 64px; height: 64px; object-fit: cover; border-radius: 0.5rem; }
  .item-name { font-size: 0.875rem; font-weight: 500; margin-bottom: 0.25rem; }
  .item-price { font-size: 0.875rem; color: #64748b; margin-bottom: 0.5rem; }
  .qty { display: flex; align-items: center; gap: 0.5rem; }
  .qty button { width: 1.5rem; height: 1.5rem; border: 1px solid #e2e8f0; border-radius: 0.25rem; background: white; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; }
  .qty span { font-size: 0.875rem; font-weight: 600; min-width: 1.5rem; text-align: center; }
  .remove { background: none; border: none; cursor: pointer; color: #94a3b8; font-size: 0.875rem; padding: 0.25rem; }
  .empty { text-align: center; color: #94a3b8; padding: 2rem 0; }
  .footer { padding: 1.25rem 1.5rem; border-top: 1px solid #f1f5f9; display: grid; gap: 0.75rem; }
  .total { display: flex; justify-content: space-between; font-weight: 700; font-size: 1rem; }
  .checkout-btn { display: block; text-align: center; padding: 0.75rem; background: #1e40af; color: white; text-decoration: none; border-radius: 0.5rem; font-weight: 600; }
  .clear { background: none; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 0.5rem; cursor: pointer; color: #94a3b8; font-size: 0.875rem; }
</style>
