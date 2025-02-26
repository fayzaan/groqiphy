export type Stage = {
  id: string;
  title: string;
  description: string;
  timer: number;
  options: Option[];
}

export type Option = {
  id: string;
  text: string;
  nextStage: string;
  feedback: string;
}

export type GameStage = {
  currentStage: Stage
  timeLeft: number
  completed: boolean
}

