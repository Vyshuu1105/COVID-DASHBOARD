import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-lg text-gray-600 mb-2">
              Thank you for your purchase!
            </p>
            {orderId && (
              <p className="text-sm text-gray-500 mb-6">
                Order ID: <span className="font-mono">{orderId}</span>
              </p>
            )}
            <p className="text-gray-600 mb-8">
              We've received your order and will send you a confirmation email shortly.
              You can track your order status in your orders page.
            </p>
            <div className="space-x-4">
              <Link to="/orders" className="btn-primary">
                View Orders
              </Link>
              <Link to="/products" className="btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;