import { FC, useState, useEffect, useCallback, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GetTracks,
  GetTracks_tracks,
} from "../../components/__generated__/GetTracks";
import { useSong } from "../../contexts/SongContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import GameDesktop from "./screens/Desktop/GameDesktop";
import GET_TRACKS from "./query";
import "./styles.scss";

const GamePage: FC = () => {
  const score = useRef<number>(0);
  const chosenSong = useRef<GetTracks_tracks>();
  const cacheTracks = useRef<GetTracks_tracks[]>([]);
  const tracksMet = useRef<boolean>(false);
  const showSongInformation = useRef<boolean>(false);
  const timerId = useRef<NodeJS.Timeout>();
  const [openingCountdownOver, setOpeningCountdownOver] = useState<boolean>(
    false
  );
  const [rounds, setRounds] = useState(10);
  const [currentTracks, setCurrentTracks] = useState<GetTracks_tracks[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [getTracks, { data }] = useLazyQuery<GetTracks>(GET_TRACKS);
  const { setCurrentSong, stopCurrentSong } = useSong();
  const { width } = useWindowDimensions();
  const closeOpeningCountdown = () => setOpeningCountdownOver(true);
  const startGame = () => setGameStarted(true);

  // Gets the tracks after the countdown finishes
  useEffect(() => {
    const setupSong = () => {
      showSongInformation.current = false;
      const randomSong = cacheTracks.current[Math.floor(Math.random() * 4)];
      chosenSong.current = randomSong;
      setCurrentSong(randomSong.preview_url);
    };

    if (openingCountdownOver) {
      if (currentTracks.length < 25 && !tracksMet.current) getTracks();
      else {
        if (tracksMet.current) setTimeout(() => setupSong(), 3000);
        else setupSong();
        tracksMet.current = true;
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
    if (songName === chosenSong.current?.name) {
      score.current += 100;
    } else {
      score.current -= 100;
    }
    const newTracks = cacheTracks.current.slice(4);
    cacheTracks.current = newTracks;
    setCurrentTracks((tracks) => tracks.splice(4));
    showSongInformation.current = true;
  }, []);

  return (
    <>
      <GameDesktop
        chosenSong={chosenSong}
        closeOpeningCountdown={closeOpeningCountdown}
        gameStarted={gameStarted}
        startGame={startGame}
        score={score}
        showSongInformation={showSongInformation}
        songs={[
          currentTracks[0],
          currentTracks[1],
          currentTracks[2],
          currentTracks[3],
        ]}
        verifySong={verifySong}
        currentTracks={currentTracks}
        openingCountdownOver={openingCountdownOver}
      />
    </>
  );
};

export default GamePage;
