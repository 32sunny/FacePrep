import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function VerifyOTP() {
  const [otp, setOTP] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('email');



  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://faceprep-1.onrender.com/api/auth/verify-otp', { email, otp });
      navigate('/');
      toast.success("OTP verified successfully!");
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid OTP');
      toast.error("Invalid OTP");
    }
  };

  return (
    <form onSubmit={handleVerify} className="bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-xl font-semibold mb-4 text-center">Verify OTP</h2>
      <p className="text-sm mb-2 text-gray-600">OTP sent to {email}</p>
      <input
        type="text"
        placeholder="Enter OTP"
        className="w-full mb-3 p-2 border rounded"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Verify</button>
    </form>
  );
}
