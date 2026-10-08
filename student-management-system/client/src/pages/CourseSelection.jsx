import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CourseSelection() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState({ text: '', isError: false });
  const { token, logoutSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/student/courses', {
          headers: { Authorization: token } 
        });
        setCourses(res.data);
      } catch (err) {
        setMessage({ text: 'Failed to load course configurations.', isError: true });
      }
    };
    fetchCatalog();
  }, [token]);

  const handleEnroll = async (courseId) => {
    setMessage({ text: '', isError: false });
    try {
      const res = await axios.post('http://localhost:5000/api/student/enroll', 
        { courseId }, 
        { headers: { Authorization: token } }
      );
      setMessage({ text: res.data.message, isError: false });
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || 'Enrollment transaction blocked.', 
        isError: true 
      });
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen rounded-xl">
      <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Academic Course Selection</h1>
          <p className="text-slate-500 text-sm mt-1">Enroll in your target modules for this term.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/profile')} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded transition">
            View My Profile
          </button>
          <button onClick={() => { logoutSession(); navigate('/login'); }} className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded transition">
            Log Out
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`mb-6 p-3 rounded font-medium text-sm ${message.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      {/* Renders dynamic card templates matching database objects */}
      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="p-5 bg-white border border-slate-200 rounded-lg shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-slate-800">{course.courseName}</h3>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
                  {course.credits} Credits
                </span>
              </div>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">{course.description}</p>
            </div>
            <button 
              onClick={() => handleEnroll(course.id)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded transition"
            >
              Enroll in Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
