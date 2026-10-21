
"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

;export default function Navbar() {
  const { isLoggedIn, isReady, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="border-b bg-white text-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Store<span className="text-blue-600">.</span>
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>

          <Link href="/cart" className="hover:text-blue-600">
  Cart ({cartCount})
</Link>

          {isReady &&
            (isLoggedIn ? (
              <button
                onClick={logout}
                className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-700"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="hover:text-blue-600">
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            ))}
        </div>
      </nav>
    </header>
  );
}
