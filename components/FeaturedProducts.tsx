import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default async function FeaturedProducts() {
  
  // UPDATED QUERY: Only fetch products where 'is_trending' is TRUE
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_trending', true) // <--- THIS IS THE KEY CHANGE
    .order('created_at', { ascending: false });

  if (!products || products.length === 0) {
    return (
      <section id="vibes" className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Trending Now</h2>
        <p className="text-gray-500">No trending items yet. Check back soon!</p>
      </section>
    );
  }

  return (
    <section id="vibes" className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Trending Now</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group block">
            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
              <div className="aspect-square relative bg-gray-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.category}</p>
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                <p className="text-lg font-bold text-gray-900 mt-2">{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}