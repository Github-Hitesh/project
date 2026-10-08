import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const { loginSession } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = res.data;
      
      loginSession(token, user);
      
      navigate('/courses');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Authentication failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Student Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Username</label>
          <input 
            type="text" 
            required 
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setFormData({...formData, username: e.target.value})} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
          <input 
            type="password" 
            required 
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setFormData({...formData, password: e.target.value})} 
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-750 text-white font-medium rounded transition">
          Log In
        </button>
      </form>
      {errorMsg && <p className="mt-4 p-2 bg-red-50 text-red-600 text-sm font-semibold rounded">{errorMsg}</p>}
      <p className="mt-6 text-sm text-slate-600 text-center">
        New student? <Link to="/register" className="text-blue-600 hover:underline">Create an account here</Link>
      </p>
    </div>
  );
}
