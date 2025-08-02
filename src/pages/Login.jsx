import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useToastContext } from '../contexts/ToastContext';
import { Sprout } from 'lucide-react';

function Login() {
  const { user, loginAsGuest } = useAuthContext();
  const { showToast } = useToastContext();
  const navigate = useNavigate();

  async function handleLogin(e) {
    // 避免表單送出，自動刷新行為（axios 請求送不出去）
    e.preventDefault();
    await loginAsGuest();
    showToast('登入成功！', 'success');
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
          className="mb-4 text-center text-2xl font-bold tracking-widest text-stone-700 text-shadow-xs"
          style={{ fontFamily: 'Playfair Display' }}
        >
          Login Page
        </h1>
        <ul>
          <li className="mb-2 flex gap-1 text-base">
            <Sprout className="text-grass h-6 w-6 flex-shrink-0 items-start" />
            體驗帳號支援多人同時使用，各自操作不互相干擾。
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
