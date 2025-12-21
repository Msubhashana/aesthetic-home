import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ProductActions from "@/components/ProductActions";

// 1. This is a Server Component, so it can talk to the DB directly
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  // 2. Fetch the specific product from Supabase
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId) // "eq" means "Equals"
    .single(); // We expect only one result

  // 3. Handle errors (Product not found)
  if (error || !product) {
    console.error("Error fetching product:", error);
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        
        <Link href="/#trending" className="text-gray-500 hover:text-black mb-8 inline-block">
          &larr; Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Image */}
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">
              {product.category}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-gray-900 mb-8">
              {product.price}
            </p>

            <div className="prose text-gray-500 mb-10 leading-relaxed">
              {product.description}
            </div>

            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}