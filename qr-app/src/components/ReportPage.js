import React, { useState } from 'react';
import Sidebar from './Sidebar';

const ReportPage = () => {
  const [subject, setSubject] = useState('Advance Java');
  const [semester, setSemester] = useState('Jan');

  const handleGenerateReport = () => {
    // Implement report generation logic here
    console.log('Generating report for', subject, 'in semester', semester);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-6">Report</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4 mb-4">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="Advance Java">Advance Java</option>
              {/* Add more subject options here */}
            </select>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="Jan">Jan</option>
              {/* Add more semester options here */}
            </select>
            <button
              onClick={handleGenerateReport}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Generate Report
            </button>
          </div>
          {/* Add table or grid for report data here */}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;