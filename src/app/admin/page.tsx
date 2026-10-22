
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
  const { isReady, isLoggedIn, accessToken } = useAuth();
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isReady) return;

    if (!isLoggedIn || !accessToken) {
      router.replace("/login");
      return;
    }

    let cancelled = false;

    async function checkAdminAccess() {
      setChecking(true);
      setError("");

      try {
        const response = await fetch("/api/admin/check", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        });

        if (response.status === 401 || response.status === 403) {
          router.replace("/");
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to verify admin access.");
        }

        const data = await response.json();

        if (!cancelled) {
          setAuthorized(data.isAdmin === true);
        }

        if (data.isAdmin !== true) {
          router.replace("/");
        }
      } catch {
        if (!cancelled) {
          setError(
            "We couldn't verify admin access. Please refresh and try again."
          );
        }
      } finally {
        if (!cancelled) {
          setChecking(false);
        }
      }
    }

    void checkAdminAccess();

    return () => {
      cancelled = true;
    };
  }, [isReady, isLoggedIn, accessToken, router]);

  if (!isReady || checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Checking admin access...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <p role="alert" className="text-center text-red-600">
          {error}
        </p>
      </main>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            STORE MANAGEMENT
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your store products, categories, and users.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Products
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              View and manage your store products.
            </p>
            <a
              href="/admin/products"
              className="mt-5 inline-block font-medium text-blue-600 hover:text-blue-800"
            >
              Manage Products →
            </a>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Categories
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Browse your product categories.
            </p>
            <a
              href="/admin/categories"
              className="mt-5 inline-block font-medium text-blue-600 hover:text-blue-800"
            >
              Manage Categories →
            </a>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Users
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              User management tools will be added next.
            </p>
            <span className="mt-5 inline-block text-sm text-gray-400">
              Coming soon
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

