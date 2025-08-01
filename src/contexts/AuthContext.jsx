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
        console.error(err.message);
        setUser(null);
      } finally {
        setIsAuthReady(true);
      }
    }

    fetchCurrentUser();
  }, []);

  // TODO: 計時器檢查：避免閒置使用者逾時停留
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await axios.get('/users/me');
      } catch (err) {
        if (err.response?.status === 401) {
          setUser(null); // 觸發所有需要登入的頁面跳轉
        }
      }
    }, 60000); // 每60秒檢查一次

    return () => clearInterval(interval);
  }, []);

  // TODO: 測試用
  useEffect(() => {
    if (user) console.log('🔑 getMe', user);
  }, [user]);

  // 提供登入方法給 Login 頁呼叫
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

    setUser(data);
    console.log('❤️‍🔥已傳登入狀態', data);
  }

  // 提供登出方法給 Login 頁呼叫
  async function logout() {
    try {
      await axios.post('/users/logout', { withCredentials: true });

      setUser(null);
    } catch (error) {
      console.error('登出失敗', error);
    }
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
