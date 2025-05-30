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
      const res = await axios.get('http://localhost:3000/api/todos');
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    if (!newTodo.title.trim() || !newTodo.link.trim()) return;
    try {
      await axios.post('http://localhost:3000/api/todos', newTodo);
      setNewTodo({ title: '', link: '' });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/todos/${id}`, editTodo);
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
    <div className="min-h-screen bg-gray-100 p-6">

   

      <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Title"
            className="flex-1 border px-3 py-2 rounded-md"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Link"
            className="flex-1 border px-3 py-2 rounded-md"
            value={newTodo.link}
            onChange={(e) => setNewTodo({ ...newTodo, link: e.target.value })}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3 rounded shadow"
            >
              {editingId === todo._id ? (
                <>
                  <input
                    className="border px-2 py-1 rounded mb-2 sm:mb-0 sm:mr-2 flex-1"
                    value={editTodo.title}
                    onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
                  />
                  <input
                    className="border px-2 py-1 rounded mb-2 sm:mb-0 sm:mr-2 flex-1"
                    value={editTodo.link}
                    onChange={(e) => setEditTodo({ ...editTodo, link: e.target.value })}
                  />
                  <button
                    onClick={() => handleUpdate(todo._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mb-2 sm:mb-0 sm:ml-2"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => window.open(todo.link, '_blank')}
                    className="text-blue-600 underline text-left flex-1 mb-2 sm:mb-0"
                  >
                    {todo.title}
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(todo._id);
                        setEditTodo({ title: todo.title, link: todo.link });
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
