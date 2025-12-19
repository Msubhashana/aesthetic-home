import Link from "next/link";
import { supabase } from "@/lib/supabaseClient"; 

// 1. Define what a Product looks like (TypeScript Safety)
interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
}

// 2. Make the component 'async' so it can fetch data
export default async function FeaturedProducts() {
  
  // 3. Ask Supabase for the products
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true }) // Keep them in order
    .limit(8);

  // Error handling (just in case)
  if (error) {
    console.error("Error loading products:", error);
  }

  // Safety check: if data is missing, use empty array
  const displayProducts = products || [];

  return (
    
    <section id="trending" className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
        <Link href="/products" className="text-blue-600 font-medium hover:underline">
          View All &rarr;
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group">
            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
              
              {/* Product Image */}
              <div className="aspect-square relative bg-gray-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 text-xs font-bold rounded">
                  NEW
                </span>
              </div>

              {/* Product Info */}
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
    </section>
  );
}