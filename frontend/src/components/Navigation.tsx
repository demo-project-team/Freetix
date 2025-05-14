'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <button onClick={() => setOpen(!open)} className="md:hidden p-4">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div className={`bg-gray-800 text-white w-64 p-4 space-y-4 absolute md:relative h-auto md:block transition-all duration-300 ${open ? 'block' : 'hidden md:block'}`}>
        <h2 className="text-xl font-bold mb-4">MyApp</h2>
        <Link href="/admin" className="block hover:bg-gray-700 p-2 rounded">Organizations</Link>
        <Link href="/admin" className="block hover:bg-gray-700 p-2 rounded">Complaints</Link>
        <Link href="/admin" className="block hover:bg-gray-700 p-2 rounded">Vendors</Link>
        <Link href="/admin" className="block hover:bg-gray-700 p-2 rounded">Settings</Link>
      </div>
    </div>
  );
}
