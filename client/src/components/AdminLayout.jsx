import React from "react";
import { Outlet, Link } from "react-router-dom";
import {useAdminProtection} from '../Function/authUtils'

export default function AdminLayout() {
  const lockout = () => {
    localStorage.removeItem("token");
    window.location.replace('/login')
  } 
  useAdminProtection();
  return (
    <div className="flex h-full">
      <aside className="w-1/4 bg-gray-800 text-white flex flex-col sticky top-0 h-screen">
        <h2 className="text-xl font-bold p-4 border-b border-gray-700">Admin Dashboard</h2>
        <nav className="flex-grow p-4 space-y-4">
          <Link to="/admin/users" className="block hover:bg-gray-700 px-3 py-2 rounded">
          Users
          </Link>
          <Link to="/admin/rooms" className="block hover:bg-gray-700 px-3 py-2 rounded">
            Rooms
          </Link>
          <Link to="/admin/bookings" className="block hover:bg-gray-700 px-3 py-2 rounded">
            Bookings
          </Link>
          <button onClick={lockout}  className="block hover:bg-gray-700 px-3 py-2 rounded w-full">
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
}
