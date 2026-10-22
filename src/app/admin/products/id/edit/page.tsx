
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import AdminGuard from "@/components/ui/AdminGuard";
import type { Product } from "@/types/product";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const { accessToken } = useAuth();
  const id = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setTitle(data.title);
        setPrice(String(data.price));
        setDescription(data.description);
        setCategoryId(String(data.category?.id ?? ""));
        setImage(data.images?.[0] ?? "");
      } catch {
        setError("Could not load this product.");
      } finally {
        setLoading(false);
      }
    }

    if (Number.isInteger(id) && id > 0) {
      loadProduct();
    } else {
      setError("Invalid product ID.");
      setLoading(false);
    }
  }, [id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!accessToken) {
      setError("Please log in again.");
      return;
    }

    if (!title.trim() || !description.trim() || !categoryId) {
      setError("Please complete all fields.");
      return;
    }

    const numericPrice = Number(price);
    const numericCategoryId = Number(categoryId);

    if (
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0 ||
      !Number.isInteger(numericCategoryId) ||
      numericCategoryId <= 0
    ) {
      setError("Enter a valid price and category ID.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          price: numericPrice,
          description: description.trim(),
          categoryId: numericCategoryId,
          images: image.trim() ? [image.trim()] : [],
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Could not update product (${response.status}).`
        );
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminGuard>
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Edit Product
          </h1>
          <p className="mb-8 text-gray-600">
            Update the product information.
          </p>

          {loading ? (
            <p className="text-gray-600">Loading product...</p>
          ) : !product ? (
            <p className="rounded-lg bg-red-50 p-4 text-red-700">
              {error || "Product not found."}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
            >
              <div>
                <label className="mb-2 block font-medium">Product name</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">Price</label>
                <input
                  required
                  min="0.01"
                  step="0.01"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Category ID
                </label>
                <input
                  required
                  min="1"
                  step="1"
                  type="number"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Image URL
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/admin/products")}
                  className="rounded-lg border px-5 py-3 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </AdminGuard>
  );
}
