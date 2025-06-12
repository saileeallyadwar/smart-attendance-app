import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, BarChart2, User, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="bg-white w-60 min-h-screen flex flex-col">
      <nav className="flex-1 px-2 py-4">
        <Link to="/attendance" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
          <FileText className="mr-3" />
          Attendance Sheet
        </Link>
        <Link to="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
          <BarChart2 className="mr-3" />
          Dashboard
        </Link>
        <Link to="/report" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
          <FileText className="mr-3" />
          Report
        </Link>
        <Link to="/student" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
          <User className="mr-3" />
          Student
        </Link>
      </nav>
      <div className="px-4 py-2">
        <button className="flex items-center text-gray-700 hover:text-gray-900">
          <LogOut className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;