import { FC } from "react";
import Typography from "../../../../components/global/Typography/Typography";
import "./styles.scss";

type Props = {
  smallScreen: boolean;
  timeRemaining: number;
  rounds: number;
};

const TimeInfo: FC<Props> = ({ smallScreen, timeRemaining, rounds }: Props) => {
  return (
    <div
      className={`${
        smallScreen ? "mobile--" : "desktop--"
      }game-container--info--timeinfo-container`}
    >
      <Typography
        className={`${
          smallScreen ? "mobile--" : "desktop--"
        }game-container--info--timeinfo-container--time-remaining`}
        variant="white"
      >
        Time remaining: {timeRemaining}
      </Typography>
      <Typography
        className={`${
          smallScreen ? "mobile--" : "desktop--"
        }game-container--info--timeinfo-container--rounds-left`}
        variant="white"
      >
        Rounds left: {rounds}
      </Typography>
    </div>
  );
};

export default TimeInfo;
