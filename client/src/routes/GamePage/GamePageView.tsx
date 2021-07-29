import { FC, MutableRefObject } from "react";
import Button from "../../components/global/Button/Button";
import Typography from "../../components/global/Typography/Typography";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { GetTracks_tracks } from "../../components/__generated__/GetTracks";
import ButtonContainer from "./components/ButtonContainer/ButtonContainer";
import Countdown from "./components/Countdown/Countdown";
import SongInfo from "./components/SongInfo/SongInfo";
import "./styles.scss";

type Props = {
  gameStarted: boolean;
  closeOpeningCountdown: () => void;
  startGame: () => void;
  chosenSong: MutableRefObject<GetTracks_tracks | undefined>;
  showSongInformation: MutableRefObject<boolean>;
  score: MutableRefObject<number>;
  songs: GetTracks_tracks[];
  verifySong: (songName: string) => void;
  currentTracks: GetTracks_tracks[];
  openingCountdownOver: boolean;
};

const GamePageView: FC<Props> = ({
  gameStarted,
  closeOpeningCountdown,
  startGame,
  chosenSong,
  showSongInformation,
  score,
  songs,
  verifySong,
  currentTracks,
  openingCountdownOver,
}: Props) => {
  const { width } = useWindowDimensions();
  const buttons = {
    buttons: songs.map((song, index) => ({
      buttonName: song && song.name,
      onClick: () => verifySong(song.name),
      condition: {
        alternateName: `Song ${index + 1}`,
        criteria: currentTracks.length > 0,
      },
    })),
  };

  return (
    <div className="game-container">
      <div className="game-container--tools">Left</div>
      <div className="game-container--main">
        {gameStarted ? (
          <Countdown
            neon={true}
            countdownWords={["Ready?", "Set...", "Go!"]}
            className="game-container--main--ready-set-go"
            time={1000}
            animationOver={closeOpeningCountdown}
          />
        ) : (
          <Button
            className="game-container--main--big-button"
            onClick={startGame}
          >
            Start
          </Button>
        )}
        <Typography light={false} variant="hot-pink">
          Score: <span>{score.current}</span>
        </Typography>
        <ButtonContainer
          className={`game--button-container ${
            !openingCountdownOver &&
            "game-container--main--button-container--disabled"
          }`}
          buttons={buttons.buttons}
        />
      </div>
      <div className="game-container--info">
        <Typography
          className="game-container--info--time-remaining"
          variant="white"
        >
          Time remaining: {}
        </Typography>
        <Typography
          className="game-container--info--rounds-left"
          variant="white"
        >
          Rounds left: {}
        </Typography>

        {chosenSong.current && showSongInformation.current && (
          <SongInfo
            songName={chosenSong.current.name}
            imageUrl={chosenSong.current.album.album_cover}
          />
        )}
      </div>
    </div>
  );
};

export default GamePageView;
