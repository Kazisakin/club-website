'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1); // 1: Email input, 2: Code input
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle email submission for sending verification code
  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!email.toLowerCase().endsWith('@unb.ca')) {
      setMessage('Please use a valid @unb.ca email address.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send code');
      setMessage(data.message || '');
      setStep(2);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle code submission for login verification
  const handleCodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');
      setMessage(data.message || '');
      if (data.token) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Check token and redirect if invalid (for dashboard protection)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && window.location.pathname === '/dashboard') {
      fetch('http://localhost:5000/api/auth/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` },
      }).catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
    }
  }, [router]);

  // Handle input for verification code to ensure 6 digits
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 1); // Only allow one digit per input
    const newCode = code.split('');
    newCode[index] = value;
    setCode(newCode.join(''));
    if (value && index < 5) {
      (e.target.nextSibling as HTMLInputElement)?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      ((e.target as HTMLElement).previousSibling as HTMLInputElement)?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">UNB BSS</h2>
            <p className="text-gray-500 text-sm mt-2">Sign in with your @unb.ca email</p>
          </div>
          {step === 1 ? (
            <form className="space-y-6" onSubmit={handleEmailSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 text-gray-900 placeholder-gray-400"
                  placeholder="example@unb.ca"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Get Login Code'
                  )}
                </button>
              </div>
              {message && <p className="text-center text-sm text-red-500">{message}</p>}
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleCodeSubmit}>
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Verification Code
                </label>
                <div className="mt-2 flex justify-center space-x-2">
                  {[...Array(6)].map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={code[index] || ''}
                      onChange={(e) => handleCodeChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 text-center text-lg font-medium bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 text-gray-900"
                      required
                    />
                  ))}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading || code.length !== 6}
                  className="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Logging in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
              {message && <p className="text-center text-sm text-red-500">{message}</p>}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => { setStep(1); setMessage(''); setCode(''); }}
                  className="text-sm text-indigo-600 hover:text-indigo-800 transition duration-300"
                >
                  Back to Email
                </button>
              </div>
            </form>
          )}
          <p className="text-center text-sm text-gray-500 mt-6">
            Need an account?{' '}
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-800 transition duration-300">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}