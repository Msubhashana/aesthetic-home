import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Sunset Projection Lamp",
    price: "$24.99",
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 2,
    name: "Acrylic Desk Organizer",
    price: "$18.50",
    category: "Organization",
    image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=2083&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Minimalist Ceramic Vase",
    price: "$32.00",
    category: "Decor",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=1965&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Mechanical Keyboard 60%",
    price: "$89.99",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=2071&auto=format&fit=crop"
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
        <Link href="/products" className="text-blue-600 font-medium hover:underline">
          View All &rarr;
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group">
            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
              {/* Product Image */}
              <div className="aspect-square relative bg-gray-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                {/* 'New' Badge */}
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