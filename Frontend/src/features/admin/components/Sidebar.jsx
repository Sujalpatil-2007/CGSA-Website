import { LayoutDashboard, FileText, LogOut, ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white shadow-lg">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-6">
        <h1 className="text-2xl font-bold text-blue-600">CGSA Admin</h1>

        <button className="rounded-md p-1 hover:bg-gray-100">
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <NavLink to="/admin/dashboard" className={navLinkStyle}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/articles" className={navLinkStyle}>
          <FileText size={20} />
          Articles
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition hover:bg-red-50">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
