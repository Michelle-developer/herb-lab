import { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';
import PropTypes from 'prop-types';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  function showToast(message, type = 'info') {
    setToast({ message, type });
    const timer = setTimeout(() => setToast(null), 3000);

    //取消舊的倒數
    return () => clearTimeout(timer);
  }

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useToastContext() {
  const context = useContext(ToastContext);
  if (context === undefined)
    throw new Error('useToastContext was used outside of the ContextProvider.');
  return context;
}
