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

type CreateProductInput = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};

export async function createProduct(
  product: CreateProductInput,
  accessToken: string
): Promise<Product> {
  if (!BASE_URL) {
    throw new Error("API URL is not configured.");
  }

  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId,
      images: product.images,
    }),
  });

  if (!response.ok) {
    throw new Error(`Could not create product (${response.status}).`);
  }

  return response.json();
}

export type StoreUser = {
  id: number;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
};

export async function getUsers(): Promise<StoreUser[]> {
  if (!BASE_URL) {
    throw new Error("API URL is not configured.");
  }

  const response = await fetch(`${BASE_URL}/users`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Could not load users (${response.status}).`);
  }

  return response.json();
}
