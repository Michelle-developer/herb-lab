import { NavLink } from "react-router-dom";

function PageNav() {
  return (
    <div className="bg-oliver py-2">
      <ul className="flex space-x-2 p-4 text-base text-stone-200">
        <li>
          <NavLink to="/">Logo</NavLink>
        </li>
        <li>
          <NavLink to="/herbs">中藥圖書館</NavLink>
        </li>
        <li>
          <NavLink to="/constitutions">中醫體質</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default PageNav;
