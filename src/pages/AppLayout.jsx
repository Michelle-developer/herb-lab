import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";

function AppLayout() {
  return (
    <div className="mx-auto w-full">
      <PageNav />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
