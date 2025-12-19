"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Lighting", // Default value
    description: "",
    image: "", // We will paste a URL for now
  });

  // Handle Input Changes
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    // 1. Send data to Supabase
    const { error } = await supabase
      .from('products')
      .insert([formData]);

    if (error) {
      alert("Error adding product: " + error.message);
    } else {
      alert("Product added successfully!");
      router.push("/"); // Go back to homepage to see it
      router.refresh(); // Force refresh the data
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
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

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input 
              name="image" required
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
              placeholder="https://..."
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-2">
              Tip: Go to Unsplash, right-click an image, and choose "Copy Image Address".
            </p>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
}