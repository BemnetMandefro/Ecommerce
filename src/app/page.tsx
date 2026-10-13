import { getProducts, getCategories } from "@/lib/api";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Store</h1>
      <p className="text-zinc-600 mb-8">
        Browse our catalog of quality products across every category.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <span
              key={category.id}
              className="border rounded-full px-4 py-1.5 text-sm"
            >
              {category.name}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          Featured Products ({products.length})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <p className="font-semibold">{product.title}</p>
              <p className="text-zinc-600">${product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}