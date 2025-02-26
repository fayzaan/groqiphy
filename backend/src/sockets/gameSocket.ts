import { Socket } from "socket.io";
import { getOrCreateUserState, UserState, removeUserState, updateUserHistory } from "../managers/userStateManager";
import { getOrCreateGameStage, removeGameStage, updateGameStageTimer, updateGameStage, getGameStageByUserId } from "../managers/gameStageManager";
import { Stage } from "../types";
import gameStages from "../data/gameStages.json";

export const initializeGameSocket = (socket: Socket) => {
  let timer: NodeJS.Timeout | null = null;

  // Retrieve the userId from the socket handshake query
  const userId = socket.handshake.query.userId;
  
  // Validate the userId
  if (!userId || typeof userId !== "string") {
    socket.disconnect();
    return;
  }

  const stages: Record<string, Stage> = gameStages;
  
  // Get or create the user state
  const userState: UserState = getOrCreateUserState(userId);
  console.log(`User ${userId} connected with state:`, userState);

  // Send the user state to the client
  socket.emit("userState", userState);

  socket.on("startGame", () => {
    const gameStage = getOrCreateGameStage(userId, stages.stage1);
    
    socket.emit("stageUpdate", gameStage);

    // updates the game stage every second
    // can be used to update timer, change stages when timeLeft <= 0, etc.
    timer = setInterval(() => {
      const currentGameStage = getGameStageByUserId(userId)

      if (!currentGameStage) {
        exitGame();
        return;
      }

      let timeLeft = currentGameStage.timeLeft - 1 || 0;
      updateGameStageTimer(userId, timeLeft);

      console.log("startGame.timeLeft", timeLeft);

      // If the game is completed, stop the timer.
      if (currentGameStage.completed) {
        if (timer) {
          clearInterval(timer);
        }

        return;
      }
      
      if (timeLeft <= 0) {
        if (timer) {
          clearInterval(timer);
        }

        let updatedGameStage = updateGameStage(userId, gameStage, stages.failure);

        socket.emit("stageUpdate", updatedGameStage);
      } else {
        socket.emit("timeUpdate", { time: timeLeft });
      }
    }, 1000);
  })

  socket.on("userAction", (data: { optionId: string }) => {
    const gameStage = getOrCreateGameStage(userId, stages.stage1);
    const option = gameStage.currentStage.options.find(option => option.id === data.optionId);
    
    if (option) {
      const nextStage = option.nextStage;

      updateUserHistory(userId, option.text);

      if (nextStage) {
        let updatedGameStage = updateGameStage(userId, gameStage, stages[nextStage]);
        socket.emit("stageUpdate", updatedGameStage);
      } else {
        socket.emit("stageUpdate", stages.failure);
      }
    }
  });

  const exitGame = () => {
    removeUserState(userId);
    removeGameStage(userId);
    if (timer) {
      clearInterval(timer);
    }
  }

  socket.on("disconnect", () => {
    console.log(`User ${userId} disconnected.`);
    exitGame();
  });
};