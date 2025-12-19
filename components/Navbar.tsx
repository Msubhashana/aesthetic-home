import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800 tracking-wide">
              AESTHETIC<span className="text-blue-600">HOME</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <NavLink href="/category/lighting" label="Lighting" />
            <NavLink href="/category/organization" label="Organization" />
            <NavLink href="/category/decor" label="Decor" />
            <NavLink href="/category/tech" label="Tech Setup" />
          </div>

        </div>
      </div>
    </nav>
  );
}

// Reusable component
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link 
      href={href} 
      className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
    >
      {label}
    </Link>
  );
}