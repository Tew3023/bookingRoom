import React from "react";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-gray-800 text-white flex flex-col">
        <h2 className="text-xl font-bold p-4 border-b border-gray-700">Admin Dashboard</h2>
        <nav className="flex-grow p-4 space-y-4">
          <Link to="/admin/rooms" className="block hover:bg-gray-700 px-3 py-2 rounded">
            Rooms
          </Link>
          <Link to="/admin/users" className="block hover:bg-gray-700 px-3 py-2 rounded">
            Users
          </Link>
          <Link to="/admin/bookings" className="block hover:bg-gray-700 px-3 py-2 rounded">
            Bookings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-semibold">Welcome to the Admin Panel</h1>
        <p className="text-gray-600 mt-2">
          Select a section from the sidebar to manage rooms, users, or bookings.
        </p>
        {/* Add routing or conditional rendering here to display content based on the selected section */}
      </main>
    </div>
  );
}
