"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  
  // 1. DECLARE ALL STATE VARIABLES FIRST (Hooks must be at the top)
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // This was causing the crash because it was below the 'return' in your previous code
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Lighting",
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
      let imageUrl = "";

      if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);
          
        imageUrl = urlData.publicUrl;
      }

      const { error: dbError } = await supabase
        .from('products')
        .insert([{ 
          ...formData, 
          image: imageUrl 
        }]);

      if (dbError) throw dbError;

      alert("Product added successfully!");
      router.push("/");
      router.refresh();

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
        
        {/* Logout Button */}
        <div className="flex justify-end mb-4">
          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
            className="text-sm text-red-600 font-medium hover:underline"
          >
            Sign Out
          </button>
        </div>

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

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              name="category"
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
              onChange={handleChange}
            >
              <option value="Lighting">Lighting</option>
              <option value="Organization">Organization</option>
              <option value="Decor">Decor</option>
              <option value="Tech">Tech</option>
            </select>
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