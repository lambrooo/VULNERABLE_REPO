import React from 'react';

// Using 'any' to avoid circular dependency in this simple setup
export const Navbar: React.FC<{ setView: any }> = ({ setView }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => setView(0)}>
          <span className="text-2xl font-bold text-gray-800">VulnShop</span>
        </div>
        <div className="flex gap-6">
          <button onClick={() => setView(1)} className="text-gray-600 hover:text-blue-600 font-medium">Products</button>
          <button onClick={() => setView(2)} className="text-gray-600 hover:text-blue-600 font-medium">Categories</button>
          <button onClick={() => setView(3)} className="text-gray-600 hover:text-blue-600 font-medium">Search</button>
          <button onClick={() => setView(4)} className="text-gray-600 hover:text-blue-600 font-medium">Wishlist</button>
          <button onClick={() => setView(5)} className="text-gray-600 hover:text-blue-600 font-medium">Orders</button>
        </div>
        <div>
          <button className="text-red-500 font-bold border border-red-500 px-3 py-1 rounded hover:bg-red-50">Logout</button>
        </div>
      </div>
    </nav>
  );
};