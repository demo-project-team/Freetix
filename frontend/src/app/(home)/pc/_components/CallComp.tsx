/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// import { useUser } from '@/provider/UserProvider';
// import { useQueryState } from 'nuqs';
import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface User {
  id: string;
  username: string;
  inCall: boolean;
}

interface IncomingCall {
  from: string;
  offer: RTCSessionDescriptionInit;
  caller: string;
}

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [username, setUsername] = useState<string>('');
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'inCall'>('idle');
  const [currentCallTo, setCurrentCallTo] = useState<string | null>(null);
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
//   const {user} = useUser()
//   const [vendorId] = useQueryState('vendorid') 
  // Initialize socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);
    
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      newSocket.disconnect();
    };
  }, []);
  
  // Set up socket event listeners
  useEffect(() => {
    if (!socket) return;
    
    // Handle user list updates
    socket.on('userList', (userList: User[]) => {
      setUsers(userList.filter(user => user.id !== socket.id));
    });
    
    // Handle incoming calls
    socket.on('incomingCall', async ({ from, offer, caller }: IncomingCall) => {
      console.log(`Incoming call from ${caller}`);
      setIncomingCall({ from, offer, caller });
    });
    
    // Handle accepted calls
    socket.on('callAccepted', async ({ from, answer }: { from: string, answer: RTCSessionDescriptionInit }) => {
      console.log('Call accepted', from);
      
      try {
        if (pcRef.current) {
          await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
          setCallStatus('inCall');
        }
      } catch (err) {
        console.error('Error setting remote description on call accept:', err);
      }
    });
    
    // Handle ICE candidates
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    socket.on('iceCandidate', async ({ from, candidate }: { from: string, candidate: RTCIceCandidateInit }) => {
      if (!pcRef.current) return;
      
      try {
        if (candidate) {
          await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
      } catch (err) {
        console.error('Error adding ICE candidate:', err);
      }
    });
    
    // Handle call endings
    socket.on('callEnded', () => {
      endCall();
      setCallStatus('idle');
    });
    
    return () => {
      socket.off('userList');
      socket.off('incomingCall');
      socket.off('callAccepted');
      socket.off('iceCandidate');
      socket.off('callEnded');
    };
  }, [socket]);
  
  // Register user
  const registerUser = () => {
    if (!socket || !username.trim()) return;
    
    socket.emit('register', username);
    setIsRegistered(true);
    initLocalStream();
  };
  
  // Initialize local audio stream
  const initLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      localStreamRef.current = stream;
      
      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };
  
  // Create peer connection
  const createPeerConnection = (userId: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    });
    
    // Add local tracks to connection
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        pc.addTrack(track, localStreamRef.current!);
      });
    }
    
    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate && socket) {
        socket.emit('iceCandidate', {
          to: userId,
          candidate: event.candidate
        });
      }
    };
    
    // Handle incoming streams
    pc.ontrack = (event) => {
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = event.streams[0];
      }
    };
    
    return pc;
  };
  
  // Call a user
  const callUser = async (userId: string) => {
    try {
      setCurrentCallTo(userId);
      setCallStatus('calling');
      
      pcRef.current = createPeerConnection(userId);
      
      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);
      
      if (socket) {
        socket.emit('callUser', {
          to: userId,
          offer
        });
      }
    } catch (err) {
      console.error('Error initiating call:', err);
      setCallStatus('idle');
    }
  };
  
  // Answer incoming call
  const answerCall = async () => {
    if (!incomingCall || !socket) return;
    
    try {
      const { from, offer } = incomingCall;
      pcRef.current = createPeerConnection(from);
      
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);
      
      socket.emit('answerCall', {
        to: from,
        answer
      });
      
      setCurrentCallTo(from);
      setCallStatus('inCall');
      setIncomingCall(null);
    } catch (err) {
      console.error('Error answering call:', err);
    }
  };
  
  // Reject incoming call
  const rejectCall = () => {
    if (!incomingCall || !socket) return;
    
    socket.emit('endCall', { to: incomingCall.from });
    setIncomingCall(null);
  };
  
  // End active call
  const endCall = () => {
    if (currentCallTo && socket) {
      socket.emit('endCall', { to: currentCallTo });
    }
    
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    
    setCallStatus('idle');
    setCurrentCallTo(null);
    setIncomingCall(null);
  };
  
  // Toggle audio
  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnabled(audioTrack.enabled);
      }
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Audio Call App</h1>
      
      {!isRegistered ? (
        <div className="bg-gray-500 text-black p-6 rounded-lg shadow-md ">
          <h2 className="text-xl font-semibold mb-4">Enter Your Name to Join</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Name"
              className="input w-full"
            />
            <button 
              onClick={registerUser}
              className="btn-primary w-full"
            >
              Join
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-gray-400 rounded-lg shadow flex justify-between items-center">
            <h2 className="text-lg font-medium">Welcome, <span className="font-bold">{username}</span></h2>
            <button 
              onClick={toggleAudio}
              className={`${audioEnabled ? 'btn-success' : 'btn-warning'}`}
            >
              {audioEnabled ? 'Mute' : 'Unmute'}
            </button>
          </div>
          
          {incomingCall && (
            <div className="bg-gray-100 p-4 rounded-lg shadow border-l-4 border-amber-500 animate-pulse">
              <h3 className="text-lg font-medium mb-3 text-black">Incoming Call from {incomingCall.caller}</h3>
              <div className="flex space-x-3">
                <button onClick={answerCall} className="btn-success text-green-400 flex-1">Answer</button>
                <button onClick={rejectCall} className="btn-danger text-red-400 flex-1">Reject</button>
              </div>
            </div>
          )}
          
          {callStatus === 'inCall' && (
            <div className="bg-green-50 p-4 rounded-lg shadow border-l-4 border-green-500 text-black">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">In Call</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-medium">Connected</span>
                </div>
              </div>
              <button 
                onClick={endCall} 
                className="btn-danger w-full mt-3"
              >
                End Call
              </button>
            </div>
          )}
          
          {callStatus === 'calling' && (
            <div className="bg-blue-50 p-4 rounded-lg shadow border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Calling...</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-700 font-medium">Connecting</span>
                </div>
              </div>
              <button 
                onClick={endCall} 
                className="btn-warning w-full mt-3"
              >
                Cancel
              </button>
            </div>
          )}
          
          {callStatus === 'idle' && !incomingCall && (
            <div className="bg-gray-500 p-4 rounded-lg shadow text-black">
              <h3 className="text-lg font-medium mb-3">Available Users</h3>
              {users.length === 0 ? (
                <p className="py-3 text-center">No other users online</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <li key={user.id} className="py-3 flex justify-between items-center">
                      <span className="font-medium">{user.username}</span>
                      {!user.inCall ? (
                        <button 
                          onClick={() => callUser(user.id)}
                          className="btn-primary"
                        >
                          Call
                        </button>
                      ) : (
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                          In Call
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          
          {/* Audio elements (hidden) */}
          <audio ref={localAudioRef} muted autoPlay playsInline className="hidden" />
          <audio ref={remoteAudioRef} autoPlay playsInline className="hidden" />
        </div>
      )}
    </div>
  );
}