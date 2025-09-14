import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'admin' | 'user';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual Supabase auth
      const mockUsers = [
        {
          id: '1',
          email: 'admin@store.com',
          password: 'admin123',
          fullName: 'Store Admin',
          phoneNumber: '+1234567890',
          role: 'admin' as const
        },
        {
          id: '2',
          email: 'user@test.com',
          password: 'user123',
          fullName: 'Test User',
          phoneNumber: '+1234567891',
          role: 'user' as const
        }
      ];

      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual Supabase auth
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        role: userData.role
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};