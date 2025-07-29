'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated by presence of token
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <nav className="bg-indigo-900 text-white p-4 fixed w-full z-10 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <img src="/images/logo.png" alt="UNB BSS Logo" className="h-10 mr-4" />
          </Link>
          
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-teal-300 transition duration-200">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="hover:text-teal-300 transition duration-200">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-md text-sm transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-teal-500 hover:bg-teal-600 px-3 py-1 rounded-md text-sm transition duration-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}