import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";

function AppLayout() {
  return (
    <div className="mx-auto w-full">
      <PageNav />

      <main className="my-8 overflow-scroll px-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
