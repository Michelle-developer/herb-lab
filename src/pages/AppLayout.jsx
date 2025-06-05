import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";

function AppLayout() {
  return (
    <div className="mx-auto my-0 w-full md:w-1/2">
      <PageNav />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
