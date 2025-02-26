import { useState, useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";

export type UserState = {
  userId: string;
  currentStage: string;
  timer: number;
};

const useUserState = () => {
  const socket = useSocketContext();
  const [userState, setUserState] = useState<UserState | null>(null);

  useEffect(() => {
    const handleUserState = (state: UserState) => {
      setUserState(state);
    };

    socket.on("userState", handleUserState);
    return () => {
      socket.off("userState", handleUserState);
    };
  }, [socket]);

  return userState;
};

export default useUserState;