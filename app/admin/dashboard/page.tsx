"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data
  const fetchProducts = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/login");
      return;
    }

    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [router]);

  // 2. Toggle Trending Function (NEW)
  const toggleTrending = async (id: number, currentStatus: boolean) => {
    // Optimistic Update (Change UI immediately for speed)
    setProducts(products.map(p => p.id === id ? { ...p, is_trending: !currentStatus } : p));

    // Update Database
    const { error } = await supabase
      .from('products')
      .update({ is_trending: !currentStatus })
      .eq('id', id);

    if (error) {
      alert("Error updating trending status");
      fetchProducts(); // Revert if failed
    }
  };

  // 3. Delete Function
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) setProducts(products.filter((p) => p.id !== id));
  };

  // 4. Update Link Function
  const handleUpdateLink = async (id: number) => {
    const newLink = prompt("Enter new Affiliate Link:");
    if (!newLink) return;
    await supabase.from('products').update({ affiliate_link: newLink, created_at: new Date() }).eq('id', id);
    fetchProducts();
  };

  const getDaysLeft = (dateString: string) => {
    const created = new Date(dateString);
    const expires = new Date(created);
    expires.setDate(created.getDate() + 30);
    const diff = Math.ceil((expires.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/admin" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">
              + Add Product
            </Link>
            <Link href="/" className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-50">
              View Site
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4 text-center">Trending</th> {/* NEW COLUMN */}
                <th className="p-4">Link Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => {
                const daysLeft = getDaysLeft(product.created_at);
                const isUrgent = daysLeft <= 5;

                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="p-4 flex items-center gap-4">
                      <img src={product.image} className="w-12 h-12 rounded-lg object-cover bg-gray-200" alt="" />
                      <div>
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                    </td>
                    
                    {/* --- STAR TOGGLE BUTTON --- */}
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => toggleTrending(product.id, product.is_trending)}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                        title={product.is_trending ? "Remove from Homepage" : "Add to Homepage"}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="24" height="24" 
                          viewBox="0 0 24 24" 
                          fill={product.is_trending ? "#FBBF24" : "none"} /* Gold if true, Empty if false */
                          stroke={product.is_trending ? "#FBBF24" : "#9CA3AF"} 
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </button>
                    </td>

                    <td className="p-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        isUrgent ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${isUrgent ? "bg-red-600" : "bg-green-600"}`}></span>
                        {daysLeft > 0 ? `${daysLeft} Days` : "Exp"}
                      </div>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleUpdateLink(product.id)} className="text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-bold">Renew</button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-bold">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}