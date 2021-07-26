import { FC, useEffect, useState } from "react";
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
  className?: string;
};

const ReadySetGo: FC<Props> = ({ time, animationOver, className }: Props) => {
  const [index, setIndex] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    setTimerId(
      (setInterval(() => {
        console.log("here");
        setIndex((val) => val + 1);
      }, time) as unknown) as NodeJS.Timeout
    );
  }, []);

  useEffect(() => {
    if (index === 3) {
      timerId && clearInterval(timerId);
      animationOver();
      return () => {};
    }
  }, [index]);

  const readySetGo = ["Ready?", "Set...", "Go!"];
  return (
    <Typography className={"ready-set-go-text " + className} variant="hot-pink">
      {readySetGo[index]}
    </Typography>
  );
};

export default ReadySetGo;
