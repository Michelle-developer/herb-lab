import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

function Login() {
  const { user, loginAsGuest } = useAuthContext();
  const navigate = useNavigate();

  // 已登入又點選登入，自動導回 My Lab
  useEffect(() => {
    if (user !== null) {
      navigate('/my-lab');
    }
  }, [user, navigate]);

  async function handleLogin(e) {
    // 避免表單送出，自動刷新行為（axios 請求送不出去）
    e.preventDefault();
    await loginAsGuest();
  }

  useEffect(() => {
    if (user) {
      console.log('3 ✅登入狀態已更新:', user);
    }
  }, [user]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#63A681] via-[#437057] to-[#1C6758]">
      <form className="flex flex-col justify-center gap-8 text-lg text-stone-800">
        <label htmlFor="email">E-mail</label>
        <input
          className="border-land min-w-[300px] rounded-lg border p-4"
          type="email"
          name="email"
          value="guest_user_1@herblab.dev"
          disabled
        />

        <label htmlFor="password">Password</label>
        <input
          className="border-land min-w-[300px] rounded-lg border p-4"
          type="password"
          name="password"
          value="herblab000"
          disabled
        />

        <button
          className="bg-grass/50 h-12 w-full cursor-pointer rounded-full text-stone-200 md:h-14 md:w-60"
          onClick={handleLogin}
        >
          立即登入
        </button>
      </form>
    </div>
  );
}

export default Login;
