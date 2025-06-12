import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Login from './components/Login';
import AttendanceSheet from './components/AttendanceSheet';
import Dashboard from './components/Dashboard';
import GenerateQR from './components/GenerateQR'; // Import GenerateQR
import ReportPage from './components/ReportPage';


const App = () => {
  return (
    <Router>
      {/* Apply the background classes to the main div */}
      <div className="App bg-qroll bg-pattern">
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login/:userType" element={<Login />} />
          <Route path="/attendance" element={<AttendanceSheet />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/generate-qr" element={<GenerateQR />} /> {/* Add the GenerateQR route */}
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
