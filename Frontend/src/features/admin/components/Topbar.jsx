import { Bell, Search, UserCircle } from "lucide-react";

const Topbar = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      {/* Search */}
      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search articles..."
          className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none transition focus:border-blue-500"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        <button className="relative rounded-full p-2 hover:bg-gray-100">
          <Bell size={22} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">
          <UserCircle
            size={40}
            className="text-gray-600"
          />

          <div>
            <p className="font-semibold">Super Admin</p>
            <p className="text-sm text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;