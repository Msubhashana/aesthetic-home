import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ProductActions from "@/components/ProductActions";
import ImageGallery from "@/components/ImageGallery";
import { Metadata } from "next";

// --- FIX 1: generateMetadata (Updated for Pinterest) ---
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  // CRITICAL: We must "await" the params first in Next.js 15
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Debugging: Check your server console to see if the ID is printing correctly
  console.log("Metadata fetching ID:", id); 

  const { data: product } = await supabase
    .from('products')
    .select('name, description, image') // <--- ADDED 'image' HERE so Pinterest can see it
    .eq('id', id) 
    .single();

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    // ADDED THIS SECTION FOR PINTEREST RICH PINS
    openGraph: {
      title: product.name,
      description: product.description,
      url: `https://www.dailydecorfinds.com/product/${id}`, // Ensures the link goes to this specific product
      siteName: "Daily Decor Finds",
      images: [
        {
          url: product.image, // The image Pinterest will display
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: "website",
    },
  };
}

// --- FIX 2: Main Page Component (Kept exactly as you had it) ---
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  
  // CRITICAL: Await params here too
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

  if (error) {
    console.error("Supabase Error:", error);
  }

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

            <div className="prose text-gray-500 mb-10 leading-relaxed whitespace-pre-wrap">
              {product.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}