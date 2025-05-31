import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from '../components/Signup';
import VerifyOTP from '../components/VerifyOTP';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../components/Login';
import Navbar2 from '../components/Navbar2';
import Home from '../components/Home';
import { AdminDashboard } from '../Components/AdminDashboard';



export default function App() {





  return (
    <>
      <Router>
        <Navbar2 />
        <ToastContainer
  position="top-right"
  autoClose={2000}
  style={{ marginTop: '80px' }} // adjust the value as needed
/>
        
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<VerifyOTP />} />
            <Route path="/login" element={<Login />} />
            <Route path="AdminDashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
