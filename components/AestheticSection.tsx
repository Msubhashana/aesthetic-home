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
    image: "https://images.unsplash.com/photo-1550926870-cd21f05dd2e9?q=80&w=2070&auto=format&fit=crop",
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
          <Link key={item.title} href={item.link} className="group block">
            <div className={`rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:-translate-y-2 ${item.color}`}>
              
              {/* Image Section */}
              <div className="h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Text Section */}
              <div className="p-6">
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