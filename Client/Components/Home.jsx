import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const openModal = async () => {
    setShowModal(true);
    try {
      const res = await axios.get('http://localhost:3000/api/todos'); // Adjust API if needed
      setData(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="bg-white min-h-screen min-w-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {isAuthenticated ? (
          <>
            <h1 className="text-3xl font-extrabold text-gray-900">Welcome!</h1>
            <p className="text-gray-600 mb-6">Below are your Slides. Click to explore.</p>

            <div className="space-y-4">
              <button
                onClick={openModal}
                className="inline-block w-full py-3 px-6 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition font-medium shadow-md cursor-pointer"
              >
                🎯 View Presentation
              </button>

              <a
                href="AdminDashboard"
                className="inline-block w-full py-3 px-6 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition font-medium shadow-md"
              >
                📊 Access Dashboard
              </a>
            </div>
          </>
        ) : (
          <>
            <img
              src="https://cdn.dribbble.com/userupload/24092651/file/original-72fc68cb0c62d5429b7d9195cb49ad3c.gif"
              alt="Access Denied"
              className="w-80 mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-800">Access Restricted</h1>
            <p className="text-lg text-gray-600 mt-4 mb-6">
              You must be logged in to view the resources.
            </p>
            <a
              href="/login"
              className="inline-block py-3 px-6 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition font-medium shadow-md"
            >
              🔐 Log In to Continue
            </a>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ✖
            </button>

            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Slidev Links</h2>
              {data.length === 0 ? (
                <p className="text-gray-500">No slides available.</p>
              ) : (
                <ul className="space-y-2">
                  {data.map((item) => (
                    <li key={item._id}>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 underline hover:text-indigo-800"
                      >
                        {item.title || item.link}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
