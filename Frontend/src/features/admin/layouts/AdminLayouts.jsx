import { Outlet } from "react-router";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AdminLayouts = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Topbar />

        <main className="flex-1 overflow-y-auto p-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default AdminLayouts;