import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from '../components/Signup';
import VerifyOTP from '../components/VerifyOTP';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../components/Login';
import Navbar2 from '../components/Navbar2';
import Home from '../components/Home';
import { AdminDashboard } from '../Components/AdminDashboard';


const messages = [
  "Assembling the pieces...",
  "Polishing the interface...",
  "Almost ready for you...",
  "Loading your personalized experience..."
];

const Loader = () => {
  const [message] = useState(() => messages[Math.floor(Math.random() * messages.length)]);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50 space-y-4">
      {/* Wave Loader Animation */}
      <div className="flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="h-8 w-2 bg-gradient-to-b from-red-500 to-black-600 rounded-full"
            style={{
              animation: `pulse 1.2s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
              transformOrigin: 'bottom center'
            }}
          />
        ))}
      </div>
      
      {/* Loading message */}
      <p className="text-gray-600 text-sm mt-6 text-center">
        {message}
        <span className="block text-xs text-gray-400 mt-1">Thank you for waiting</span>
      </p>
    </div>
  );
};


export default function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setLoading(true);
      localStorage.setItem('hasVisited', 'true');

      const timer = setTimeout(() => {
        setLoading(false);
      }, 8000); 

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Navbar2 />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            style={{ marginTop: '80px' }}
          />

          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify" element={<VerifyOTP />} />
              <Route path="/login" element={<Login />} />
              <Route path="/AdminDashboard" element={<AdminDashboard />} />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}
