
import { getProducts } from "@/lib/api";
import ProductTable from "./ProductTable";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            STORE MANAGEMENT
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="mt-2 text-gray-600">
            View products currently available in your store.
          </p>
        </div>

        <ProductTable products={products} />

        <p className="mt-4 text-sm text-gray-500">
          Showing {products.length} products.
        </p>
      </div>
    </main>
  );
}
