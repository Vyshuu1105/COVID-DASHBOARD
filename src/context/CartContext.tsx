import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'groceries' | 'shoes' | 'dresses' | 'cosmetics';
  adminId?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  wishlist: Product[];
}

interface CartContextType extends CartState {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; product: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; productId: string }
  | { type: 'LOAD_STATE'; state: CartState };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.product.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.product, quantity: 1 }]
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.productId)
      };
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.productId)
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'ADD_TO_WISHLIST':
      if (state.wishlist.some(item => item.id === action.product.id)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.product]
      };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.productId)
      };
    case 'LOAD_STATE':
      return action.state;
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  wishlist: []
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('cartState');
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', state: JSON.parse(savedState) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartState', JSON.stringify(state));
  }, [state]);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', product });
  };

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', productId });
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    getTotalPrice,
    getTotalItems
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};