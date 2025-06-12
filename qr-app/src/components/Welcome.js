import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, Briefcase } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Welcome to QRoll</h1>
      <div className="flex justify-center space-x-8">
        <Link to="/login/student" className="flex flex-col items-center p-8 bg-white rounded-lg card-shadow hover:shadow-xl transition-shadow duration-300">
          <UserCircle size={48} className="mb-4 text-gray-700" />
          <span className="text-lg font-semibold text-gray-700">Student</span>
        </Link>
        <Link to="/login/employee" className="flex flex-col items-center p-6 bg-white rounded-lg card-shadow hover:shadow-xl transition-shadow duration-300">
          <Briefcase size={48} className="mb-4 text-gray-700" />
          <span className="text-lg font-semibold text-gray-700">Employee</span>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;