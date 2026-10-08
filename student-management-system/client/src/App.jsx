import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import CourseSelection from './pages/CourseSelection';
import Profile from './pages/Profile';

// Security Guard: Blocks access if user is not authenticated
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Minimalist Visual Layout Wrapper */}
        <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
          <Routes>
            {/* Public Entry Points */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            {/* Private Protected Student Environments */}
            <Route path="/courses" element={<ProtectedRoute><CourseSelection /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Default Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/register" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
