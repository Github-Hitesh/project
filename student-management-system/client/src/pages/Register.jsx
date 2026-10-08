import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 2000); 
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">📝 Student Registration</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Username</label>
          <input 
            type="text" 
            placeholder="Enter username" 
            required 
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-700"
            onChange={e => setFormData({...formData, username: e.target.value})} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
          <input 
            type="email" 
            placeholder="student@example.com" 
            required 
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-700"
            onChange={e => setFormData({...formData, email: e.target.value})} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
          <input 
            type="password" 
            placeholder="Min. 8 characters" 
            required 
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-700"
            onChange={e => setFormData({...formData, password: e.target.value})} 
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors shadow-sm"
        >
          Register Student
        </button>
      </form>
      
      {message && (
        <p className={`mt-4 p-2 text-sm font-semibold rounded ${
          message.includes('successfully') 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-600'
        }`}>
          {message}
        </p>
      )}
      
      <p className="mt-6 text-sm text-slate-600 text-center">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-medium">Login here</Link>
      </p>
    </div>
  );
}
