import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1c] text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* GRID LAYOUT: 1 Column on Mobile, 3 Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* 1. LEFT COLUMN: Brand & Socials (Blue Square Area) */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tight block">
              AESTHETIC<span className="text-blue-500">HOME</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Curating the most viral and cozy home decor trends for your dream space.
            </p>
            
            {/* --- NEW SOCIAL ICONS --- */}
            <div className="flex gap-4 pt-2">


               {/* REPLACING SVG ABOVE WITH REAL PINTEREST PATH */}
               <a href="https://pin.it/5WHC8nd1k" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition group" aria-label="Pinterest">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" className="text-gray-300 group-hover:text-white">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.93 0 4.136-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z"/>
                </svg>
              </a>

              {/* Facebook Logo 
              <a href="" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition group" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" className="text-gray-300 group-hover:text-white">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.657-2.797 3.593v.538h6.47l-.532 3.596h-5.938v7.98c0 .003-.001.008-.001.013a11.975 11.975 0 0 1-2.503.268 11.975 11.975 0 0 1-2.515-.275c-.001-.005-.001-.01-.001-.013Z"/>
                </svg>
              </a>
              */}

            </div>
          </div>

          {/* 2. MIDDLE COLUMN: Empty Spacer */}
          <div className="hidden md:block">
            {/* This empty div pushes the Explore section to the right side */}
          </div>

          {/* 3. RIGHT COLUMN: Explore Section (Moved to Yellow Square Area) */}
          <div className="md:text-right">
            <h4 className="font-bold text-lg mb-6 text-white">Explore</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/products/Lighting" className="hover:text-blue-500 transition">Lighting</Link>
              </li>
              <li>
                <Link href="/products/Decor" className="hover:text-blue-500 transition">Decor</Link>
              </li>
              <li>
                <Link href="/products/Tech" className="hover:text-blue-500 transition">Tech</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-500 transition">About Us</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-600 text-sm">
          <p>© 2025 Aesthetic Home. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}