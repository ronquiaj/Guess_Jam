import { FC, useState, useEffect, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { GetTracks, GetTracks_tracks } from "../../components/__generated__/GetTracks";
import { useSong } from "../../contexts/SongContext";
import Button from "../../components/global/Button/Button";
import ReadySetGo from "./components/ReadySetGo/ReadySetGo";
import GET_TRACKS from "./query";
import "./styles.scss";
import Typography from "../../components/global/Typography/Typography";

const GamePage: FC = () => {
  const [score, setScore] = useState<number>(0);
  const [openingCountdownOver, setOpeningCountdownOver] = useState<boolean>(false);
  const [cacheTracks, setCacheTracks] = useState<GetTracks_tracks[]>([]);
  const [currentTracks, setCurrentTracks] = useState<GetTracks_tracks[]>([]);
  const [newRound, setNewRound] = useState<boolean>(false);
  const [chosenSong, setChosenSong] = useState<GetTracks_tracks>();
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [getTracks, { data }] = useLazyQuery<GetTracks>(GET_TRACKS);
  const { setCurrentSong } = useSong();

  const closeOpeningCountdown = () => setOpeningCountdownOver(true);
  const startGame = () => setGameStarted(true);

  // Gets the tracks after the countdown finishes
  useEffect(() => {
    if (openingCountdownOver) {
      getTracks();
      console.log("getting new tracks");
    }
  }, [openingCountdownOver, getTracks]);

  // When there are tracks coming from the data, then set the tracks to that data. If there is cached tracks, add cached tracks to new data
  const adjustTracks = useCallback(() => {
    if (data?.tracks) {
      cacheTracks.length > 0
        ? setCacheTracks((cache) => [...cache, ...(data.tracks as GetTracks_tracks[])])
        : setCacheTracks(data.tracks);
    }
  }, [data?.tracks]);

  useEffect(() => {
    adjustTracks();
  }, [adjustTracks]);

  // Look at our cache of tracks and see if we need to get a fresh set, otherwise take four of the cacheTracks, and set cacheTracks to that
  const getSongAndCache = useCallback(() => {
    if (openingCountdownOver && cacheTracks) {
      if (cacheTracks.length < 4) {
        console.log("getting new tracks");
        getTracks();
      } else {
        const newTracks = cacheTracks.slice(0, 4);
        setCurrentTracks(newTracks);
        const randomSong = newTracks[Math.floor(Math.random() * newTracks.length)];
        setChosenSong(randomSong);
        if (setCurrentSong) setCurrentSong("");
        setTimeout(() => {
          if (setCurrentSong) setCurrentSong(randomSong.preview_url);
        }, 1000);
      }
    }
  }, [cacheTracks, getTracks, openingCountdownOver, setCurrentSong]);

  useEffect(() => {
    getSongAndCache();
  }, [getSongAndCache]);

  /**
   * Function passed to buttons. IF this button's song and the current song match, update points and get new tracks
   * @param buttonSong
   * @param currentSong
   */
  const pickSong = (buttonSong: string, currentSong: string | undefined) => {
    if (buttonSong === currentSong) {
      alert("Correct!");
      setScore((score) => score + 100);
    } else {
      alert("Wrong!");
      setScore((score) => score - 100);
    }
    setCacheTracks((cacheTracks) => cacheTracks.slice(4));
  };

  console.log(cacheTracks);

  return (
    <div className='game-container'>
      {gameStarted ? (
        <ReadySetGo
          neon={true}
          countdownWords={["Ready?", "Set...", "Go!"]}
          className='game-container--ready-set-go'
          time={1000}
          animationOver={closeOpeningCountdown}
        />
      ) : (
        <Button className='game-container--big-button' onClick={startGame}>
          Start
        </Button>
      )}
      <Typography light={false} variant='hot-pink'>
        Score: <span>{score}</span>
      </Typography>
      <div className='game-container--button-container'>
        <Button onClick={() => pickSong(currentTracks[0].name, chosenSong?.name)}>
          {currentTracks.length > 0 ? currentTracks[0].name : "Song 1"}
        </Button>
        <Button onClick={() => pickSong(currentTracks[1].name, chosenSong?.name)}>
          {currentTracks.length > 0 ? currentTracks[1].name : "Song 2"}
        </Button>
        <Button onClick={() => pickSong(currentTracks[2].name, chosenSong?.name)}>
          {currentTracks.length > 0 ? currentTracks[2].name : "Song 3"}
        </Button>
        <Button onClick={() => pickSong(currentTracks[3].name, chosenSong?.name)}>
          {currentTracks.length > 0 ? currentTracks[3].name : "Song 4"}
        </Button>
      </div>
    </div>
  );
};

export default GamePage;
