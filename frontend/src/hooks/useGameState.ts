import { useState, useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";

// Define the structure of a Stage.
export interface Stage {
  id: string;
  title: string;
  description: string;
  timer: number;
  options?: { id: string; text: string }[];
}

// Define the overall game state shape.
interface GameState {
  timeLeft: number | null;
  completed: boolean;
  currentStage: Stage | null;
}

const useGameState = (): GameState => {
  const socket = useSocketContext();
  const [gameState, setGameState] = useState<GameState>({
    timeLeft: null,
    completed: false,
    currentStage: null,
  });

  useEffect(() => {
    // Handler for time updates.
    const handleTimeUpdate = (data: { time: number; stageTimeout?: boolean }) => {
      setGameState(prev => ({
        ...prev,
        timeLeft: data.time,
      }));
    };

    // Handler for stage updates.
    const handleStageUpdate = (data: GameState) => {
      console.log("handleStageUpdate", data);
      setGameState(prev => ({
        ...prev,
        currentStage: data.currentStage,
        timeLeft: data.timeLeft,
        completed: data.completed,
      }));
    };

    // Listen for events from the server.
    socket.on("timeUpdate", handleTimeUpdate);
    socket.on("stageUpdate", handleStageUpdate);

    // Cleanup event listeners on unmount.
    return () => {
      socket.off("timeUpdate", handleTimeUpdate);
      socket.off("stageUpdate", handleStageUpdate);
    };
  }, [socket]);

  return gameState;
};

export default useGameState;