import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const results = data.filter(item =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.link?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const openModal = async () => {
    setShowModal(true);
    try {
      const res = await axios.get('https://faceprep-1.onrender.com/api/todos');
      setData(res.data);
      setFilteredData(res.data); 
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSearchTerm(''); 
  };

  return (
    <div className="bg-black-100 min-w-screen flex  justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {isAuthenticated ? (
          <div className="max-w-md mx-auto p-6 bg-white rounded-xl ">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
            <p className="text-gray-500 mb-6">Review your presentation slides or access the analytics dashboard</p>

            <div className="space-y-3">
              <button
                onClick={openModal}
                className="w-full py-3 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 text-white font-medium flex items-center justify-center gap-2 shadow hover:shadow-md cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Presentation
              </button>

              <a
                href="AdminDashboard"
                className="w-full py-3 px-6 rounded-lg bg-gray-800 hover:bg-gray-900 transition-all duration-200 text-white font-medium flex items-center justify-center gap-2 shadow hover:shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Access Dashboard
              </a>
            </div>
          </div>
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
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="p-6 pb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Slidev Links</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Search Bar */}
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by title or URL..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto px-6 pb-6">
              {filteredData.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">
                    {searchTerm ? 'No matching slides found' : 'No slides available'}
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {filteredData.map((item) => (
                    <li key={item._id} className="group">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group-hover:border-indigo-200"
                      >
                        <h3 className="font-medium text-gray-800 truncate">{item.title || 'Untitled Slide'}</h3>
                        <p className="text-sm text-gray-500 truncate">{item.link}</p>
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