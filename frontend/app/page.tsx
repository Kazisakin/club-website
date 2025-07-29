'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Instagram, Facebook, MapPin, Users, Calendar, Book, ArrowRight } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleJoinClick = () => {
    document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50">        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white px-4 py-2"
            >
              <Link href="/login" className="block py-2 text-gray-700 hover:text-[#F52727]">Login</Link>
              <button
                onClick={handleJoinClick}
                className="block w-full text-left py-2 text-gray-700 hover:text-[#F52727]"
              >
                Join the Club
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-[url('/images/placeholder.jpg')] bg-cover bg-center text-white pt-24 pb-20"
        style={{ backgroundColor: '#B22222' }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            UNB Bangladeshi Student Society
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Connecting Bangladeshi students at UNB through vibrant cultural events, academic support, and a welcoming community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/login"
              className="bg-[#1fd155] text-white px-6 py-3 rounded-lg hover:bg-black hover:text-white transition-colors font-medium"
            >
              Login
            </Link>
            <button
              onClick={handleJoinClick}
              className="bg-[#1fd155] text-white px-6 py-3 rounded-lg hover:bg-black hover:text-white transition-colors font-medium"
            >
              Join the Club
            </button>
          </div>
        </div>
      </motion.header>

      {/* About the Club */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <img
              src="/images/placeholder.jpg"
              alt="UNB BSS Community"
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-semibold text-[#F52727] mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" />
              About Us
            </h2>
            <p className="text-lg text-gray-600">
              The UNB Bangladeshi Student Society (BSS) is a vibrant community dedicated to fostering cultural pride, academic
              excellence, and lifelong friendships among Bangladeshi students at the University of New Brunswick. From cultural
              celebrations to professional workshops, we provide a supportive space for students to thrive.
            </p>
            <p className="text-lg text-gray-600 mt-4">
              Our mission is to create a sense of belonging, celebrate Bangladeshi heritage, and empower students through
              mentorship, networking, and community engagement.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Executive Team */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-3xl font-semibold text-[#1fd155] text-center mb-8 flex items-center justify-center gap-2">
          <Users className="w-6 h-6" />
          Our Leadership
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Meet the passionate team driving the UNB BSS forward with dedication and vision.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: 'President', title: '[Name]' },
            { name: 'Vice President', title: '[Name]' },
            { name: 'General Secretary', title: '[Name]' },
            { name: 'Treasurer', title: '[Name]' },
            { name: 'Event Coordinator', title: '[Name]' },
            { name: 'Faculty Advisor', title: '[Name, Department]' },
          ].map((member, index) => (
            <div key={index} className="text-center p-4 bg-white rounded-xl shadow-lg">
              <img
                src="/images/placeholder.jpg"
                alt={`${member.name} Photo`}
                className="w-24 h-24 mx-auto rounded-full mb-3 object-cover"
              />
              <h3 className="text-xl font-medium text-gray-900">{member.name}</h3>
              <p className="text-gray-600">{member.title}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Events & Gallery */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-3xl font-semibold text-[#F52727] text-center mb-8 flex items-center justify-center gap-2">
          <Calendar className="w-6 h-6" />
          Events & Memories
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          From vibrant cultural festivals to engaging workshops, our events create unforgettable memories and strengthen our
          community.
        </p>
        <div className="columns-2 sm:columns-3 gap-4">
          {Array(8).fill(0).map((_, i) => (
            <img
              key={i}
              src="/images/placeholder.jpg"
              alt={`Event Photo ${i + 1}`}
              className="mb-4 rounded-xl shadow-md w-full h-48 object-cover"
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/gallery"
            className="bg-[#1fd155] text-white px-6 py-3 rounded-lg hover:bg-black hover:text-white transition-colors font-medium"
          >
            Explore Full Gallery
          </Link>
        </div>
      </motion.section>

      {/* Student Resources */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-3xl font-semibold text-[#1fd155] text-center mb-8 flex items-center justify-center gap-2">
          <Book className="w-6 h-6" />
          Student Resources
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover our comprehensive guides and vlogs to help you navigate life at UNB with confidence.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            'New Student Orientation Guide',
            'Housing & Survival Tips',
            'Campus Life & Activities',
            'Visa & Immigration Support',
            'Career & Networking Guide',
            'Mental Health Resources',
            'Scholarship Opportunities',
          ].map((resource, index) => (
            <Link
              key={index}
              href={`/${resource.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className="bg-white text-[#F52727] px-6 py-4 rounded-xl shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center text-center"
            >
              {resource}
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Membership Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        id="membership"
        className="bg-[#F52727] text-white py-16 px-4 text-center"
      >
        <h2 className="text-3xl font-semibold mb-6">Join Our Community</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Become a part of the UNB BSS and gain access to exclusive events, mentorship programs, and a network of supportive
          peers. Whether you're a new or returning student, there's a place for you in our family.
        </p>
        <Link
          href="/signup"
          className="bg-[#1fd155] text-white px-6 py-3 rounded-lg hover:bg-black hover:text-white transition-colors font-medium inline-flex items-center gap-2"
        >
          Sign Up Now <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.section>

      {/* Contact & Social Media */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto py-16 px-4 text-center"
      >
        <h2 className="text-3xl font-semibold text-[#1fd155] mb-6 flex items-center justify-center gap-2">
          <Mail className="w-6 h-6" />
          Connect With Us
        </h2>
        <p className="text-gray-600 mb-6">
          Have questions? Reach out to us or follow our socials for the latest updates.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <a
            href="mailto:unbbss@gmail.com"
            className="text-[#F52727] hover:text-[#F52727]/80 transition-colors flex items-center gap-2 justify-center"
          >
            <Mail className="w-5 h-5" />
            unbbss@gmail.com
          </a>
          <a
            href="https://fb.com/unbbss"
            className="text-[#F52727] hover:text-[#F52727]/80 transition-colors flex items-center gap-2 justify-center"
          >
            <Facebook className="w-5 h-5" />
            Facebook
          </a>
          <a
            href="https://instagram.com/unbbss"
            className="text-[#F52727] hover:text-[#F52727]/80 transition-colors flex items-center gap-2 justify-center"
          >
            <Instagram className="w-5 h-5" />
            Instagram
          </a>
        </div>
        <p>
          <a
            href="https://maps.unb.ca/"
            className="text-[#F52727] hover:text-[#F52727]/80 transition-colors flex items-center gap-2 justify-center mx-auto"
          >
            <MapPin className="w-5 h-5" />
            UNB Fredericton Campus
          </a>
        </p>
      </motion.section>
    </div>
  );
}