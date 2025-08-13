import Link from 'next/link';
import { Mail, Instagram, Facebook, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-indigo-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">UNB BSS</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            The UNB Bangladeshi Student Society fosters a vibrant community for Bangladeshi students through cultural events, academic support, and networking.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/events" className="text-gray-300 hover:text-white transition-colors duration-200">
                Events
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/#membership"
                scroll={true}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Join the Club
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:unbbss@gmail.com"
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                unbbss@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://maps.unb.ca/"
                className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                UNB Fredericton Campus
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://fb.com/unbbss"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com/unbbss"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-indigo-700 text-center">
        <p className="text-gray-300 text-sm">
          &copy; 2025 UNB Bangladeshi Student Society. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}