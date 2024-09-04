import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';  
import Signup from './Pages/Signup';
import ProtectedRoute from './Components/ProtectedRoute';

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function SignupAndLogout() {
  localStorage.clear()
  return <Signup />
}

function App() {
   
  return (
    <Router>
      <Routes>
        {/* Default route renders the login page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>  
          }
        />
        <Route path= "/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<SignupAndLogout />} />
        
        {/* Dashboard route, accessible only after login */}
        
      </Routes>
    </Router>
  );
}

export default App;