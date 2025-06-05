import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useToast } from './ToastContext';

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    token: string,
    user: User,
  ) => void;
  logout: () => Promise<void>;
//   refreshToken: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const login = async (token: string, user: User) => {
    await AsyncStorage.setItem('accessToken', token);
    await AsyncStorage.setItem('user', token);

    //   await AsyncStorage.setItem('refreshToken', refreshToken);
    setUser(user);

    showToast({
      type: 'success',
      message: 'Login Successful',
      description: `Welcome back, ${user.username}!`,
    });
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      setUser(null);
      showToast({
        type: 'info',
        message: 'Logged Out',
        description: 'You have been logged out successfully.',
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Logout Failed',
        description: 'An error occurred while logging out.',
      });
    } finally {
      setLoading(false);
    }
  };

//   const refreshToken = async () => {
//     try {
//       const refreshToken = await AsyncStorage.getItem('refreshToken');
//       if (!refreshToken) throw new Error('No refresh token');

//       const response = await api.post('/refresh-token', { refreshToken });
//       const { accessToken, refreshToken: newRefreshToken } = response.data;

//       await AsyncStorage.setItem('accessToken', accessToken);
//       await AsyncStorage.setItem('refreshToken', newRefreshToken);
//     } catch (error) {
//       await logout();
//       throw error;
//     }
//   };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          //   const response = await api.get('/user');
          //   setUser({ id: response.data.id, username: response.data.username });
          const user = await AsyncStorage.getItem('user');
          setUser(user);
        }
      } catch (error) {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
