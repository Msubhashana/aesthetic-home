"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation"; // <--- 1. Import this hook

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // <--- 2. Get the current URL path

  // Helper to check if a link is active
  // exact = true means path must match exactly (for Home page "/")
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-1xl uppercase">D</span>AILY
          <span className="text-1xl uppercase">D</span>ECOR
          <span className="text-blue-600 text-1xl uppercase">F</span>
          <span className="text-blue-600">INDS</span>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden md:flex gap-8 items-center h-full"> {/* Added h-full to align borders */}
          
          <Link 
            href="/" 
            className={`h-full flex items-center transition font-medium border-b-2 ${
              isActive("/") 
                ? "border-blue-600 text-black" 
                : "border-transparent text-gray-600 hover:text-black hover:border-gray-200"
            }`}
          >
            Home
          </Link>

          <Link 
            href="/products/Lighting" 
            className={`h-full flex items-center transition font-medium border-b-2 ${
              isActive("/products/Lighting") 
                ? "border-blue-600 text-black" 
                : "border-transparent text-gray-600 hover:text-black hover:border-gray-200"
            }`}
          >
            Lighting
          </Link>

          <Link 
            href="/products/Decor" 
            className={`h-full flex items-center transition font-medium border-b-2 ${
              isActive("/products/Decor") 
                ? "border-blue-600 text-black" 
                : "border-transparent text-gray-600 hover:text-black hover:border-gray-200"
            }`}
          >
            Decor
          </Link>

          <Link 
            href="/products/Tech" 
            className={`h-full flex items-center transition font-medium border-b-2 ${
              isActive("/products/Tech") 
                ? "border-blue-600 text-black" 
                : "border-transparent text-gray-600 hover:text-black hover:border-gray-200"
            }`}
          >
            Tech
          </Link>

          <Link 
            href="/products/Organizer" 
            className={`h-full flex items-center transition font-medium border-b-2 ${
              isActive("/products/Organizer") 
                ? "border-blue-600 text-black" 
                : "border-transparent text-gray-600 hover:text-black hover:border-gray-200"
            }`}
          >
            Organizer
          </Link>

          {/* Wishlist (Red Line) */}
          <Link 
            href="/wishlist" 
            className={`h-full flex items-center gap-2 transition font-medium border-b-2 ${
              isActive("/wishlist") 
                ? "border-red-600 text-red-700" 
                : "border-transparent text-red-600 hover:text-red-700 hover:border-red-100"
            }`}
          >
            Wishlist
          </Link>

        </div>

        {/* --- MOBILE MENU BUTTON --- */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white absolute w-full shadow-xl">
          <div className="flex flex-col p-4 space-y-4">
            
            {/* Added logic to Mobile Menu too so the text color changes */}
            <Link 
              href="/" 
              className={`text-lg font-medium ${isActive("/") ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <Link 
              href="/products/Lighting" 
              className={`text-lg font-medium ${isActive("/products/Lighting") ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"}`}
              onClick={() => setIsOpen(false)}
            >
              Lighting
            </Link>

            <Link 
              href="/products/Decor" 
              className={`text-lg font-medium ${isActive("/products/Decor") ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"}`}
              onClick={() => setIsOpen(false)}
            >
              Decor
            </Link>

            <Link 
              href="/products/Tech" 
              className={`text-lg font-medium ${isActive("/products/Tech") ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"}`}
              onClick={() => setIsOpen(false)}
            >
              Tech
            </Link>

            <Link 
              href="/products/Organizer" 
              className={`text-lg font-medium ${isActive("/products/Organizer") ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"}`}
              onClick={() => setIsOpen(false)}
            >
              Organizer
            </Link>

            <Link 
              href="/wishlist" 
              className={`text-lg font-medium flex items-center justify-between ${isActive("/wishlist") ? "text-red-600 font-bold" : "text-red-600 hover:text-red-700"}`}
              onClick={() => setIsOpen(false)}
            >
              Wishlist
              <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-red-600">Saved</span>
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}