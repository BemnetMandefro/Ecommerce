
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";
import { getDisplayPrice } from "@/utils/prices";


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("Could not load products. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category.name))),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || product.category.name === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
          Discover something new
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">All Products</h1>
        <p className="mt-2 text-gray-500">
          Explore our collection and find your next favorite.
        </p>
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          aria-label="Search products"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border bg-white px-4 py-3"
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {categories.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border bg-white px-4 py-3"
          aria-label="Sort products"
        >
          <option value="default">Recommended</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {loading && <p className="py-10 text-center">Loading products...</p>}

      {!loading && error && (
        <p role="alert" className="py-10 text-center text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <p className="mb-5 text-sm text-gray-500">
            {filteredProducts.length} products found
          </p>

          {filteredProducts.length === 0 ? (
            <div className="rounded-xl border border-dashed p-10 text-center">
              <p className="font-semibold">No products found</p>
              <p className="mt-2 text-sm text-gray-500">
                Try another search or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-40 items-center justify-center bg-gray-50 p-4 sm:h-56">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        loading="lazy"
                        className="h-full w-full object-contain transition group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">
                        No image available
                      </span>
                    )}
                  </div>

                  <div className="p-3 sm:p-4">
                    <p className="mb-2 text-xs capitalize text-gray-500">
                      {product.category.name}
                    </p>
                    <h2 className="line-clamp-2 min-h-10 text-sm font-semibold sm:text-base">
                      {product.title}
                    </h2>
                    <p className="mt-3 font-bold text-blue-700">
                      ${getDisplayPrice(product).toFixed(2)}
                    </p>
                    <p className="mt-3 text-sm font-medium text-gray-600 group-hover:text-blue-700">
                      View product →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
