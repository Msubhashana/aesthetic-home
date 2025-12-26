"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  
  // 1. DECLARE ALL STATE VARIABLES FIRST (Hooks must be at the top)
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // This was causing the crash because it was below the 'return' in your previous code
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Lighting",
    aesthetic: "Minimalist",
    description: "",
    affiliate_link: "",
  });

  // 2. SECURITY CHECK (useEffect is also a hook, so it stays up here)
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
    };
    checkSession();
  }, [router]);

  // 3. HELPER FUNCTIONS
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
  e.preventDefault();
  setLoading(true);

  try {
    let mainImageUrl = "";
    let galleryUrls: string[] = [];

    // 1. Upload MAIN Image (Existing logic)
    if (imageFile) {
      const fileName = `main_${Date.now()}_${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, imageFile);
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
      mainImageUrl = data.publicUrl;
    }

    // 2. Upload GALLERY Images (New logic)
    if (galleryFiles.length > 0) {
      for (const file of galleryFiles) {
        const fileName = `gallery_${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);
        
        if (!uploadError) {
          const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
          galleryUrls.push(data.publicUrl);
        }
      }
    }

    // 3. Save to Database
    const { error: dbError } = await supabase
      .from('products')
      .insert([{ 
        ...formData, 
        image: mainImageUrl, // Main image
        gallery: galleryUrls // Extra images array
      }]);

    if (dbError) throw dbError;

    alert("Product added successfully!");
    router.push("/admin/dashboard");

  } catch (error: any) {
    alert("Error: " + error.message);
  } finally {
    setLoading(false);
  }
};

  // 4. CONDITIONAL RETURN (This must be the LAST thing before the real UI)
  if (!isAuthenticated) {
    return null; // Return nothing while checking (or show a loading spinner)
  }

  // 5. THE REAL UI
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

        {/* --- NEW HEADER SECTION --- */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          
          <div className="flex gap-4 text-sm font-medium">
            {/* Link to Dashboard */}
            <button 
              onClick={() => router.push("/admin/dashboard")}
              className="text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition"
            >
              View Dashboard (List)
            </button>

            {/* Logout */}
            <button 
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/login");
              }}
              className="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      {/* --- END HEADER --- */}

        <h1 className="text-3xl font-bold mb-8 text-gray-900">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input 
              name="name" required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Neon Cloud Light"
              onChange={handleChange}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input 
              name="price" required
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
              placeholder="e.g. $29.99"
              onChange={handleChange}
            />
          </div>

      <div className="grid grid-cols-2 gap-4">

        {/* 1. FUNCTIONAL CATEGORY (For Navbar) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Item Type</label>
          <select 
            name="category"
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            onChange={handleChange}
            value={formData.category}
          >
            <option value="Lighting">Lighting</option>
            <option value="Decor">Decor</option>
            <option value="Tech">Tech</option>
            <option value="Organizer">Organizer</option>
          </select>
        </div>

        {/* 2. AESTHETIC CATEGORY (For Homepage Cards) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Aesthetic Vibe</label>
          <select 
            name="aesthetic"
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            onChange={handleChange}
            value={formData.aesthetic}
          >
            {/* Matches the names in your image_faf54c.jpg */}
            <option value="Minimalist">Warm Minimalist</option>
            <option value="Moody">Dark & Moody</option>
            <option value="Nature">Biophilic / Nature</option>
            {/* Add others if needed 
            <option value="Retro">Retro / Vintage</option>
            */}
          </select>
        </div>

      </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              name="description" required rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
              placeholder="Describe the product..."
              onChange={handleChange}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer relative">
              <input 
                type="file" 
                accept="image/*" 
                required
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-gray-500">
                {imageFile ? (
                  <span className="text-green-600 font-medium">Selected: {imageFile.name}</span>
                ) : (
                  <span>Click to upload image</span>
                )}
              </div>
            </div>
          </div>

          {/* ... Existing Main Image Input is above here ... */}

          {/* EXTRA GALLERY IMAGES */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extra Gallery Images (Max 3)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer relative bg-gray-50">
              <input 
                type="file" 
                accept="image/*" 
                multiple // <--- Allow multiple files
                onChange={(e) => {
                  if (e.target.files) {
                    // Convert FileList to Array and take top 3
                    const files = Array.from(e.target.files).slice(0, 3);
                    setGalleryFiles(files);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-gray-500">
                {galleryFiles.length > 0 ? (
                  <span className="text-blue-600 font-medium">
                    {galleryFiles.length} extra images selected
                  </span>
                ) : (
                  <span>+ Add Side Images (Optional)</span>
                )}
              </div>
            </div>
          </div>

          {/* Affiliate Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Affiliate / Product Link</label>
            <input 
                name="affiliate_link" required
                className="w-full p-3 border border-gray-300 rounded-lg outline-none text-blue-600"
                placeholder="https://amazon.com/dp/..."
                onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Uploading & Saving..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
}