import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">AESTHETIC<span className="text-blue-400">HOME</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Curating the most viral and cozy home decor trends for your dream space.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/category/lighting" className="hover:text-white transition">Lighting</Link></li>
              <li><Link href="/category/organization" className="hover:text-white transition">Organization</Link></li>
              <li><Link href="/category/decor" className="hover:text-white transition">Decor</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Newsletter (Static for now) */}
          <div>
            <h4 className="font-bold mb-4">Stay Aesthetic</h4>
            <p className="text-gray-400 text-sm mb-4">Join our newsletter for weekly inspo.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} Aesthetic Home. All rights reserved.
        </div>

      </div>
    </footer>
  );
}