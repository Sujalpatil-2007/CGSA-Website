import {
  LayoutDashboard,
  FileText,
  Users,
  FolderKanban,
  Settings,
  LogOut,
  UserCircle,
} from "lucide-react";
import { logout } from "../../auth/services/auth.api";
import { NavLink } from "react-router";
import { AdminContext } from "../admin.context";
import { useContext } from "react";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "text-gray-600 hover:bg-gray-100"
    }`;

    const { admin } = useContext(AdminContext);

    const handleLogout = async () => {
    await logout();

    navigate("/");
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

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <UserCircle size={45} className="text-blue-600" />

          <div>
            <h3 className="font-semibold">{admin?.username}</h3>

            <p className="text-sm text-gray-500">Super Admin</p>
          </div>
        </div>
      </div>
      
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