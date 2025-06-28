import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";

function PageNav() {
  return (
    <div className="bg-oliver/95 sticky top-0 left-0 z-20 h-35 w-full py-4 shadow-md">
      <ul
        className="flex place-items-center gap-16 pl-10 text-base text-stone-200"
        style={{ fontFamily: "GenRyuMin" }}
      >
        <li>
          <NavLink to="/">
            <Logo className="ml-4 h-30 w-30" />
          </NavLink>
        </li>
        <li className="decoration-land decoration-4 hover:underline hover:underline-offset-8">
          <NavLink to="/herbs">中藥展覽</NavLink>
        </li>
        <li className="decoration-land decoration-4 hover:underline hover:underline-offset-8">
          <NavLink to="/constitutions">中醫體質</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default PageNav;
