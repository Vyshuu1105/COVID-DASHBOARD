import React from 'react';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useAuth();
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useCart();
  
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (user) {
      addToCart(product);
    }
  };

  const handleWishlistToggle = () => {
    if (user) {
      if (isInWishlist) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  return (
    <div className="card group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-xl bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm text-gray-700 font-medium line-clamp-2">
            {product.name}
          </h3>
          {user && (
            <button
              onClick={handleWishlistToggle}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isInWishlist ? (
                <HeartSolidIcon className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
              )}
            </button>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          
          {user && (
            <button
              onClick={handleAddToCart}
              className="btn-primary text-sm px-3 py-1 flex items-center space-x-1"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;