
import type { Product } from "@/types/product";

const demoPrices: Record<string, number> = {
  "clothing": 35,
  "electronics": 150,
  "furniture": 250,
  "shoes": 65,
  "miscellaneous": 25,
};

export function getDisplayPrice(product: Product): number {
  const categoryName = product.category?.name?.toLowerCase() ?? "";

  for (const [category, price] of Object.entries(demoPrices)) {
    if (categoryName.includes(category)) {
      return price;
    }
  }

  // Fallback for categories without a specific demo price.
  const originalPrice = Number(product.price);

  if (Number.isFinite(originalPrice) && originalPrice > 0 && originalPrice <= 500) {
    return Math.round(originalPrice * 100) / 100;
  }

  return 40;
}
