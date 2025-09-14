import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sampleProducts } from '../data/sampleProducts';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { user } = useAuth();
  
  const categories = [
    {
      id: 'groceries',
      name: 'Groceries',
      description: 'Fresh and organic food items',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg',
      color: 'from-green-400 to-blue-500'
    },
    {
      id: 'shoes',
      name: 'Shoes',
      description: 'Comfortable and stylish footwear',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'dresses',
      name: 'Dresses',
      description: 'Elegant dresses for every occasion',
      image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'cosmetics',
      name: 'Cosmetics',
      description: 'Beauty products and makeup',
      image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg',
      color: 'from-pink-400 to-red-500'
    }
  ];

  const featuredProducts = sampleProducts.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to EcoShop
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover amazing products at unbeatable prices
            </p>
            {!user && (
              <div className="space-x-4">
                <Link to="/register" className="btn-primary text-lg px-8 py-3">
                  Get Started
                </Link>
                <Link to="/login" className="btn-secondary text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600">
            Explore our wide range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group"
            >
              <div className="card overflow-hidden">
                <div className="h-48 bg-gradient-to-r overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-80`} />
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Check out our most popular items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary text-lg px-8 py-3">
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;