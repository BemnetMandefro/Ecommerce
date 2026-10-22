
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import type { Category } from "@/types/product";
import AdminGuard from "@/components/ui/AdminGuard";
import { useAuth } from "@/context/AuthContext";

function CategoryOptions({
  categories,
  value,
  onChange,
}: {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select
      required
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-lg border px-4 py-3"
    >
      <option value="">Choose a category</option>
      {categories.map((category) => (
        <option key={category.id} value={String(category.id)}>
          {category.name} (ID: {category.id})
        </option>
      ))}
    </select>
  );
}

export default function AddProductPage() {
  const { accessToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryError, setCategoryError] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() =>
        setCategoryError("Could not load categories. Please refresh.")
      );
  }, []);

  
async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setMessage("");

  if (!accessToken) {
    setMessage("Please log in again before creating a product.");
    return;
  }

  const parsedPrice = Number(price);
  const parsedCategoryId = Number(categoryId);

  if (
    !Number.isFinite(parsedPrice) ||
    parsedPrice <= 0 ||
    !Number.isInteger(parsedCategoryId) ||
    parsedCategoryId <= 0
  ) {
    setMessage("Please enter a valid price and choose a category.");
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title: title.trim(),
        price: parsedPrice,
        description: description.trim(),
        categoryId: parsedCategoryId,
        images: [image.trim()],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not create product.");
    }

    setMessage(`Product "${data.title}" was created successfully.`);
  } catch (error) {
    setMessage(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
}


  return (
    <AdminGuard>
      <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin/products"
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to products
        </Link>

        <h1 className="mt-5 text-3xl font-bold text-gray-900">
          Add Product
        </h1>
        <p className="mt-2 text-gray-600">
          Enter product information below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-xl border bg-white p-6 shadow-sm"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Product name
            </label>
            <input
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border px-4 py-3"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Price ($)
            </label>
            <input
              required
              type="number"
              min="0.01"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="w-full rounded-lg border px-4 py-3"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <CategoryOptions
              categories={categories}
              value={categoryId}
              onChange={setCategoryId}
            />

            {categoryError && (
              <p className="mt-2 text-sm text-red-600">
                {categoryError}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Image URL
            </label>
            <input
              required
              type="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              className="w-full rounded-lg border px-4 py-3"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-lg border px-4 py-3"
              placeholder="Describe the product"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
          {isSubmitting ? "Creating Product..." : "Create Product"}
          </button>

          {message && (
            <p
              role="status"
              className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800"
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
    </AdminGuard>
  );
}
