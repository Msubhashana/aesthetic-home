import Link from "next/link";

const aesthetics = [
  {
    title: "Warm Minimalist",
    description: "Clean lines, cream tones, and clutter-free living.",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop",
    link: "/style/minimalist",
    color: "bg-orange-50"
  },
  {
    title: "Dark & Moody",
    description: "Velvet textures, deep colors, and cinematic lighting.",
    // Updated this image URL since the old one was broken in your screenshot
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=2070", 
    link: "/style/moody",
    color: "bg-slate-900 text-white"
  },
  {
    title: "Biophilic / Nature",
    description: "Bring the outdoors in with plants, wood, and sunlight.",
    image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=2080&auto=format&fit=crop",
    link: "/style/nature",
    color: "bg-green-50"
  }
];

export default function AestheticSection() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Shop by Aesthetic
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {aesthetics.map((item) => (
          // FIX 1: Added 'h-full' here so the link stretches to fill the grid row
          <Link key={item.title} href={item.link} className="group block h-full">
            <div className={`rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:-translate-y-2 ${item.color} h-full flex flex-col`}>
              
              {/* Image Section */}
              {/* FIX 2: Added 'shrink-0' so the image never gets squashed */}
              <div className="h-64 overflow-hidden shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Text Section */}
              {/* FIX 3: Added 'flex-1' to push content to fill available space evenly */}
              <div className="p-6 flex-1 flex flex-col justify-center">
                <h3 className={`text-xl font-bold mb-2 ${item.title === 'Dark & Moody' ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${item.title === 'Dark & Moody' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}