"use client";

import Link from "next/link";
import { useWishlist } from "@/app/context/WishlistContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();

  // 1. Empty State (If no items saved)
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you haven't found your vibe yet. Go back and save some aesthetic items!
        </p>
        <Link href="/" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  // 2. The Wishlist Grid
  return (
    <div className="min-h-screen bg-white py-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-gray-900">Your Wishlist ({wishlist.length})</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {wishlist.map((product) => (
          <div key={product.id} className="group flex flex-col">
            
            {/* Image Card */}
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              
              {/* Remove Button (X) */}
              <button 
                onClick={() => toggleWishlist(product)}
                className="absolute top-2 right-2 bg-white/80 backdrop-blur p-2 rounded-full shadow-sm hover:bg-red-50 text-gray-500 hover:text-red-500 transition cursor-pointer"
                title="Remove from Wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Info */}
            <Link href={`/product/${product.id}`} className="flex-grow">
              <h3 className="font-bold text-lg mb-1 text-gray-900 hover:underline">{product.name}</h3>
            </Link>
            <p className="text-gray-500 mb-4">{product.price}</p>
            
            {/* Buy Button */}
            <a 
              href={product.affiliate_link || "#"} 
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-black text-white text-center py-3 rounded-xl font-bold hover:bg-gray-800 transition cursor-pointer"
            >
              Buy Now ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}