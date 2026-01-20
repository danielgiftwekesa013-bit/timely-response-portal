import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminCredentials, mockDrivers, type Driver } from './mockData';

type UserRole = 'ceo' | 'driver' | null;

interface AuthUser {
  username: string;
  role: UserRole;
  name: string;
  driverId?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('trl_auth');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Check CEO credentials
    if (username === adminCredentials.ceo.username && password === adminCredentials.ceo.password) {
      const authUser: AuthUser = {
        username,
        role: 'ceo',
        name: adminCredentials.ceo.name,
      };
      setUser(authUser);
      localStorage.setItem('trl_auth', JSON.stringify(authUser));
      return true;
    }

    // Check driver credentials
    const driver = mockDrivers.find(
      (d: Driver) => d.username === username && d.password === password
    );
    if (driver) {
      const authUser: AuthUser = {
        username,
        role: 'driver',
        name: driver.name,
        driverId: driver.id,
      };
      setUser(authUser);
      localStorage.setItem('trl_auth', JSON.stringify(authUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('trl_auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
