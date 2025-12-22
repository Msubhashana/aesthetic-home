"use client"; // <--- 1. Necessary for interactive buttons

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          AESTHETIC<span className="text-blue-600">HOME</span>
        </Link>

        {/* --- DESKTOP MENU (Hidden on Mobile) --- */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-gray-600 hover:text-black transition font-medium">
            Home
          </Link>
          <Link href="/products/Lighting" className="text-gray-600 hover:text-black transition font-medium">
            Lighting
          </Link>
          <Link href="/products/Decor" className="text-gray-600 hover:text-black transition font-medium">
            Decor
          </Link>
          <Link href="/products/Tech" className="text-gray-600 hover:text-black transition font-medium">
            Tech
          </Link>
          <Link href="/products/Organizer" className="text-gray-600 hover:text-black transition font-medium">
            Organizer
          </Link>
          <Link href="/wishlist" className="text-gray-600 hover:text-black transition font-medium flex items-center gap-2">
            Wishlist
          </Link>
        </div>

        {/* --- MOBILE MENU BUTTON (Visible only on Mobile) --- */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            /* X Icon (Close) */
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            /* Hamburger Icon (Open) */
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {/* Only render if isOpen is true */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white absolute w-full shadow-xl">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              href="/" 
              className="text-lg font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products/Lighting" 
              className="text-lg font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Lighting
            </Link>
            <Link 
              href="/products/Decor" 
              className="text-lg font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Decor
            </Link>
            <Link 
              href="/products/Tech" 
              className="text-lg font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Tech
            </Link>
            <Link 
              href="/products/Tech" 
              className="text-lg font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Organizer
            </Link>
            <Link 
              href="/wishlist" 
              className="text-lg font-medium text-gray-700 hover:text-blue-600 flex items-center justify-between"
              onClick={() => setIsOpen(false)}
            >
              Wishlist
              <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-500">Saved</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}