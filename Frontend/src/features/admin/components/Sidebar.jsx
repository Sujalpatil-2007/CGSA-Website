import {
  LayoutDashboard,
  FileText,
  Users,
  FolderKanban,
  Settings,
  LogOut,
} from "lucide-react";
import { logout } from "../../auth/services/Auth.api";
import { NavLink } from "react-router";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "text-gray-600 hover:bg-gray-100"
    }`;

    const handleLogout = async () => {
    await logout();

    navigate("/login");
};

  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white shadow-xl">

      <div className="border-b p-6">
        <h1 className="text-3xl font-bold text-blue-600">
          CGSA Admin
        </h1>

        <p className="text-sm text-gray-500">
          Administration Panel
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-5">

        <NavLink
          to="/admin/dashboard"
          className={linkClass}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/articles"
          className={linkClass}
        >
          <FileText size={20} />
          Articles
        </NavLink>

      </nav>

      <div className="border-t p-5">
        <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 font-medium text-red-600 hover:bg-red-100">
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;