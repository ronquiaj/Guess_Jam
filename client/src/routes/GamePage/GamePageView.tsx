import { Dispatch, FC, MutableRefObject, SetStateAction } from "react";
import Button from "../../components/global/Button/Button";
import Typography from "../../components/global/Typography/Typography";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { GetTracks_tracks } from "../../components/__generated__/GetTracks";
import ButtonContainer from "./components/ButtonContainer/ButtonContainer";
import Countdown from "./components/Countdown/Countdown";
import SongInfo from "./components/SongInfo/SongInfo";
import "./styles/desktop-styles.scss";
import "./styles/mobile-styles.scss";
import TimeInfo from "./components/TimeInfo/TimeInfo";

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
  rounds: number;
  timeRemaining: number;
  setRounds: Dispatch<SetStateAction<number>>;
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
  rounds,
  timeRemaining,
  setRounds,
}: Props) => {
  const { width } = useWindowDimensions();
  const smallScreen = width <= 800;
  const buttons = {
    buttons: songs.map((song, index) => ({
      buttonName: song && song.name,
      onClick: () => {
        verifySong(song.name);
        setRounds((rounds) => rounds - 1);
      },
      condition: {
        alternateName: `Song ${index + 1}`,
        criteria: currentTracks.length > 0,
      },
    })),
  };

  return (
    <div className={`${smallScreen ? "mobile--" : "desktop--"}game-container`}>
      <div
        className={`${
          smallScreen ? "mobile--" : "desktop--"
        }game-container--tools`}
      ></div>
      <div
        className={`${
          smallScreen ? "mobile--" : "desktop--"
        }game-container--main`}
      >
        {smallScreen && (
          <TimeInfo
            rounds={rounds}
            smallScreen={smallScreen}
            timeRemaining={timeRemaining}
          />
        )}
        {gameStarted ? (
          <Countdown
            neon={true}
            countdownWords={["Ready?", "Set...", "Go!"]}
            className={`${
              smallScreen ? "mobile--" : "desktop--"
            }game-container--main--ready-set-go`}
            time={1000}
            animationOver={closeOpeningCountdown}
          />
        ) : (
          <Button
            className={`${
              smallScreen ? "mobile--" : "desktop--"
            }game-container--main--big-button`}
            onClick={startGame}
          >
            Start
          </Button>
        )}
        {chosenSong.current && showSongInformation.current && smallScreen && (
          <SongInfo
            songName={chosenSong.current.name}
            imageUrl={chosenSong.current.album.album_cover}
          />
        )}
        <Typography light={false} variant="hot-pink">
          Score: <span>{score.current}</span>
        </Typography>
        <ButtonContainer
          className={`game--button-container ${
            !openingCountdownOver &&
            `${
              smallScreen ? "mobile--" : "desktop--"
            }game-container--main--button-container--disabled`
          }`}
          buttons={buttons.buttons}
        />
      </div>
      <div
        className={`${
          smallScreen ? "mobile--" : "desktop--"
        }game-container--info`}
      >
        {!smallScreen && (
          <TimeInfo
            rounds={rounds}
            smallScreen={smallScreen}
            timeRemaining={timeRemaining}
          />
        )}

        {chosenSong.current && showSongInformation.current && !smallScreen && (
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
