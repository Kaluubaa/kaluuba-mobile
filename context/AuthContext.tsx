import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from './ToastContext';
import { User } from '~/types/user';
import { useProfile } from '~/hooks/use-auth';
import { getUser } from '~/services/auth.service';
import { router } from 'expo-router';

interface AuthContextProps {
  user: User | null;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  // const { data, isLoading } = useProfile()

  const login = async (token: string, userData: User) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      // setUser(userData);

      // showToast({
      //   type: 'success',
      //   message: 'Login Successful',
      //   description: `Welcome back, ${userData.username}!`,
      // });
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Login Failed',
        description: 'Failed to store authentication data.',
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      setUser(null);
      showToast({
        type: 'info',
        message: 'Logged Out',
        description: 'You have been logged out successfully.',
      });
      router.replace('/auth');
      
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

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const [token] = await Promise.all([AsyncStorage.getItem('authToken')]);

        if (token) {
          const user = await getUser();
          setUser(user?.data?.user);
          console.log('userrr', user);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        await logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated: !!user, login, logout, loading }}>
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
