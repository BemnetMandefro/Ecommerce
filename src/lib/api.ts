import { Product, Category } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data: Product[] = await response.json();
  return data;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data: Product = await response.json();
  return data;
}
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data: Category[] = await response.json();
  return data;
}