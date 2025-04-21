// server/src/index.ts
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

interface User {
  username: string;
  inCall: boolean;
}

interface Users {
  [socketId: string]: User;
}

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000" || "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

const users: Users = {};
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on('register', (username: string) => {
    console.log(`${username} registered`);
    users[socket.id] = { username, inCall: false };
    
    // Broadcast updated user list to everyone
    io.emit('userList', Object.keys(users).map(id => ({
      id,
      username: users[id].username,
      inCall: users[id].inCall
    })));
  });
  
  // Handle call requests
  socket.on('callUser', ({ to, offer }: { to: string, offer: RTCSessionDescriptionInit }) => {
    console.log(`Call request from ${socket.id} to ${to}`);
    io.to(to).emit('incomingCall', {
      from: socket.id,
      offer,
      caller: users[socket.id]?.username || 'Unknown'
    });
  });
  
  // Handle call acceptance
  socket.on('answerCall', ({ to, answer }: { to: string, answer: RTCSessionDescriptionInit }) => {
    console.log(`Call answered by ${socket.id} to ${to}`);
    io.to(to).emit('callAccepted', {
      from: socket.id,
      answer,
      answerer: users[socket.id]?.username || 'Unknown'
    });
    
    // Mark both users as in call
    if(users[socket.id]) users[socket.id].inCall = true;
    if(users[to]) users[to].inCall = true;
    
    // Update user list for everyone
    io.emit('userList', Object.keys(users).map(id => ({
      id,
      username: users[id].username,
      inCall: users[id].inCall
    })));
  });
  
  // Handle ICE candidates exchange
  socket.on('iceCandidate', ({ to, candidate }: { to: string, candidate: RTCIceCandidateInit }) => {
    io.to(to).emit('iceCandidate', {
      from: socket.id,
      candidate
    });
  });
  
  // Handle call end
  socket.on('endCall', ({ to }: { to: string }) => {
    console.log(`Call ended by ${socket.id}`);
    
    // Notify the other user about call end
    io.to(to).emit('callEnded', { from: socket.id });
    
    // Update status
    if(users[socket.id]) users[socket.id].inCall = false;
    if(users[to]) users[to].inCall = false;
    
    // Update user list
    io.emit('userList', Object.keys(users).map(id => ({
      id,
      username: users[id].username,
      inCall: users[id].inCall
    })));
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    // Clean up user data
    delete users[socket.id];
    
    // Update everyone about user list
    io.emit('userList', Object.keys(users).map(id => ({
      id,
      username: users[id].username,
      inCall: users[id].inCall
    })));
  });
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Audio Call Server is running');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});