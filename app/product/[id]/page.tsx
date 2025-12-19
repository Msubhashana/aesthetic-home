import Link from "next/link";
import { notFound } from "next/navigation";

// Mock Database
const products = [
  {
    id: 1,
    name: "Sunset Projection Lamp",
    price: "$24.99",
    category: "Lighting",
    description: "Bring the golden hour into your room anytime. 16 color modes with remote control. perfect for TikToks and cozy vibes.",
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 2,
    name: "Acrylic Desk Organizer",
    price: "$18.50",
    category: "Organization",
    description: "Clear, aesthetic storage for your pens, makeup, or tech accessories. Keeps your desk clutter-free and Instagram-ready.",
    image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=2083&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Minimalist Ceramic Vase",
    price: "$32.00",
    category: "Decor",
    description: "Handcrafted ceramic vase with a matte finish. The perfect statement piece for dried flowers or pampas grass.",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=1965&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Mechanical Keyboard 60%",
    price: "$89.99",
    category: "Tech",
    description: "Compact 60% layout with hot-swappable switches. RGB backlighting and premium keycaps for the ultimate typing experience.",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=2071&auto=format&fit=crop"
  }
];

// NOTE: We changed the type definition here to use Promise
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  
  // 1. Await the params to get the ID safely
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);

  // 2. Find the product
  const product = products.find((p) => p.id === productId);

  // 3. If no product found, show 404
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link href="/" className="text-gray-500 hover:text-black mb-8 inline-block">
          &larr; Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Image */}
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Details */}
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

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition transform active:scale-95">
                Add to Cart
              </button>
              <button className="p-4 border border-gray-200 rounded-full hover:bg-gray-50 transition">
                ❤️
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex gap-6 text-sm text-gray-500 border-t border-gray-100 pt-8">
              <div className="flex items-center gap-2">
                <span>🚚 Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🛡️ 1 Year Warranty</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}