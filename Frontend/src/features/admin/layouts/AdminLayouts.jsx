import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import React from 'react'

const adminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default adminLayout
