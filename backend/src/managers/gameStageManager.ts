import { GameStage, Stage } from "../types";

const gameStages = new Map<string, GameStage>();

export const createGameStage = (userId: string, initialStage: Stage): GameStage => {
  const stage: GameStage = {
    currentStage: initialStage,
    timeLeft: initialStage.timer,
    completed: false
  }

  gameStages.set(userId, stage);

  return stage;
}

export const updateGameStageTimer = (userId: string, newTimer: number): GameStage => {
  console.log("updateGameStageTimer", userId, newTimer);
  const gameStage = gameStages.get(userId);

  if (!gameStage) {
    throw new Error("Game stage not found");
  }

  const updatedStage: GameStage = {
    ...gameStage,
    timeLeft: newTimer
  }

  gameStages.set(userId, updatedStage);

  return updatedStage;
}

export const updateGameStage = (userId: string, gameStage: GameStage, newStage: Stage): GameStage => {
  const updatedStage: GameStage = {
    ...gameStage,
    currentStage: newStage,
    timeLeft: newStage.timer,
    completed: newStage.id === "complete" || newStage.id === "failure"
  }

  gameStages.set(userId, updatedStage);

  return updatedStage;
}

export const getOrCreateGameStage = (userId: string, initialStage: Stage): GameStage => {
  let state = gameStages.get(userId);

  if (!state) {
    state = createGameStage(userId, initialStage);
  }
  
  return state;
};

export const removeGameStage = (userId: string): boolean => {
  return gameStages.delete(userId);
};

export const getGameStageByUserId = (userId: string): GameStage | undefined => {
  return gameStages.get(userId);
};