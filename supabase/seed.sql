-- Seed data for sveltekit-ecommerce

-- Categories
INSERT INTO public.categories (id, name, slug) VALUES
  ('10000000-0000-0000-0000-000000000001', 'Electronics', 'electronics'),
  ('10000000-0000-0000-0000-000000000002', 'Accessories', 'accessories'),
  ('10000000-0000-0000-0000-000000000003', 'Kitchen', 'kitchen'),
  ('10000000-0000-0000-0000-000000000004', 'Home Office', 'home-office'),
  ('10000000-0000-0000-0000-000000000005', 'Clothing', 'clothing')
ON CONFLICT (id) DO NOTHING;

-- Products
INSERT INTO public.products (name, description, price, image_url, category_id, rating, review_count, badge, in_stock) VALUES
  (
    'Wireless Headphones Pro',
    'Premium over-ear headphones with active noise cancellation, 40-hour battery life, and Hi-Res audio certification.',
    149.99,
    'https://placehold.co/800x600/1e40af/ffffff?text=Headphones',
    '10000000-0000-0000-0000-000000000001',
    4.7, 328, 'Best Seller', true
  ),
  (
    'Mechanical Keyboard TKL',
    'Tenkeyless mechanical keyboard with Cherry MX switches, per-key RGB lighting, and detachable USB-C cable.',
    129.99,
    'https://placehold.co/800x600/1e40af/ffffff?text=Keyboard',
    '10000000-0000-0000-0000-000000000001',
    4.6, 214, null, true
  ),
  (
    '4K Webcam 60fps',
    'Ultra-sharp 4K webcam with auto-focus, dual noise-cancelling mics, and privacy shutter.',
    89.99,
    'https://placehold.co/800x600/1e40af/ffffff?text=Webcam',
    '10000000-0000-0000-0000-000000000001',
    4.4, 97, 'New', true
  ),
  (
    'Leather Minimal Wallet',
    'Handcrafted full-grain leather slim wallet. Holds up to 8 cards with RFID blocking.',
    49.99,
    'https://placehold.co/800x600/64748b/ffffff?text=Wallet',
    '10000000-0000-0000-0000-000000000002',
    4.5, 156, null, true
  ),
  (
    'Bamboo Desk Organiser',
    'Eco-friendly bamboo desk organiser with 6 compartments. Keeps your workspace tidy.',
    39.99,
    'https://placehold.co/800x600/64748b/ffffff?text=Organiser',
    '10000000-0000-0000-0000-000000000002',
    4.3, 72, null, true
  ),
  (
    'Canvas Tote Bag',
    'Heavy-duty 12oz canvas tote bag with reinforced handles and inner zip pocket.',
    24.99,
    'https://placehold.co/800x600/64748b/ffffff?text=Tote+Bag',
    '10000000-0000-0000-0000-000000000002',
    4.2, 189, null, true
  ),
  (
    'Ceramic Pour-Over Set',
    'Handmade ceramic pour-over coffee set with matching carafe and stand. Brews 2-3 cups.',
    79.99,
    'https://placehold.co/800x600/f59e0b/ffffff?text=Pour+Over',
    '10000000-0000-0000-0000-000000000003',
    4.9, 87, 'New', true
  ),
  (
    'Cast Iron Skillet 12-inch',
    'Pre-seasoned cast iron skillet perfect for searing, frying, baking and grilling.',
    64.99,
    'https://placehold.co/800x600/f59e0b/ffffff?text=Skillet',
    '10000000-0000-0000-0000-000000000003',
    4.8, 445, null, true
  ),
  (
    'Stainless Steel Water Bottle',
    'Triple-wall vacuum insulated 32oz water bottle. Keeps drinks cold 24h, hot 12h.',
    34.99,
    'https://placehold.co/800x600/f59e0b/ffffff?text=Water+Bottle',
    '10000000-0000-0000-0000-000000000003',
    4.6, 312, null, true
  ),
  (
    'Adjustable Monitor Stand',
    'Aluminium monitor stand with adjustable height and tilt. Includes cable management.',
    69.99,
    'https://placehold.co/800x600/334155/ffffff?text=Monitor+Stand',
    '10000000-0000-0000-0000-000000000004',
    4.5, 143, null, true
  ),
  (
    'Ergonomic Laptop Stand',
    'Portable laptop stand with 6 adjustable angles. Folds flat for travel.',
    44.99,
    'https://placehold.co/800x600/334155/ffffff?text=Laptop+Stand',
    '10000000-0000-0000-0000-000000000004',
    4.7, 208, 'Best Seller', true
  ),
  (
    'Merino Wool Beanie',
    '100% merino wool beanie, naturally temperature regulating and itch-free.',
    29.99,
    'https://placehold.co/800x600/7c3aed/ffffff?text=Beanie',
    '10000000-0000-0000-0000-000000000005',
    4.4, 93, null, true
  )
ON CONFLICT DO NOTHING;
