import {
  Bell,
  Search,
  UserCircle,
} from "lucide-react";

import { useContext } from "react";
import { AdminContext } from "../admin.context";

const Topbar = () => {

  const { admin } = useContext(AdminContext);

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">

      <div className="flex items-center gap-6">

        <button className="relative rounded-full p-2 hover:bg-gray-100">

          <Bell size={23} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        <div className="flex items-center gap-3">

          <UserCircle
            size={45}
            className="text-blue-600"
          />

          <div>

            <h3 className="font-semibold">
              {admin?.username}
            </h3>

            <p className="text-sm text-gray-500">
              Super Admin
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Topbar;