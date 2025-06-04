import { Outlet } from "react-router-dom";

function HerbLayout() {
  return (
    <div>
      ---HerbLayout---
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default HerbLayout;
