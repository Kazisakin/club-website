// frontend/components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center">
      <p>&copy; 2025 UNB Bangladeshi Student Society. All Rights Reserved.</p>
      <div className="mt-2">
        <Link href="/" className="text-[#006400] hover:underline mx-2">Home</Link>
        <Link href="#membership" className="text-[#006400] hover:underline mx-2">Join</Link>
        <Link href="#events" className="text-[#006400] hover:underline mx-2">Events</Link>
        <Link href="#contact" className="text-[#006400] hover:underline mx-2">Contact</Link>
      </div>
    </footer>
  );
}