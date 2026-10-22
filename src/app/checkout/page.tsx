
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const cart = useCart() as unknown as {
    clearCart: () => void;
    cartItems?: Array<{
      id: string | number;
      title: string;
      price: number;
      quantity: number;
    }>;
  };
  const { clearCart } = cart;
  const items = cart.cartItems ?? [];

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!user) {
      router.push("/login?redirect=/checkout");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty. Add products before checking out.");
      return;
    }

    // This project uses a simulated checkout, not real payment processing.
    clearCart();
    router.push("/checkout/success");
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="mt-4 text-gray-600">
          Please log in before completing your order.
        </p>
        <Link
          href="/login?redirect=/checkout"
          className="mt-6 inline-block rounded-lg bg-black px-5 py-3 text-white"
        >
          Log in to continue
        </Link>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-3 text-gray-600">
          Add some products before checking out.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-black px-5 py-3 text-white"
        >
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="mt-2 text-gray-600">
        Enter your delivery details to place your simulated order.
      </p>

      <div className="mt-8 rounded-xl border p-6">
        <h2 className="text-xl font-semibold">Order summary</h2>

        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between gap-4 text-sm"
            >
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-between border-t pt-4 font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleCheckout} className="mt-8 space-y-5">
        <h2 className="text-xl font-semibold">Delivery details</h2>

        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Full name
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border px-4 py-3"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Delivery address
          </label>
          <textarea
            id="address"
            required
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="w-full rounded-lg border px-4 py-3"
            placeholder="Your delivery address"
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Phone number
          </label>
          <input
            id="phone"
            required
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="w-full rounded-lg border px-4 py-3"
            placeholder="Your phone number"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
        >
          Place order
        </button>
      </form>
    </main>
  );
}
