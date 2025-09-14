import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
            <div className="bg-white rounded-lg shadow-md p-12">
              <p className="text-gray-500 text-lg mb-6">Your wishlist is empty</p>
              <Link to="/products" className="btn-primary">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Wishlist ({wishlist.length} items)
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="card">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-xl bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover object-center"
                />
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn-primary flex-1 text-sm py-2 flex items-center justify-center space-x-1"
                  >
                    <ShoppingCartIcon className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg border border-red-200"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;