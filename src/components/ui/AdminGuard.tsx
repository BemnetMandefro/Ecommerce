
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminGuard({
  children,
}: {
  children: ReactNode;
}) {
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

  if (!authorized) return null;

  return <>{children}</>;
}
