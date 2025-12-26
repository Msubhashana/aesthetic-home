"use client";

import Link from "next/link";
import { useWishlist } from "@/app/context/WishlistContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();

  // 1. Empty State
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
          <div key={product.id} className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
            
            {/* --- IMAGE AREA --- */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              
              {/* NEW: Wrap the image in a Link */}
              <Link href={`/product/${product.id}`} className="block w-full h-full">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </Link>
              
              {/* Red Cross (Stays OUTSIDE the Link so it doesn't trigger navigation) */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Double safety: Prevents click from bubbling up
                  toggleWishlist(product);
                }}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-red-500 hover:bg-red-50 hover:scale-110 transition cursor-pointer z-10"
                title="Remove from Wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* --- INFO AREA --- */}
            <div className="p-5 flex flex-col flex-grow">
              
              {/* Name */}
              <Link href={`/product/${product.id}`}>
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 hover:text-blue-600 transition">
                  {product.name}
                </h3>
              </Link>
              
              {/* Price */}
              <p className="text-xl font-bold text-gray-900 mb-6">
                {product.price}
              </p>
              
              {/* Buy Button */}
              <div className="mt-auto">
                <a 
                  href={product.affiliate_link || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-black text-white text-center py-3 rounded-xl font-bold hover:bg-gray-800 transition transform active:scale-95 flex items-center justify-center gap-2"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  Buy Now
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}