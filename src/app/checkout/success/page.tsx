
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-9 w-9 text-green-600" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Order placed successfully!
        </h1>

        <p className="mt-3 text-gray-600">
          Thank you for shopping with us. Your checkout was completed
          successfully.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
          >
            Continue shopping
          </Link>

          <Link
            href="/"
            className="rounded-lg border px-6 py-3 font-medium hover:bg-gray-50"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
