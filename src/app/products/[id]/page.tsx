
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/api";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

export default function ProductDetailsPage() {
  const { addToCart } = useCart();
  const params = useParams();
  const id = params.id as string;
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(productId);
        setProduct(data);
      } catch {
        setError("Could not load this product. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    if (id && !Number.isNaN(productId)) {
      loadProduct();
    }
  }, [id, productId]);

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <p className="text-lg">Loading product...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-6xl p-6">
        <p className="mb-4 text-red-600">
          {error || "Product not found."}
        </p>
        <Link
          href="/products"
          className="text-blue-600 underline"
        >
          Back to products
        </Link>
      </main>
    );
  }

  const image = product.images?.[0];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Link
        href="/products"
        className="mb-6 inline-block text-sm text-blue-600 hover:underline"
      >
        ← Back to products
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex min-h-80 items-center justify-center rounded-xl bg-gray-100 p-4">
          {image ? (
            <img
              src={image}
              alt={product.title}
              className="max-h-96 w-full rounded-lg object-contain"
            />
          ) : (
            <p className="text-gray-500">No image available</p>
          )}
        </div>

        <div className="flex flex-col items-start">
          <p className="mb-2 text-sm text-gray-500">
            {product.category?.name || "Uncategorized"}
          </p>

          <h1 className="mb-4 text-3xl font-bold">
            {product.title}
          </h1>

          <p className="mb-5 text-2xl font-semibold">
            ${Number(product.price).toFixed(2)}
          </p>

          <p className="mb-8 leading-7 text-gray-600">
            {product.description || "No description available."}
          </p>

          
<button
  type="button"
  onClick={() => addToCart(product)}
  className="rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
>
  Add to Cart
</button>

        </div>
      </div>
    </main>
  );
}
