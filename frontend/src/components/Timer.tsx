import useTimer from "../hooks/useTimer";

export const Timer = () => {
  const timeLeft = useTimer();

  return <div>{timeLeft}</div>;
};
