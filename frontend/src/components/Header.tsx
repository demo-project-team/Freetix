'use client'
import React, { useState } from 'react';
import { Input } from './ui/input';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');



  return (
    <div className="bg-black text-white p-4 w-full flex items-center justify-between sticky top-0 shadow-lg">
      <form  className="flex-1 mx-4">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full max-w-md p-2 rounded-lg bg-gray-800 text-white border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </form>

    </div>
  );
};

export default Header;