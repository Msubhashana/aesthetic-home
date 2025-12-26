"use client";

import { useWishlist } from "@/app/context/WishlistContext";

export default function ProductActions({ product }: { product: any }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(product.id);

  return (
    <div className="flex items-center gap-4 mb-12">
      {/* 1. BUY NOW BUTTON - Redirects to Amazon/AliExpress */}
      <a 
        href={product.affiliate_link || "#"} 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-black text-white px-15 py-4 rounded-full font-bold hover:bg-gray-800 transition transform active:scale-95 text-center flex items-center justify-center gap-3"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        Buy Now
      </a>

      {/* 2. WISHLIST BUTTON - Toggles State */}
      <button 
        onClick={() => toggleWishlist(product)}
        className={`cursor-pointer p-4 border rounded-full transition ${
          isSaved ? "bg-red-50 border-red-200 text-red-500" : "border-gray-200 hover:bg-gray-50 text-gray-400"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
    </div>
  );
}