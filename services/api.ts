import axios, { AxiosRequestConfig, isAxiosError, Method } from 'axios';
import { QueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: 'http://192.168.26.231:3030/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export async function apiRequest<T = any>(
  method: Method,
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await api.request({
      method,
      url: endpoint,
      data,
      ...config,
    });

    return response.data;
  } catch (error: any) {
    // console.log('hmmmm', error);
    if (isAxiosError(error)) {
      const backendError = error.response?.data;

      // console.log('Backend error:', backendError);
      throw backendError || error.message;
    }

    throw error;
  }
}

export const apiGet = <T>(endpoint: string, config?: AxiosRequestConfig) =>
  apiRequest<T>('get', endpoint, undefined, config);

export const apiPost = <T>(endpoint: string, data?: any, config?: AxiosRequestConfig) =>
  apiRequest<T>('post', endpoint, data, config);

export const apiPatch = <T>(endpoint: string, data?: any, config?: AxiosRequestConfig) =>
  apiRequest<T>('patch', endpoint, data, config);

export const apiDelete = <T>(endpoint: string, config?: AxiosRequestConfig) =>
  apiRequest<T>('delete', endpoint, undefined, config);
