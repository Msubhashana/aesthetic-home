import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">
        
        {/* Left Side: Text */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Curated Decor for <br />
            <span className="text-blue-600">Your Dream Space</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto lg:mx-0">
            Discover viral home trends, cozy lighting, and aesthetic organization hacks. Handpicked for students and creators.
          </p>
          <div className="mt-8 flex gap-4 justify-center lg:justify-start">
            <Link 
              href="/#vibes" 
              className="rounded-full bg-blue-600 px-8 py-3 text-white font-medium hover:bg-blue-700 transition"
            >
              Shop Trends
            </Link>
            {/*
            <Link 
              href="/about" 
              className="rounded-full bg-white px-8 py-3 text-blue-600 font-medium border border-gray-200 hover:bg-gray-50 transition"
            >
              Our Story
            </Link>
            */}
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-square lg:aspect-video rounded-2xl overflow-hidden shadow-2xl">
            {/* Placeholder Image from Unsplash */}
            <img 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop" 
              alt="Aesthetic Room Setup" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
}