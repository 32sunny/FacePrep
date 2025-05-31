import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', link: '' });
  const [editingId, setEditingId] = useState(null);
  const [editTodo, setEditTodo] = useState({ title: '', link: '' });

const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;
const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  
  

  useEffect(() => {
    const authStatus = localStorage.getItem('admin-auth');
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (authStatus === 'true' && user?.email === adminEmail) {
      setIsAuthenticated(true);
    }
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user || user.email !== adminEmail) {
      setError('Access denied. You are not the admin.');
      return;
    }
  
    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('admin-auth', 'true');
    } else {
      setError('Incorrect password');
    }
  };
  

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('https://faceprep-1.onrender.com/api/todos');


      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    if (!newTodo.title.trim() || !newTodo.link.trim()) return;
    try {
      await axios.post('https://faceprep-1.onrender.com/api/todos', newTodo);
      setNewTodo({ title: '', link: '' });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://faceprep-1.onrender.com/api/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`https://faceprep-1.onrender.com/api/todos/${id}`, editTodo);
      setEditingId(null);
      setEditTodo({ title: '', link: '' });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Admin Access</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  // Show Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Slidev Manager
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Manage your slides and presentations
        </p>
      </div>
  
      {/* Add Slide Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-full bg-blue-100 mr-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Add New Slide</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Presentation title"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 border"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            />
          </div>
          <div className="md:col-span-5">
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">Link</label>
            <input
              id="link"
              type="text"
              placeholder="https://example.com/slide"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 border"
              value={newTodo.link}
              onChange={(e) => setNewTodo({ ...newTodo, link: e.target.value })}
            />
          </div>
          <div className="md:col-span-2 flex items-end">
            <button
              onClick={handleAdd}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md shadow transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          </div>
        </div>
      </div>
  
      {/* Slides List */}
      <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center">
          <div className="p-2 rounded-full bg-indigo-100 mr-3">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Your Slides</h2>
          <span className="ml-auto bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full">
            {todos.length} items
          </span>
        </div>
        
        <ul className="divide-y divide-gray-100">
          {todos.map((todo) => (
            <li key={todo._id} className="hover:bg-gray-50 transition-colors duration-150">
              {editingId === todo._id ? (
                <div className="px-6 py-5">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-5">
                      <input
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border"
                        value={editTodo.title}
                        onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <input
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 border"
                        value={editTodo.link}
                        onChange={(e) => setEditTodo({ ...editTodo, link: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2 flex space-x-2">
                      <button
                        onClick={() => handleUpdate(todo._id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md shadow transition-colors duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md shadow transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center">
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => window.open(todo.link, '_blank')}
                      className="text-left w-full text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                    >
                      <p className="text-lg font-medium text-gray-900 truncate">{todo.title}</p>
                      <p className="text-sm text-gray-500 truncate mt-1">{todo.link}</p>
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-4 flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(todo._id);
                        setEditTodo({ title: todo.title, link: todo.link });
                      }}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  
  );
};
