import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
            <div className="bg-white rounded-lg shadow-md p-12">
              <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
              <Link to="/products" className="btn-primary">
                Continue Shopping
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center py-6 border-b border-gray-200 last:border-b-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                
                <div className="flex-1 ml-6">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                  <p className="text-lg font-bold text-gray-900 mt-2">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="text-gray-900 font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-gray-900">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            
            <div className="flex space-x-4">
              <Link 
                to="/products" 
                className="btn-secondary flex-1 text-center py-3"
              >
                Continue Shopping
              </Link>
              <Link 
                to="/checkout" 
                className="btn-primary flex-1 text-center py-3"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;