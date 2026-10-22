
import { getCategories } from "@/lib/api";
import AdminGuard from "@/components/ui/AdminGuard";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <AdminGuard>
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-medium text-blue-600">
              STORE MANAGEMENT
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Categories
            </h1>
            <p className="mt-2 text-gray-600">
              View the categories available in your store.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-5 py-4">ID</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Slug</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-5 py-4">{category.id}</td>
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {"slug" in category ? category.slug : "—"}
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-5 py-10 text-center text-gray-500"
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <a
            href="/admin"
            className="mt-6 inline-block font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back to Dashboard
          </a>
        </div>
      </main>
    </AdminGuard>
  );
}
