import { useState, useEffect, useRef } from "react";

const useTimer = (
  timeDesired: number,
  endFunc: () => void
): [timeRemaining: number, startTimer: () => void] => {
  const timerId = useRef<NodeJS.Timeout>();
  const [timeRemaining, setTimeRemaining] = useState(timeDesired);
  const [start, setStart] = useState<boolean>(false);

  const startTimer = () => {
    setStart(true);
  };

  useEffect(() => {
    if (start)
      timerId.current = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
  }, [start]);

  useEffect(() => {
    if (timeRemaining === 0) {
      clearInterval((timerId.current as unknown) as NodeJS.Timeout);
      endFunc();
    }
  }, [timeRemaining, endFunc]);

  return [timeRemaining, startTimer];
};

export default useTimer;
