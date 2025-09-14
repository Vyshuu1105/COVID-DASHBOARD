import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface OrderData {
  id: string;
  items: any[];
  total: number;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.fullName || '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: user?.fullName || ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order
      const order: OrderData = {
        id: Date.now().toString(),
        items: items,
        total: getTotalPrice(),
        date: new Date().toISOString(),
        status: 'processing',
        shippingAddress
      };

      // Save order to localStorage (in real app, this would be sent to backend)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      // Clear cart
      clearCart();
      
      // Navigate to success page
      navigate('/order-success', { state: { orderId: order.id } });
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const total = getTotalPrice();
  const shipping = 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Address */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={shippingAddress.fullName}
                      onChange={handleShippingChange}
                      className="input-field mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={shippingAddress.address}
                      onChange={handleShippingChange}
                      className="input-field mt-1"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={shippingAddress.city}
                        onChange={handleShippingChange}
                        className="input-field mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">State</label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={shippingAddress.state}
                        onChange={handleShippingChange}
                        className="input-field mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={shippingAddress.zipCode}
                      onChange={handleShippingChange}
                      className="input-field mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Demo Mode:</strong> Use test card: 4242 4242 4242 4242
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardholderName"
                      required
                      value={paymentData.cardholderName}
                      onChange={handlePaymentChange}
                      className="input-field mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={paymentData.cardNumber}
                      onChange={handlePaymentChange}
                      className="input-field mt-1"
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        required
                        value={paymentData.expiryDate}
                        onChange={handlePaymentChange}
                        className="input-field mt-1"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        required
                        value={paymentData.cvv}
                        onChange={handlePaymentChange}
                        className="input-field mt-1"
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-lg disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;