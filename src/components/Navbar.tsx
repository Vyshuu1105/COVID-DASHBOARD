import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  UserIcon, 
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { getTotalItems, wishlist } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NavLink: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => (
    <Link 
      to={to} 
      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EcoShop
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            
            {user ? (
              <>
                <NavLink to="/wishlist" onClick={() => {}}>
                  <div className="relative">
                    <HeartIcon className="h-6 w-6" />
                    {wishlist.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </div>
                </NavLink>
                
                <NavLink to="/cart" onClick={() => {}}>
                  <div className="relative">
                    <ShoppingCartIcon className="h-6 w-6" />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </div>
                </NavLink>

                {user.role === 'admin' && (
                  <NavLink to="/admin">Admin</NavLink>
                )}

                <NavLink to="/orders">Orders</NavLink>
                
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{user.fullName}</span>
                  <button 
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-700 ml-2"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <NavLink to="/login">Login</NavLink>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/products" onClick={() => setIsOpen(false)}>Products</NavLink>
            
            {user ? (
              <>
                <NavLink to="/wishlist" onClick={() => setIsOpen(false)}>
                  Wishlist ({wishlist.length})
                </NavLink>
                <NavLink to="/cart" onClick={() => setIsOpen(false)}>
                  Cart ({getTotalItems()})
                </NavLink>
                {user.role === 'admin' && (
                  <NavLink to="/admin" onClick={() => setIsOpen(false)}>Admin</NavLink>
                )}
                <NavLink to="/orders" onClick={() => setIsOpen(false)}>Orders</NavLink>
                <div className="px-3 py-2">
                  <p className="text-sm text-gray-700">{user.fullName}</p>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-sm text-red-600 hover:text-red-700 mt-1"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setIsOpen(false)}>Login</NavLink>
                <NavLink to="/register" onClick={() => setIsOpen(false)}>Register</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;