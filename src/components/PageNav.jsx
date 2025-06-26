import { NavLink } from "react-router-dom";

function PageNav() {
  return (
    <div
      className="bg-oliver sticky top-0 left-0 z-20 w-full py-2 shadow-md"
      style={{ fontFamily: "GenRyuMin" }}
    >
      <ul className="flex place-items-center gap-16 py-6 pl-10 text-lg text-stone-200">
        <li>
          <NavLink to="/">
            <img
              src="/images/img_logo.png"
              className="ml-4 w-40"
              alt="Herb Lab logo"
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="/herbs">中藥展覽</NavLink>
        </li>
        <li>
          <NavLink to="/constitutions">中醫體質</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default PageNav;
