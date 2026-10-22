
import { getUsers } from "@/lib/api";
import AdminGuard from "@/components/ui/AdminGuard";

export default async function AdminUsersPage() {
  let users: Awaited<ReturnType<typeof getUsers>> = [];
  let error = "";

  try {
    users = await getUsers();
  } catch (err) {
  error =
    err instanceof Error
      ? err.message
      : "Unable to load users. Please try again later.";
}

  return (
    <AdminGuard>
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-medium text-blue-600">
              STORE MANAGEMENT
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Users
            </h1>
            <p className="mt-2 text-gray-600">
              View registered user information.
            </p>
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
              {error}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-5 py-4">ID</th>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Role</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-5 py-4">{user.id}</td>
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-5 py-4">{user.email}</td>
                      <td className="px-5 py-4">
                        {user.role ?? "Customer"}
                      </td>
                    </tr>
                  ))}

                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-5 py-10 text-center text-gray-500"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

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
