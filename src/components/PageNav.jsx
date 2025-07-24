import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import Logo from '../components/Logo';

function PageNav() {
  const { user } = useAuthContext();

  return (
    <div className="bg-oliver/95 sticky top-0 left-0 z-20 h-24 w-full py-2 shadow-md sm:h-35 sm:py-0.5">
      <ul
        className="flex place-items-center gap-8 pl-4 text-sm text-stone-200 sm:pl-8 sm:text-base"
        style={{ fontFamily: 'GenRyuMin' }}
      >
        <li>
          <NavLink to="/">
            <Logo
              className="hidden h-35 w-auto hover:scale-102 sm:block"
              role="img"
              aria-label="拾本草 Logo"
            />

            <div
              src="/images/logo_mobile.png"
              role="img"
              alt="拾本草 Logo"
              className="block h-20 w-auto hover:scale-102 sm:hidden"
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
          <NavLink to="/my-lab">{user !== null ? '我的實驗室' : '實驗室demo'}</NavLink>
        </li>
        <li className="decoration-land decoration-4 hover:underline hover:underline-offset-8">
          <NavLink to="/login">{user !== null ? '登入中' : '登入'}</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default PageNav;
