import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/reusbales/Toast';

interface ToastContextProps {
  showToast: (props: { type: 'success' | 'error' | 'info' | 'warning'; message: string; description?: string; duration?: number }) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info' | 'warning'; message: string; description?: string; duration?: number } | null>(null);

  const showToast = ({ type, message, description, duration }: { type: 'success' | 'error' | 'info' | 'warning'; message: string; description?: string; duration?: number }) => {
    setToast({ type, message, description, duration });
  };

  const handleClose = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          description={toast.description}
          duration={toast.duration}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};