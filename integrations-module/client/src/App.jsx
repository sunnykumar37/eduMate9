import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import Dashboard from './components/dashboard/Dashboard';
import StorageDashboard from './components/storage/StorageDashboard';
import CalendarDashboard from './components/calendar/CalendarDashboard';
import LMSDashboard from './components/lms/LMS';
import VideoDashboard from './components/video/VideoDashboard';
import NotFound from './components/common/NotFound';

function App() {
  // Skip authentication completely
  const [isAuthenticated] = useState(true);
  
  return (
    <Routes>
      {/* Always redirect to dashboard */}
      <Route path="/login" element={<Navigate to="/dashboard" />} />
      <Route path="/register" element={<Navigate to="/dashboard" />} />
      
      <Route path="/" element={<Layout onLogout={() => {}} />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="storage" element={<StorageDashboard />} />
        <Route path="calendar" element={<CalendarDashboard />} />
        <Route path="lms" element={<LMSDashboard />} />
        <Route path="video" element={<VideoDashboard />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App; 