'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [facultyStatus, setFacultyStatus] = useState('');
  const [profilePic, setProfilePic] = useState('/default-profile.jpg');
  const [membershipExpire, setMembershipExpire] = useState('');
  const [sessionTime, setSessionTime] = useState(15 * 60);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Fetch user data on mount with retry logic
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Session expired or invalid. Redirecting to login.');
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      setError('');
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const response = await fetch('http://localhost:5000/api/auth/dashboard', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!response.ok) throw new Error(`Fetch failed: ${response.status} - ${await response.text()}`);
          const data = await response.json();
          setFirstName(data.firstName || '');
          setLastName(data.lastName || '');
          setStudentId(data.studentId || '');
          setFacultyStatus(data.facultyStatus || '');
          setProfilePic(data.profilePic ? `http://localhost:5000${data.profilePic}` : '/default-profile.jpg');
          setMembershipExpire(data.membershipExpire || '');
          break;
        } catch (error: any) {
          console.error(`Attempt ${attempt} failed:`, error.message);
          if (attempt === 3) {
            setError('Failed to load data after multiple attempts. Please try logging in again.');
            localStorage.removeItem('token');
            router.push('/login');
          }
          await new Promise(resolve => setTimeout(resolve, 2000 * attempt)); // Exponential backoff
        }
      }
    };

    fetchData();

    const timer = setInterval(() => {
      setSessionTime((prev) => {
        if (prev <= 0) {
          localStorage.removeItem('token');
          alert('Session expired. Please log in again.');
          router.push('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  // Handle profile picture upload
  const handleProfilePicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Session expired. Please log in again.');
      router.push('/login');
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', file);

    try {
      setError('');
      const response = await fetch('http://localhost:5000/api/auth/update-profile-pic', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile picture: ' + await response.text());
      }

      const data = await response.json();
      setProfilePic(data.profilePic ? `http://localhost:5000${data.profilePic}` : '/default-profile.jpg');
      alert('Profile picture updated successfully');
    } catch (error: any) {
      console.error('Profile pic upload error:', error);
      setError(error.message);
      alert('Failed to update profile picture. Please try again.');
    }
  };

  // Handle profile updates
  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const updatedData = { firstName, lastName, studentId, facultyStatus };

    try {
      setError('');
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile: ' + await response.text());
      }
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error: any) {
      console.error('Update error:', error);
      setError(error.message);
      alert('Failed to update profile. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('token');
        router.push('/login');
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Member Dashboard</h2>
            <div className="text-sm text-gray-500">
              Session: {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}
            </div>
          </div>
          {error && <div className="mb-4 text-sm text-red-500 text-center">{error}</div>}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-semibold text-indigo-600 mb-6">Profile</h3>
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm"
                  />
                  <label
                    htmlFor="profilePic"
                    className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 cursor-pointer hover:bg-indigo-700 transition duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h6m6 0h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input
                      id="profilePic"
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isEditing}
                    className="mt-1 w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 text-gray-900 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!isEditing}
                    className="mt-1 w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 text-gray-900 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Student ID</label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    disabled={!isEditing}
                    className="mt-1 w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 text-gray-900 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Faculty Status</label>
                  <input
                    type="text"
                    value={facultyStatus}
                    onChange={(e) => setFacultyStatus(e.target.value)}
                    disabled={!isEditing}
                    className="mt-1 w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 text-gray-900 disabled:bg-gray-100"
                  />
                </div>
                <button
                  onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
                  className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 font-medium"
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-semibold text-indigo-600 mb-6">Membership & Actions</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-gray-700">Membership Expires: <span className="font-medium">{membershipExpire}</span></p>
                  <p className="text-red-500 text-sm mt-1">Annual Fee: $15.00 due by August 1st each year</p>
                </div>
                <div className="space-y-3">
                  <Link
                    href="/voting"
                    className="block w-full text-center py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 font-medium"
                  >
                    Voting
                  </Link>
                  <Link
                    href="/events"
                    className="block w-full text-center py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 font-medium"
                  >
                    Event Registration
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300 font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}