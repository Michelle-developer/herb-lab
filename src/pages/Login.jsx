import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { Sprout } from 'lucide-react';

function Login() {
  const { user, loginAsGuest } = useAuthContext();
  const navigate = useNavigate();

  async function handleLogin(e) {
    // 避免表單送出，自動刷新行為（axios 請求送不出去）
    e.preventDefault();
    await loginAsGuest();
  }

  // TODO: 測試用
  useEffect(() => {
    if (user) {
      console.log('3 ✅登入狀態已更新:', user);
    }
  }, [user]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#63A681] via-[#437057] to-[#1C6758]">
      <form className="text-md flex flex-col justify-center gap-4 rounded-xl bg-white/30 p-8 text-stone-800 shadow-lg">
        <h1
          className="text-land mb-4 text-center text-2xl font-bold tracking-widest text-shadow-xs"
          style={{ fontFamily: 'Playfair Display' }}
        >
          Login Page
        </h1>
        <ul>
          <li className="mb-2 flex gap-1 text-base">
            <Sprout className="text-grass h-6 w-6 flex-shrink-0 items-start" />
            目前僅一組體驗帳號，故每次登入限時
            <span className="decoration-land font-semibold text-black underline decoration-4 underline-offset-2">
              {' '}
              20 分鐘{' '}
            </span>
            。
          </li>
          <li className="flex gap-1 text-base">
            <Sprout className="text-grass h-6 w-6 flex-shrink-0 items-start" />
            未開放正式註冊帳號，請直接點擊登入按鈕。
          </li>
        </ul>
        <label htmlFor="email" style={{ fontFamily: 'Playfair Display' }}>
          E-mail:
        </label>
        <input
          id="email"
          className="border-land min-w-[200px] rounded-lg border p-4"
          type="email"
          value="guest_user_1@herblab.dev"
          disabled
        />

        <label htmlFor="password" style={{ fontFamily: 'Playfair Display' }}>
          Password:
        </label>
        <input
          id="password"
          className="border-land min-w-[200px] rounded-lg border p-4"
          type="password"
          value="herblab000"
          disabled
        />

        <div className="flex gap-4">
          <button
            className="border-grass text-grass hover:text-oliver mt-4 h-12 w-1/2 cursor-pointer rounded-full border-1 hover:bg-stone-200/50 md:h-14"
            onClick={() => navigate('/')}
          >
            回首頁
          </button>
          <button
            className="bg-grass/80 hover:bg-grass mt-4 h-12 w-1/2 cursor-pointer rounded-full text-stone-200 hover:text-stone-50 md:h-14"
            onClick={handleLogin}
          >
            登入體驗帳號
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
