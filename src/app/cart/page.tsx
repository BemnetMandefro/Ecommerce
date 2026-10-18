
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getDisplayPrice } from "@/utils/prices";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartTotal,
  } = useCart();

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">Shopping Cart</h1>

      <p className="mb-8 text-gray-500">
        {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
      </p>

      {cartItems.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <p className="mb-4 text-lg">Your cart is empty.</p>
          <Link
            href="/products"
            className="inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <section className="space-y-4 md:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center"
              >
                <div className="flex h-28 w-full items-center justify-center rounded-lg bg-gray-100 p-2 sm:w-28 sm:shrink-0">
                  {item.product.images?.[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-sm text-gray-500">
                      No image
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${item.product.id}`}
                    className="font-semibold hover:underline"
                  >
                    {item.product.title}
                  </Link>

                  <p className="mt-2 text-gray-600">
                    ${Number(item.product.price).toFixed(2)} each
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="mt-3 text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${item.product.title}`}
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="h-9 w-9 rounded border text-lg hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="min-w-6 text-center font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    aria-label={`Increase quantity of ${item.product.title}`}
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="h-9 w-9 rounded border text-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold sm:w-24 sm:text-right">
                  ${(Number(item.product.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </section>

          <aside className="h-fit rounded-xl border p-6">
            <h2 className="mb-5 text-xl font-bold">Order Summary</h2>

            <div className="mb-3 flex justify-between">
              <span className="text-gray-600">Items</span>
              <span>{cartCount}</span>
            </div>

            <div className="mb-5 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <p className="mb-5 text-sm text-gray-500">
              Shipping and payment will be handled at checkout.
            </p>

            <Link
              href="/products"
              className="block rounded-lg border px-4 py-3 text-center font-semibold hover:bg-gray-50"
            >
              Continue Shopping
            </Link>

            <button
              type="button"
              disabled
              className="mt-3 w-full rounded-lg bg-gray-400 px-4 py-3 font-semibold text-white"
            >
              Checkout — coming next
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
