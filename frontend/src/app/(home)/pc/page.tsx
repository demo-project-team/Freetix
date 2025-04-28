"use client";

import { getRoomUser } from "@/utils/request/vendor";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Pc() {
  const router = useRouter()
  const [vendorId] = useQueryState("vendorid");
  const { data: rooms = [] } = useQuery({
    queryKey: ["room"],
    queryFn: () => getRoomUser(vendorId),
  });
  console.log(rooms);


  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading] = useState("")

  // Get unique room types for filter
  const roomTypes = [...new Set(rooms.map(room => room.type || 'standard'))];

  const filteredRooms = activeFilter === 'all'
  ? rooms
  : rooms.filter(room => (room.type || 'STANDART') === activeFilter);
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4">
      <h1 className="text-4xl font-bold text-center text-white mb-2">Room Selection</h1>
      <p className="text-center text-blue-300 mb-8">Choose your perfect space for an unforgettable experience</p>
      
      {/* Room Type Filter */}
      {filteredRooms.length > 1 && (
        <div className="flex justify-center mb-8">
          <div className="bg-indigo-800 bg-opacity-50 rounded-full p-1 flex">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeFilter === 'all' 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              All Rooms
            </button>
            
            {roomTypes.map(type => (
              <button 
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeFilter === type 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room, i) => (
              <motion.div
                key={i}
                className={`relative overflow-hidden rounded-xl cursor-pointer  ? 'opacity-60' : ''
                }`}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                onMouseLeave={() => setHoveredRoom(null)}
              >
                {/* Room Image */}
                <div className="relative h-64 w-full bg-gray-800">
                  <div 
                    className="absolute inset-0 bg-center bg-cover" 
                    style={{ 
                      backgroundPosition: 'center',
                      filter: hoveredRoom === i ? 'brightness(1.1)' : 'brightness(0.9)'
                    }}
                  />
                  </div>

                  
                  {/* Room Type Badge */}
                  
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={()=>router.push(`/room?roomid=${room.id}`)}>
                      <span className="text-white font-bold text-xl">{room.name}</span>
                    </div>
                
                {/* Room Info */}
                <div className="bg-gradient-to-br from-indigo-800 to-purple-900 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-red-800">{room.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
          <>
          </>
          )}
        </div>
      )}
    </div>
  );
}