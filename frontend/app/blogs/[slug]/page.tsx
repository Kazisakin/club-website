'use client';

import { motion } from 'framer-motion';
import Navbar from '../../../components/Navbar';
import { blogs } from '../../../lib/blogsData';
import { useParams } from 'next/navigation';

export default function BlogPage() {
  const params = useParams();
  const slug = params.slug as string;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="bg-gray-900 text-white font-sans min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-white">Blog Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-green-600/20">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-2xl mb-8"
          />
          <h1 className="text-4xl font-bold text-white mb-6">{blog.title}</h1>
          <p className="text-lg text-white/80 leading-relaxed">{blog.content}</p>
        </div>
      </motion.div>
    </div>
  );
}