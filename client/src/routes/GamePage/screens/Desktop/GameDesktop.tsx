import { FC, MutableRefObject } from "react";
import Button from "../../../../components/global/Button/Button";
import Typography from "../../../../components/global/Typography/Typography";
import { GetTracks_tracks } from "../../../../components/__generated__/GetTracks";
import Countdown from "../../components/Countdown/Countdown";
import SongInfo from "../../components/SongInfo/SongInfo";

import "./styles.scss";

type Props = {
  gameStarted: boolean;
  closeOpeningCountdown: () => void;
  startGame: () => void;
  chosenSong: MutableRefObject<GetTracks_tracks | undefined>;
  showSongInformation: MutableRefObject<boolean>;
  score: MutableRefObject<number>;
};

const GameDesktop: FC<Props> = ({
  gameStarted,
  closeOpeningCountdown,
  startGame,
  chosenSong,
  showSongInformation,
  score,
}: Props) => {
  return (
    <div className="gamepage-container">
      <div className="gamepage-container--center-col">
        {gameStarted ? (
          <Countdown
            neon={true}
            countdownWords={["Ready?", "Set...", "Go!"]}
            className="gamepage-container--center-col--ready-set-go"
            time={1000}
            animationOver={closeOpeningCountdown}
          />
        ) : (
          <Button
            className="gamepage-container--center-col--big-button"
            onClick={startGame}
          >
            Start
          </Button>
        )}
        {chosenSong.current && showSongInformation.current && (
          <SongInfo
            songName={chosenSong.current.name}
            imageUrl={chosenSong.current.album.album_cover}
          />
        )}
        <Typography light={false} variant="hot-pink">
          Score: <span>{score.current}</span>
        </Typography>
      </div>
    </div>
  );
};

export default GameDesktop;
