import { NavLink } from "react-router-dom";

function PageNav() {
  return (
    <div className="py-2">
      <ul className="flex space-x-2 text-base">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/herbs">Herb Library</NavLink>
        </li>
        <li>
          <NavLink to="/constitutions">Body Constitution</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default PageNav;
