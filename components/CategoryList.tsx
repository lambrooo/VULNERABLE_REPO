import React, { useEffect, useState } from 'react';

// Vulnerability: Exact duplicate logic of ProductList (JSCPD target)

export const CategoryList: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                setProducts([
                    { id: 1, name: "Electronics", price: 0, image: "https://picsum.photos/200/303" },
                    { id: 2, name: "Clothing", price: 0, image: "https://picsum.photos/200/304" },
                    { id: 3, name: "Home & Garden", price: 0, image: "https://picsum.photos/200/305" }
                ]);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    
    if (loading) return <div className="p-10 text-center text-gray-500">Loading Categories...</div>;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
    
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map(p => (
                    <div key={p.id} className="bg-white rounded-lg shadow p-4 hover:shadow-xl transition">
                        <img src={p.image} alt="product" className="w-full h-48 object-cover mb-4 rounded" />
                        <h3 className="text-xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: p.name }}></h3>
                        <p className="text-green-600 font-bold text-lg">{p.price > 0 ? `$${p.price}` : 'Browse'}</p>
                        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">View Category</button>
                    </div>
                ))}
            </div>
        </div>
    );
}