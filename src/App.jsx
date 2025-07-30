import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import Homepage from './features/homepage/Homepage';
import ConstitutionList from './features/constitution/ConstitutionList';
import ConstitutionDetail from './features/constitution/ConstitutionDetail';
import HerbList from './features/herb/HerbList';
import HerbDetail from './features/herb/HerbDetail';
import PageNotFound from './pages/PageNotFound';
import './App.css';
import { useEffect, useState } from 'react';
import AppLoader from './components/AppLoader';
import { useHerbContext } from './contexts/HerbContext';
import MyLabLayout from './features/my-lab/MyLabLayout';
import Login from './pages/Login';
import { useAuthContext } from './contexts/AuthContext';

export default function App() {
  //狀態1：是否播完Logo動畫（timer控制時間）
  const [isIntroDone, setIsIntroDone] = useState(false);

  //狀態2：是否仍在載入中藥資料
  const { isLoading: isHerbLoading } = useHerbContext(); //預設為true

  const showLoading = !isIntroDone || isHerbLoading;

  const { user } = useAuthContext();

  useEffect(() => {
    const timer = setTimeout(() => setIsIntroDone(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (showLoading) return <AppLoader />;

  return (
    <BrowserRouter>
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

          <Route path="my-lab" element={<MyLabLayout />} />

          <Route path="login" element={user ? <Navigate to="/my-lab" /> : <Login />} />

          {/* 測試登入用 <Route path="/test-login" element={<LoginTest />} /> */}

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
