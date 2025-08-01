import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useUnifiedFolderContext } from '../contexts/UnifiedFolderContext';
import Logo from '../components/Logo';

function PageNav() {
  const { user, logout } = useAuthContext();
  const { isReadOnlyMode } = useUnifiedFolderContext();
  const navigate = useNavigate();

  return (
    <div className="bg-oliver/95 sticky top-0 left-0 z-20 h-18 w-full shadow-md sm:h-24">
      <ul
        className="flex place-items-center gap-4 py-4 pl-2 text-sm text-stone-200 sm:py-2 sm:pl-8 sm:text-base md:gap-8"
        style={{ fontFamily: 'GenRyuMin' }}
      >
        <li>
          <NavLink to="/">
            <Logo
              role="img"
              aria-label="拾本草 Logo"
              className="hidden h-28 w-auto hover:scale-102 sm:block"
            />

            <img
              src="/images/logo_mobile.png"
              title="拾本草 Logo"
              alt="拾本草 Logo"
              className="block h-12 w-12 hover:scale-102 sm:hidden"
            />
          </NavLink>
        </li>
        <li className="decoration-land decoration-4 hover:underline hover:underline-offset-8">
          <NavLink to="/herbs">本草選集</NavLink>
        </li>
        <li className="decoration-land decoration-4 hover:underline hover:underline-offset-8">
          <NavLink to="/constitutions">中醫體質</NavLink>
        </li>
        <li className="decoration-land decoration-4 hover:underline hover:underline-offset-8">
          {isReadOnlyMode ? (
            <NavLink to="/my-lab/demo">Demo實驗室</NavLink>
          ) : (
            <NavLink to="/my-lab">我的實驗室</NavLink>
          )}
        </li>
        <li className="decoration-land decoration-4 hover:underline hover:underline-offset-8">
          {user ? (
            <button
              onClick={async () => {
                await logout();
                navigate('/');
              }}
              className="decoration-land cursor-pointer decoration-4 hover:underline hover:underline-offset-8"
            >
              登出
            </button>
          ) : (
            <NavLink to="/login">登入</NavLink>
          )}
        </li>
      </ul>
    </div>
  );
}

export default PageNav;
