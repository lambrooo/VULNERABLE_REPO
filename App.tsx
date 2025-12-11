import React, { useState } from 'react';
import { ProductList } from './components/ProductList';
import { CategoryList } from './components/CategoryList';
import { SearchResults } from './components/SearchResults';
import { WishList } from './components/WishList';
import { OrderHistory } from './components/OrderHistory';
import { Navbar } from './components/Navbar';
import { VulnerabilityReport } from './components/VulnerabilityReport';

// Simple router to switch views
enum View {
  HOME,
  PRODUCTS,
  CATEGORIES,
  SEARCH,
  WISHLIST,
  ORDERS,
  REPORT
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);

  const renderView = () => {
    switch (currentView) {
      case View.PRODUCTS: return <ProductList />;
      case View.CATEGORIES: return <CategoryList />;
      case View.SEARCH: return <SearchResults />;
      case View.WISHLIST: return <WishList />;
      case View.ORDERS: return <OrderHistory />;
      case View.REPORT: return <VulnerabilityReport />;
      default: return <Home setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar setView={setCurrentView} />
      <main className="container mx-auto p-4">
        {renderView()}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center mt-8">
        <p>&copy; 2024 Vulnerable Corp. All rights reserved.</p>
        <p className="text-xs text-gray-500 mt-2">DO NOT DEPLOY THIS APP TO PRODUCTION.</p>
      </footer>
    </div>
  );
};

const Home: React.FC<{ setView: (view: View) => void }> = ({ setView }) => (
  <div className="text-center py-20">
    <h1 className="text-5xl font-bold text-red-600 mb-6">Vulnerable E-Commerce</h1>
    <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
      This application contains <span className="font-bold">intentional security vulnerabilities</span> for testing scanners.
      Navigate through the pages to trigger code paths or explore the source files for backend flaws.
    </p>
    <div className="flex justify-center gap-4">
      <button onClick={() => setView(View.PRODUCTS)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition">
        Shop Products
      </button>
      <button onClick={() => setView(View.REPORT)} className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg transition">
        View Vulnerabilities
      </button>
    </div>
  </div>
);

export default App;