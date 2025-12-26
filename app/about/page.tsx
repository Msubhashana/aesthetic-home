import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="bg-gray-50 py-20 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Curating Comfort & Style
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Your daily destination for home decor inspiration, aesthetic finds, and the knowledge to transform your space.
          </p>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-16">
        
        {/* Mission Statement */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            At <strong>Daily Decor Finds</strong>, we believe everyone deserves a home that feels like a sanctuary. We are not just a catalog; we are a knowledge hub. Our goal is to provide you with fresh ideas, styling tips, and the latest trends to help you visualize and create your dream environment.
          </p>
        </section>

        {/* The Affiliate Model (Transparency) */}
        <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Work</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We operate as a <strong>curation service</strong>. We scour the internet to find the best-rated, most aesthetic products available from trusted retailers.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Please note that we <strong>do not sell products directly</strong>. Instead, we participate in affiliate marketing programs. This means that when you click a link on our site and make a purchase, we may earn a small commission at no extra cost to you. This supports our team and allows us to keep bringing you free content.
          </p>
        </section>

        {/* Disclaimer (Liability Protection) */}
        <section className="border-l-4 border-gray-300 pl-6 py-2">
          <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide text-sm">
            Important Disclaimer
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            <strong>Daily Decor Finds</strong> is a publisher of information and curator of products. We are not the manufacturer, distributor, or direct seller of any items featured on this website.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            Therefore, we are <strong>not responsible</strong> for:
          </p>
          <ul className="list-disc list-inside text-gray-500 text-sm mt-2 space-y-1 mb-4">
            <li>Shipping delays or delivery issues.</li>
            <li>Product defects, damages, or quality concerns.</li>
            <li>Returns, refunds, or exchanges.</li>
          </ul>
          <p className="text-gray-500 text-sm leading-relaxed">
            Any issues regarding your purchase should be directed to the customer support team of the specific website where the purchase was made (e.g., Amazon, AliExpress, etc.).
          </p>
        </section>

      </div>

      {/* 3. CTA FOOTER */}
      <div className="bg-gray-900 py-16 text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to find your vibe?</h2>
        <Link 
          href="/" 
          className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition transform hover:scale-105"
        >
          Start Exploring
        </Link>
      </div>

    </div>
  );
}