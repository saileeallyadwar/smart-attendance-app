import React from 'react';
import Sidebar from './Sidebar';

const DashboardCard = ({ title, value, increase }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm text-green-500">{increase}% increase</p>
  </div>
);

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard title="Attendance | Semester" value="145" increase="12" />
          <DashboardCard title="Present | Today" value="145" increase="12" />
          <DashboardCard title="Absent | Today" value="145" increase="12" />
          <DashboardCard title="Present | Overall" value="145" increase="12" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;