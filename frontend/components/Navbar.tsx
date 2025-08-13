'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Users, Calendar } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  };

  const handleJoinClick = () => {
    document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-2xl font-bold text-indigo-700">
              <img 
                src="/images/logo.png"  // Path to the logo image
                alt="UNB BSS Logo"
                className="h-8 mr-3"  // Adjust the height of the logo and margin for spacing
              />            
             
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-green-600 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/events"
              className="text-green-600 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md transition-all duration-200"
            >
              Events
            </Link>
            <Link
              href="/about"
              className="text-green-600 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md transition-all duration-200"
            >
              About
            </Link>
            <button
              onClick={handleJoinClick}
              className="bg-indigo-700 text-white px-5 py-2 rounded-full hover:bg-indigo-800 transition-colors duration-200 font-medium"
            >
              Join the Club
            </button>
            <Link
              href="/login"
              className="text-indigo-700 hover:text-indigo-800 font-medium transition-colors duration-200"
            >
              Login
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-700 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden bg-white px-4 py-3 border-t border-gray-200"
          >
            <Link
              href="/"
              className="block py-2 text-green-600 font-bold hover:bg-red-500 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/events"
              className="block py-2 text-green-600 font-bold hover:bg-red-500 hover:text-white transition-colors duration-200"
            >
              Events
            </Link>
            <Link
              href="/about"
              className="block py-2 text-green-600 font-bold hover:bg-red-500 hover:text-white transition-colors duration-200"
            >
              About
            </Link>
            <button
              onClick={handleJoinClick}
              className="block w-full text-left py-2 text-green-600 font-bold hover:bg-red-500 hover:text-white transition-colors duration-200"
            >
              Join the Club
            </button>
            <Link
              href="/login"
              className="block py-2 text-green-600 font-bold hover:bg-red-500 hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
