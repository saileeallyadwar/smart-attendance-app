import React from 'react';
import Sidebar from './Sidebar';

const AttendanceSheet = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-6">Attendance</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4 mb-4">
            <select className="border rounded px-3 py-2">
              <option>2023/03/15</option>
            </select>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Generate Sheet
            </button>
          </div>
          {/* Add table or grid for attendance data here */}
        </div>
      </div>
    </div>
  );
};

export default AttendanceSheet;