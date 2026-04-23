import type { PageServerLoad } from "./$types";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
}

export const load: PageServerLoad = async () => {
  const products: Product[] = [
    { id: "p1", name: "Wireless Headphones Pro", price: 149.99, image: "https://placehold.co/400x300?text=Headphones", category: "electronics", rating: 4.7, reviews: 328, badge: "Best Seller" },
    { id: "p2", name: "Leather Minimal Wallet", price: 49.99, image: "https://placehold.co/400x300?text=Wallet", category: "accessories", rating: 4.5, reviews: 156 },
    { id: "p3", name: "Ceramic Pour-Over Set", price: 79.99, image: "https://placehold.co/400x300?text=Coffee", category: "kitchen", rating: 4.9, reviews: 87, badge: "New" },
    { id: "p4", name: "Mechanical Keyboard TKL", price: 129.99, image: "https://placehold.co/400x300?text=Keyboard", category: "electronics", rating: 4.6, reviews: 214 },
    { id: "p5", name: "Bamboo Desk Organiser", price: 39.99, image: "https://placehold.co/400x300?text=Organiser", category: "accessories", rating: 4.3, reviews: 72 },
    { id: "p6", name: "Cast Iron Skillet 12-inch", price: 64.99, image: "https://placehold.co/400x300?text=Skillet", category: "kitchen", rating: 4.8, reviews: 445 },
  ];

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return { products, categories };
};
