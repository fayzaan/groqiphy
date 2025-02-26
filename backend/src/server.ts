// src/server.ts
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app';
import { connectDB } from './config/database';
import { initializeGameSocket } from './sockets/gameSocket';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Initialize socket event handlers
io.on('connection', (socket) => {
  initializeGameSocket(socket);
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});