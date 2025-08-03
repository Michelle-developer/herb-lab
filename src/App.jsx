import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './contexts/AuthContext';
import { useHerbContext } from './contexts/HerbContext';
import { useLocation } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import Homepage from './features/homepage/Homepage';
import ConstitutionList from './features/constitution/ConstitutionList';
import ConstitutionDetail from './features/constitution/ConstitutionDetail';
import HerbList from './features/herb/HerbList';
import HerbDetail from './features/herb/HerbDetail';
import PageNotFound from './pages/PageNotFound';
import AppLoader from './components/AppLoader';
import MyLabLayout from './features/my-lab/MyLabLayout';
import Login from './pages/Login';
import DemoLabLayout from './features/my-lab/DemoLabLayout';
import { useRef } from 'react';

export default function App() {
  // 狀態1：是否播完Logo動畫（timer控制時間）
  const [isIntroDone, setIsIntroDone] = useState(false);

  // 狀態2：是否仍在載入中藥資料
  const { isLoading: isHerbLoading } = useHerbContext(); //預設為true

  // 狀態3：等待 AuthContext 解析登入狀態與token（避免未準備好就判斷user）。
  const { isAuthReady, user } = useAuthContext();

  const showLoading = !isIntroDone || isHerbLoading || !isAuthReady;

  useEffect(() => {
    const timer = setTimeout(() => setIsIntroDone(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // 切換路由時（URL真正改變），滾動到最上方
  function ScrollToTop() {
    const { pathname } = useLocation();
    const prevPathRef = useRef(pathname);

    useEffect(() => {
      const isNewPage = pathname !== prevPathRef.current;
      if (isNewPage) {
        window.scrollTo(0, 0);
        prevPathRef.current = pathname;
      }
    }, [pathname]);

    return null;
  }

  if (showLoading) return <AppLoader />;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Homepage />} />

          <Route path="constitutions">
            <Route index element={<ConstitutionList />} />
            <Route path=":slug" element={<ConstitutionDetail />} />
          </Route>

          <Route path="herbs">
            <Route index element={<HerbList />} />
            <Route path=":id" element={<HerbDetail />} />
          </Route>

          {/* 驗證1：有使用者（進體驗帳號 or 進入下一段驗證）
              驗證2：JWT是否解析完成（進 Demo or 回傳 null，等解析完成） */}
          <Route
            path="my-lab"
            element={
              user ? <MyLabLayout /> : isAuthReady ? <Navigate to="/my-lab/demo" replace /> : null
            }
          />
          <Route path="my-lab/demo" element={<DemoLabLayout />} />

          <Route path="login" element={user ? <Navigate to="/my-lab" /> : <Login />} />

          {/* 測試登入用 <Route path="/test-login" element={<LoginTest />} /> */}

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
