import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../api/config';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'ROLE_ADMIN' | 'ROLE_HR_MANAGER' | 'ROLE_MANAGER' | 'ROLE_EMPLOYEE';

interface User {
  id: number;
  username: string;
  email: string;
  roles: UserRole[];
  name?: string; // Added for display purposes
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, email: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isHRManager: boolean;
  isManager: boolean;
  isEmployee: boolean;
  getDashboardPath: () => string;
}

interface AuthResponse {
  jwt: string;
  username: string;
  roles: UserRole[];
}

interface JwtPayload {
  sub: string;
  roles: string;
  iat: number;
  exp: number;
}

interface ErrorResponse {
  error: string;
  message?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAdmin = user?.roles?.includes('ROLE_ADMIN') ?? false;
  const isHRManager = user?.roles?.includes('ROLE_HR_MANAGER') ?? false;
  const isManager = user?.roles?.includes('ROLE_MANAGER') ?? false;
  const isEmployee = user?.roles?.includes('ROLE_EMPLOYEE') ?? false;

  const getDashboardPath = useCallback(() => {
    if (!user?.roles || !isAuthenticated) {
      console.log('No user or roles, returning to login'); // Debug log
      return '/login';
    }
    
    console.log('User roles:', user.roles); // Debug log
    
    // All roles have access to dashboard, but different sections will be shown/hidden based on role
    if (user.roles.includes('ROLE_ADMIN') || 
        user.roles.includes('ROLE_HR_MANAGER') || 
        user.roles.includes('ROLE_MANAGER')) {
      console.log('Admin/HR/Manager role detected, returning to dashboard'); // Debug log
      return '/dashboard';
    }
    
    // Employees are directed to the employees section
    if (user.roles.includes('ROLE_EMPLOYEE')) {
      console.log('Employee role detected, returning to employees'); // Debug log
      return '/employees';
    }
    
    console.log('No matching roles found, returning to login'); // Debug log
    return '/login';
  }, [user?.roles, isAuthenticated]);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { 
        username, 
        password 
      });

      console.log('Login response:', response.data); // Debug log

      const { jwt, username: responseUsername, roles } = response.data;
      
      if (!jwt) {
        toast.error('Invalid response from server');
        return false;
      }

      if (!roles || roles.length === 0) {
        toast.error('No roles assigned to this user. Please contact your administrator.');
        return false;
      }

      // Create user data from response
      const userData: User = {
        id: -1,
        username: responseUsername,
        email: username,
        name: responseUsername,
        roles: roles
      };

      // First update state
      setUser(userData);
      setIsAuthenticated(true);

      // Then store in localStorage
      localStorage.setItem('token', jwt);
      localStorage.setItem('user', JSON.stringify(userData));

      // Set Authorization header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      
      console.log('Login successful, user data:', userData); // Debug log
      toast.success(`Welcome back, ${userData.username}`);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage = axiosError.response?.data?.error || 
                           axiosError.response?.data?.message ||
                           axiosError.message ||
                           'Login failed';
        toast.error(errorMessage);
      } else {
        toast.error('An unexpected error occurred');
      }
      return false;
    }
  }, []);

  const register = useCallback(async (username: string, password: string, email: string): Promise<boolean> => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', {
        username,
        password,
        email
      });

      const { jwt, roles } = response.data;
      
      if (!jwt || !roles || roles.length === 0) {
        toast.error('Invalid response from server');
        return false;
      }

      const userData: User = {
        id: -1,
        username,
        email,
        name: username,
        roles
      };

      // Store in localStorage
      localStorage.setItem('token', jwt);
      localStorage.setItem('user', JSON.stringify(userData));

      // Set Authorization header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'Registration failed';
        toast.error(errorMessage);
      } else {
        toast.error('An unexpected error occurred during registration');
      }
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear state
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear any other stored data
    localStorage.clear();
    
    // Remove Authorization header
    delete api.defaults.headers.common['Authorization'];
    
    // Show toast
    toast.info('You have been logged out');
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      register,
      logout,
      isAdmin,
      isHRManager,
      isManager,
      isEmployee,
      getDashboardPath
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
