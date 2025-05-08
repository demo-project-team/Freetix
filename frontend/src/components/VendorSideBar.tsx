'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function VendroSidbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex sticky top-0">
      <button onClick={() => setOpen(!open)} className="md:hidden p-4">
        {open ? <X stroke='white' fill='white' size={25} /> : <Menu size={24} />}
      </button>
      <div className={`bg-gray-800 text-white w-64 sticky top-0 p-4  md:relative h-screen md:sticky transition-all duration-300 ${open ? 'block' : 'hidden md:block'}`}>
        <h2 className="text-xl font-bold mb-4">MyApp</h2>
        <Link href="#" className="block hover:bg-gray-700 p-2 rounded">Home</Link>
        <Link href="/" className="block hover:bg-gray-700 p-2 rounded">Schedule</Link>
        <Link href="/admin" className="block hover:bg-gray-700 p-2 rounded">Settings</Link>
        <Link href="/vendor/account" className='block hover:bg-gray-700 p-2 rounded'>Account</Link>
      </div>
    </div>
  );
}
