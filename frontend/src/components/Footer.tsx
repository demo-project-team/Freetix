// components/Footer.js
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-black text-white p-6 sticky top-0 flex flex-col md:flex-row justify-between items-center border-t border-pink-500">
      <div className="mb-4 md:mb-0">
        <Link href="/">
          <span className="text-xl font-bold text-pink-500 neon-text">Freetix</span>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
        <Link href="/about">
          <span className="hover:text-pink-500 transition">About Us</span>
        </Link>
        <Link href="/contact">
          <span className="hover:text-pink-500 transition">Contact</span>
        </Link>
        <Link href="/privacy">
          <span className="hover:text-pink-500 transition">Privacy Policy</span>
        </Link>
        <Link href="/terms">
          <span className="hover:text-pink-500 transition">Terms of Service</span>
        </Link>
      </div>
      <div className="mt-4 md:mt-0 text-gray-400">
        <p>&copy; {new Date().getFullYear()} DreamApp. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;