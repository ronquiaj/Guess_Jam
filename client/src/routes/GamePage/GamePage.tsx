import { FC, useState, useEffect, useCallback, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GetTracks,
  GetTracks_tracks,
} from "../../components/__generated__/GetTracks";
import { useSong } from "../../contexts/SongContext";
import Button from "../../components/global/Button/Button";
import ReadySetGo from "./components/ReadySetGo/ReadySetGo";
import GET_TRACKS from "./query";
import "./styles.scss";
import Typography from "../../components/global/Typography/Typography";

const GamePage: FC = () => {
  const [score, setScore] = useState<number>(0);
  const [openingCountdownOver, setOpeningCountdownOver] = useState<boolean>(
    false
  );
  const chosenSong = useRef<GetTracks_tracks>();
  const cacheTracks = useRef<GetTracks_tracks[]>([]);
  const [currentTracks, setCurrentTracks] = useState<GetTracks_tracks[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [getTracks, { data }] = useLazyQuery<GetTracks>(GET_TRACKS);
  const { setCurrentSong } = useSong();

  const closeOpeningCountdown = () => setOpeningCountdownOver(true);
  const startGame = () => setGameStarted(true);

  // Gets the tracks after the countdown finishes
  useEffect(() => {
    if (openingCountdownOver) getTracks();
  }, [openingCountdownOver, getTracks]);

  /** Check to see if cacheTracks exists, and if it does then add the newly fetched tracks to this cacheTracks array, otherwise just set cacheTracks to the fetched data. After fetching data,
  get four of those tracks and then disperse them to the buttons. Subtract four from our cacheTrack array and if there are less than 4 songs then fetch data, and start from step 1 again. **/
  const adjustTracks = useCallback(() => {
    if (data?.tracks) {
      cacheTracks.current.length > 0
        ? (cacheTracks.current = [...cacheTracks.current, ...data.tracks])
        : (cacheTracks.current = data.tracks);

      if (cacheTracks.current.length < 4) getTracks();
      else {
        const newTracks = cacheTracks.current.splice(0, 4);
        setCurrentTracks(newTracks);
        const randomSong =
          newTracks[Math.floor(Math.random() * newTracks.length)];
        chosenSong.current = randomSong;
        if (setCurrentSong) setCurrentSong(randomSong.preview_url);
      }
    }
  }, [data?.tracks, getTracks, setCurrentSong]);

  useEffect(() => {
    adjustTracks();
  }, [adjustTracks]);

  const song1 = currentTracks[0];
  const song2 = currentTracks[1];
  const song3 = currentTracks[2];
  const song4 = currentTracks[3];

  return (
    <div className="game-container">
      {gameStarted ? (
        <ReadySetGo
          neon={true}
          countdownWords={["Ready?", "Set...", "Go!"]}
          className="game-container--ready-set-go"
          time={1000}
          animationOver={closeOpeningCountdown}
        />
      ) : (
        <Button className="game-container--big-button" onClick={startGame}>
          Start
        </Button>
      )}
      <Typography light={false} variant="hot-pink">
        Score: <span>{score}</span>
      </Typography>
      <div className="game-container--button-container">
        <Button onClick={() => alert("Hi")}>
          {currentTracks.length > 0 ? song1.name : "Song 1"}
        </Button>
        <Button onClick={() => alert("Hi")}>
          {currentTracks.length > 0 ? song2.name : "Song 2"}
        </Button>
        <Button onClick={() => alert("Hi")}>
          {currentTracks.length > 0 ? song3.name : "Song 3"}
        </Button>
        <Button onClick={() => alert("Hi")}>
          {currentTracks.length > 0 ? song4.name : "Song 4"}
        </Button>
      </div>
    </div>
  );
};

export default GamePage;
