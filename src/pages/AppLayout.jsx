import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";

function AppLayout() {
  return (
    <div className="mx-auto my-0 w-full">
      <PageNav />

      <main className="mx-6 my-8 overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
