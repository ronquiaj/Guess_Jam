import {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  useCallback,
} from "react";

/**
 * Hook which takes in the number to start the timer from, and when the timer hits 0 executes a function also passed in
 * @param timeDesired The time to start from
 * @returns An array containing the timeRemaining in the hook, the function to start the timer, and a setter function whose set function will execute at the end of the timer
 */
const useTimer = (
  timeDesired: number
): [
  timeRemaining: number,
  startTimer: () => void,
  setEndFunc: MutableRefObject<() => void>,
  resetTimer: () => void
] => {
  const timerId = useRef<NodeJS.Timeout>();
  const [timeRemaining, setTimeRemaining] = useState<number>(timeDesired);
  const [reset, setReset] = useState<boolean>(false);
  const endFunc = useRef<() => void>(() => {});
  const [start, setStart] = useState<boolean>(false);

  const startTimer = () => setStart(true);
  const resetTimer = useCallback(() => {
    setReset(true);
  }, []);

  useEffect(() => {
    if (start) {
      timerId.current = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      setStart(false);
    } else if (reset) {
      clearInterval((timerId.current as unknown) as NodeJS.Timeout);
      setTimeRemaining(timeDesired);
      startTimer();
      setReset(false);
    }
  }, [start, resetTimer, reset, timeDesired]);

  useEffect(() => {
    if (timeRemaining === 0) {
      clearInterval((timerId.current as unknown) as NodeJS.Timeout);
      endFunc.current();
    }
  }, [timeRemaining, endFunc]);

  return [timeRemaining, startTimer, endFunc, resetTimer];
};

export default useTimer;
