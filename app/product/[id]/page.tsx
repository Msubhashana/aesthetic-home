import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ProductActions from "@/components/ProductActions";
import ImageGallery from "@/components/ImageGallery";

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

  // 1. Log actual database errors (Connection issues, etc.)
  if (error) {
    console.error("Supabase Error:", error);
  }

  // 2. If no product exists (Deleted or wrong ID), just show 404 page silently
  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Image */}
          <div className="h-full">
            <ImageGallery 
              mainImage={product.image} 
              gallery={product.gallery} 
            />
          </div>

          {/* Details */}
          <div>
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-gray-900 mb-8">
              {product.price}
            </p>
            <ProductActions product={product} />

            <div className="prose text-gray-500 mb-10 leading-relaxed">
              {product.description}
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}