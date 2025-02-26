// packages/frontend/src/context/SocketContext.tsx
import React, { createContext, FC, useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
import { initializeSocket } from "../socket";
import useAnonymousUser from "../hooks/useAnonymousUser";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const userId: string = useAnonymousUser();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (userId) {
      const newSocket = initializeSocket(userId);
      setSocket(newSocket);
    }
  }, [userId]);

  if (!socket) {
    return <div>Loading...</div>;
  }

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};