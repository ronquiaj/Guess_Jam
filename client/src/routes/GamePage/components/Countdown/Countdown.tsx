import { FC, useEffect, useRef, useState } from "react";
import Typography from "../../../../components/global/Typography/Typography";
import "./styles.scss";

type Props = {
  /**
   * Amount of time for each word in ready set go to show, is in milliseconds
   */
  time?: number;
  /**
   * This will most likely a be a set state function that will be triggered when the the ready set go animation is over
   */
  animationOver: () => void;
  /**
   * Prop that specifies whether this ready set go will be permanently in the on color
   */
  neon?: boolean;
  countdownWords: string[];

  className?: string;
};

const Countdown: FC<Props> = ({
  time,
  animationOver,
  className,
  countdownWords,
  neon = false,
}: Props) => {
  const [index, setIndex] = useState<number>(0);
  const timerId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerId.current = (setInterval(
      () => setIndex((val) => val + 1),
      time
    ) as unknown) as NodeJS.Timeout;
  }, [time]);

  useEffect(() => {
    if (index === countdownWords.length) {
      timerId.current && clearInterval(timerId.current);
      animationOver();
      return () => {};
    }
  }, [index, animationOver, countdownWords.length, timerId]);

  return (
    <Typography
      light={false}
      className={"ready-set-go-text " + className}
      variant="hot-pink"
    >
      {countdownWords[index]}
    </Typography>
  );
};

export default Countdown;
