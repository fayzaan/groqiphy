import { useState, useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";

const useTimer = () => {
  const socket = useSocketContext(); // Get the socket from context
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const handleTimeUpdate = (data: { time: number }) => {
      console.log("timeUpdate", data);
      setTimeLeft(data.time);
    };

    socket.on("timeUpdate", handleTimeUpdate);
    return () => {
      socket.off("timeUpdate", handleTimeUpdate);
    };
  }, [socket]);

  return timeLeft;
};

export default useTimer;