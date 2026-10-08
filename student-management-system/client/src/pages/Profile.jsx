import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const { token, logoutSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/student/profile', {
          headers: { Authorization: token }
        });
        setProfileData(res.data);
      } catch (err) {
        console.error('Failed to parse identity profile credentials.');
      }
    };
    fetchProfile();
  }, [token]);

  if (!profileData) {
    return <div className="text-center my-12 text-slate-500 font-medium">Loading secure student profiles...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-slate-200 rounded-xl shadow-xs">
      <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800">Student Profile Dashboard</h2>
          <p className="text-sm text-slate-400 mt-1">Verified account registration details.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate('/courses')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded transition">
            Back to Courses
          </button>
          <button onClick={() => { logoutSession(); navigate('/login'); }} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium text-sm rounded transition">
            Log Out
          </button>
        </div>
      </div>

      {/* Account Parameters Details Grid */}
      <div className="bg-slate-50 p-4 rounded-lg mb-8 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="block font-semibold text-slate-400 uppercase tracking-wider text-xs">Username</span>
          <strong className="text-base text-slate-700 font-bold">{profileData.username}</strong>
        </div>
        <div>
          <span className="block font-semibold text-slate-400 uppercase tracking-wider text-xs">Email Address</span>
          <strong className="text-base text-slate-700 font-bold">{profileData.email}</strong>
        </div>
      </div>

      {/* Enrolled Courses Mapping View Section */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          📝 Selected Registrations 
          <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-bold">
            {profileData.Courses?.length || 0}
          </span>
        </h3>
        
        {profileData.Courses && profileData.Courses.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {profileData.Courses.map((course) => (
              <li key={course.id} className="p-4 border border-slate-200 rounded-lg flex justify-between items-center bg-white shadow-2xs">
                <div>
                  <h4 className="font-bold text-slate-700 text-base">{course.courseName}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Course Database Key Reference ID: #{course.id}</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded">
                  +{course.credits} Credits
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center p-6 bg-slate-50 border-2 border-dashed border-slate-200 text-slate-400 rounded-lg text-sm font-medium">
            No course selection configurations recorded yet. Navigate back to add classes.
          </div>
        )}
      </div>
    </div>
  );
}
