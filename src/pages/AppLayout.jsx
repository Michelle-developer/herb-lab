import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";

function AppLayout() {
  return (
    <div className="mx-auto my-0 w-full md:w-1/2">
      <div className="bg-green-800">
        <PageNav />
      </div>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
