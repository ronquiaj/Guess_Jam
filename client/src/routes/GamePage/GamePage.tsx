import { FC, useState, useEffect, useCallback, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GetTracks,
  GetTracks_tracks,
} from "../../components/__generated__/GetTracks";
import { useSong } from "../../contexts/SongContext";
import Button from "../../components/global/Button/Button";
import Countdown from "./components/Countdown/Countdown";
import GET_TRACKS from "./query";
import "./styles.scss";
import Typography from "../../components/global/Typography/Typography";
import SongInfo from "./components/SongInfo/SongInfo";

const GamePage: FC = () => {
  const score = useRef<number>(0);
  const chosenSong = useRef<GetTracks_tracks>();
  const cacheTracks = useRef<GetTracks_tracks[]>([]);
  const tracksMet = useRef<boolean>(false);
  const [openingCountdownOver, setOpeningCountdownOver] = useState<boolean>(
    false
  );
  const [currentTracks, setCurrentTracks] = useState<GetTracks_tracks[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [getTracks, { data }] = useLazyQuery<GetTracks>(GET_TRACKS);
  const { setCurrentSong } = useSong();
  const closeOpeningCountdown = () => setOpeningCountdownOver(true);
  const startGame = () => setGameStarted(true);

  // Gets the tracks after the countdown finishes
  useEffect(() => {
    if (openingCountdownOver) {
      if (currentTracks.length < 25 && !tracksMet.current) getTracks();
      else {
        console.log(currentTracks);
        tracksMet.current = true;
        const randomSong = cacheTracks.current[Math.floor(Math.random() * 4)];
        chosenSong.current = randomSong;
        setCurrentSong(randomSong.preview_url);
      }
    }
  }, [openingCountdownOver, getTracks, currentTracks, setCurrentSong]);

  /** Check to see if cacheTracks exists, and if it does then add the newly fetched tracks to this cacheTracks array, otherwise just set cacheTracks to the fetched data. After fetching data,
  get four of those tracks and then disperse them to the buttons. Subtract four from our cacheTrack array and if there are less than 4 songs then fetch data, and start from step 1 again. **/
  useEffect(() => {
    if (data?.tracks) {
      cacheTracks.current = [...cacheTracks.current, ...data.tracks];
      setCurrentTracks(cacheTracks.current);
    }
  }, [data?.tracks]);

  const verifySong = useCallback((songName: string) => {
    console.log(
      `Your chosen song: ${songName}, the actual song: ${chosenSong.current?.name}`
    );
    if (songName === chosenSong.current?.name) {
      score.current += 100;
    } else {
      score.current -= 100;
    }
    const newTracks = cacheTracks.current.slice(4);
    cacheTracks.current = newTracks;
    setCurrentTracks((tracks) => tracks.splice(4));
  }, []);

  const song1 = currentTracks[0];
  const song2 = currentTracks[1];
  const song3 = currentTracks[2];
  const song4 = currentTracks[3];

  return (
    <div className="game-container">
      {gameStarted ? (
        <Countdown
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
      <SongInfo
        albumName="Test Cover"
        imageUrl="https://variety.com/wp-content/uploads/2021/02/Screen-Shot-2021-02-25-at-8.43.25-PM-e1614314732431.png?w=681&h=383&crop=1"
      />
      <Typography light={false} variant="hot-pink">
        Score: <span>{score.current}</span>
      </Typography>
      <div className="game-container--button-container">
        <Button onClick={() => verifySong(song1.name)}>
          {currentTracks.length > 0 ? song1.name : "Song 1"}
        </Button>
        <Button onClick={() => verifySong(song2.name)}>
          {currentTracks.length > 0 ? song2.name : "Song 2"}
        </Button>
        <Button onClick={() => verifySong(song3.name)}>
          {currentTracks.length > 0 ? song3.name : "Song 3"}
        </Button>
        <Button onClick={() => verifySong(song4.name)}>
          {currentTracks.length > 0 ? song4.name : "Song 4"}
        </Button>
      </div>
    </div>
  );
};

export default GamePage;
