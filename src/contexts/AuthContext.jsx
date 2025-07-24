import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // 初始化階段，自動同步登入狀態（頁面刷新仍保留登入狀態）
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await axios.get('/users/me', { withCredentials: true });
        const data = res.data.data.user;

        setUser(data);
      } catch (err) {
        console.warn('尚未登入', err);
      } finally {
        setIsAuthReady(true);
      }
    }

    fetchCurrentUser();
  }, []);

  // 提供登入方法給Login頁呼叫
  async function loginAsGuest() {
    const payload = {
      email: 'guest_user_1@herblab.dev',
      password: 'herblab000',
    };

    const res = await axios.post('/users/login', payload, {
      withCredentials: true,
    });
    console.log('❤️‍🔥後端已回覆', res);

    const data = res.data.data.user;

    setUser(data.name);
    console.log('❤️‍🔥已傳登入狀態', data.name);
  }

  // 提供登出方法
  async function logout() {
    await axios.get('/users/logout', { withCredentials: true });

    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthReady, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside of the ContextProvider.');
  return context;
}
