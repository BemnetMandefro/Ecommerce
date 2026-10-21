
export default function AdminPage() {
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
              href="/products"
              className="mt-5 inline-block font-medium text-blue-600 hover:text-blue-800"
            >
              View Products →
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
              href="/products"
              className="mt-5 inline-block font-medium text-blue-600 hover:text-blue-800"
            >
              Browse Store →
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
