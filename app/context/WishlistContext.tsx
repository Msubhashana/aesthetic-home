"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  affiliate_link?: string; // Optional for the wishlist view
};

type WishlistContextType = {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load wishlist from LocalStorage on startup (so they remember items after refresh)
  useEffect(() => {
    const saved = localStorage.getItem("aesthetic-wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  // Save to LocalStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("aesthetic-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // Remove it
        return prev.filter((item) => item.id !== product.id);
      } else {
        // Add it
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (id: number) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}