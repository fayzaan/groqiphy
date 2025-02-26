import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

// console.log('socket.ts', SOCKET_URL);

// export const socket: Socket = io(SOCKET_URL, {
//   reconnectionAttempts: 5,
//   transports: ["websocket"]
// });

export const initializeSocket = (userId: string): Socket => {
  return io(SOCKET_URL, {
    reconnectionAttempts: 5,
    transports: ["websocket"],
    query: { userId }
  });
};
