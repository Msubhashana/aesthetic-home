import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

// 1. This page receives the category from the URL (e.g., "Lighting")
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  
  const resolvedParams = await params;
  // Decode the URL (e.g., converts "Home%20Decor" back to "Home Decor")
  const categoryParam = decodeURIComponent(resolvedParams.category);

  // 2. Fetch products that match this category
  // We use .ilike() instead of .eq() so it is NOT case sensitive (Lighting vs lighting)
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .ilike('category', categoryParam);

  if (error) {
    console.error("Error fetching category:", error);
  }

  const displayProducts = products || [];

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-gray-500 mb-2 uppercase tracking-widest text-sm">Collection</p>
          <h1 className="text-4xl font-extrabold text-gray-900 capitalize">
            {categoryParam}
          </h1>
        </div>

        {/* Empty State */}
        {displayProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <h2 className="text-xl text-gray-600 mb-4">No products found in this category.</h2>
            <Link href="/" className="text-blue-600 font-medium hover:underline">
              View all products &rarr;
            </Link>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group">
                <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                  
                  <div className="aspect-square relative bg-gray-100 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      {product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}