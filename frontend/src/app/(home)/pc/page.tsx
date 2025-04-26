"use client";

import { getRoomUser } from "@/utils/request/vendor";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Pc() {
  const [vendorId] = useQueryState("vendorid");
  const { data: rooms = [] } = useQuery({
    queryKey: ["room"],
    queryFn: () => getRoomUser(vendorId),
  });
  console.log(rooms);


  const [selectedRoom, setSelectedRoom] = useState(null);
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading] = useState("")

  // Get unique room types for filter
  const roomTypes = [...new Set(rooms.map(room => room.type || 'standard'))];


    
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4">
      <h1 className="text-4xl font-bold text-center text-white mb-2">Room Selection</h1>
      <p className="text-center text-blue-300 mb-8">Choose your perfect space for an unforgettable experience</p>
      
      {/* Room Type Filter */}
      {roomTypes.length > 1 && (
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
          {rooms.length > 0 ? (
            rooms.map((room, i) => (
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
                  
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{room.name}</span>
                </div>
                
                {/* Room Info */}
                <div className="bg-gradient-to-br from-indigo-800 to-purple-900 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-red-800">{room.name}</h3>
                  </div>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    
                      <>
                        <span className="text-xs bg-purple-700 bg-opacity-50 text-purple-200 px-2 py-1 rounded">Premium Sound</span>
                        <span className="text-xs bg-purple-700 bg-opacity-50 text-purple-200 px-2 py-1 rounded">Private Bar</span>
                        <span className="text-xs bg-purple-700 bg-opacity-50 text-purple-200 px-2 py-1 rounded">Large Space</span>
                      </>
                      <>
                        <span className="text-xs bg-blue-700 bg-opacity-50 text-blue-200 px-2 py-1 rounded">Standard Sound</span>
                        <span className="text-xs bg-blue-700 bg-opacity-50 text-blue-200 px-2 py-1 rounded">Cozy Space</span>
                      </>
                    {rooms.map((room, index) => (
                      <span key={index} className="text-xs bg-blue-700 bg-opacity-50 text-blue-200 px-2 py-1 rounded">
                        {room.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-white py-10">
              <p className="text-xl">No rooms available with the selected filter.</p>
            </div>
          )}
        </div>
      )}

      {/* Room Detail Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <motion.div 
            className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden max-w-2xl w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="relative h-64">
              <div 
                className="absolute inset-0 bg-center bg-cover" 
              />
              <button 
                className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={() => setSelectedRoom(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">p</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-300 mb-2">Room Features</h3>
                  <ul className="grid grid-cols-2 gap-2">
                      <>
                        <li className="flex items-center text-gray-300">
                          <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          Premium Sound System
                        </li>
                        <li className="flex items-center text-gray-300">
                          <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          Private Bar
                        </li>
                        <li className="flex items-center text-gray-300">
                          <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          Large Space (10+ people)
                        </li>
                        <li className="flex items-center text-gray-300">
                          <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          Premium Song Selection
                        </li>
                      </>
                      <>
                        <li className="flex items-center text-gray-300">
                          <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          Standard Sound System
                        </li>
                        <li className="flex items-center text-gray-300">
                          <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          Cozy Space (4-6 people)
                        </li>
                        <li className="flex items-center text-gray-300">
                          <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                          Standard Song Selection
                        </li>
                      </>
                    {rooms.map((room, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        {room.name}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-blue-300 mb-2">Select Time</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"].map((time) => (
                      <button 
                        key={time}
                        className="py-2 border border-purple-500 rounded text-center text-white hover:bg-purple-700 transition"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-4">
                <button className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:from-pink-600 hover:to-purple-700 transition">
                  Book Now
                </button>
                <button 
                  className="px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition"
                  onClick={() => setSelectedRoom(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
{/* <div>
      {rooms.map((room, i) => (
        <div key={i} className="text-red-500 flex items-center justify-center">
          {room.name}
        </div>
      ))}
    </div> */}