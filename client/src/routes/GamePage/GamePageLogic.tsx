import { FC, useState, useEffect, useCallback, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GetTracks,
  GetTracks_tracks,
} from "../../components/__generated__/GetTracks";
import useTimer from "../../hooks/useTimer";
import { useSong } from "../../contexts/SongContext";
import GamePageView from "./GamePageView";
import GET_TRACKS from "./query";

const GamePageLogic: FC = () => {
  const score = useRef<number>(0);
  const chosenSong = useRef<GetTracks_tracks>();
  const cacheTracks = useRef<GetTracks_tracks[]>([]);
  const tracksMet = useRef<boolean>(false);
  const showSongInformation = useRef<boolean>(false);
  const [openingCountdownOver, setOpeningCountdownOver] = useState<boolean>(
    false
  );
  const totalRounds = useRef<number>(10);
  const [rounds, setRounds] = useState(totalRounds.current);
  const [currentTracks, setCurrentTracks] = useState<GetTracks_tracks[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [getTracks, { data }] = useLazyQuery<GetTracks>(GET_TRACKS);
  const { setCurrentSong } = useSong();
  const [timeRemaining, startTimer, endFunc, resetTimer] = useTimer(10);
  const closeOpeningCountdown = () => setOpeningCountdownOver(true);
  const startGame = () => setGameStarted(true);

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

  const setupSong = useCallback(() => {
    showSongInformation.current = false;
    const randomSong = cacheTracks.current[Math.floor(Math.random() * 4)];
    chosenSong.current = randomSong;
    setCurrentSong(randomSong.preview_url);
    resetTimer();
  }, [resetTimer, setCurrentSong]);

  useEffect(() => {
    if (timeRemaining === 0) {
      score.current -= 100;
      const newTracks = cacheTracks.current.slice(4);
      cacheTracks.current = newTracks;
      setCurrentTracks((tracks) => tracks.splice(4));
      showSongInformation.current = true;
      setRounds((rounds) => rounds - 1);
    }
  }, [timeRemaining, resetTimer]);

  // Gets the tracks after the countdown finishes
  useEffect(() => {
    if (endFunc.current.toString() === "() => {}") endFunc.current = setupSong;
    if (openingCountdownOver) {
      // Check to see if our cacheTracks is at least the size we specified
      if (currentTracks.length < totalRounds.current * 4 && !tracksMet.current)
        getTracks();
      else {
        if (rounds === 0) alert("done"); //TODO: Implement this
        if (tracksMet.current) setTimeout(() => setupSong(), 3000);
        else setupSong();
        tracksMet.current = true;
      }
    }
  }, [
    setupSong,
    currentTracks.length,
    endFunc,
    getTracks,
    openingCountdownOver,
    rounds,
  ]);

  /** Check to see if cacheTracks exists, and if it does then add the newly fetched tracks to this cacheTracks array, otherwise just set cacheTracks to the fetched data. After fetching data,
  get four of those tracks and then disperse them to the buttons. Subtract four from our cacheTrack array and if there are less than 4 songs then fetch data, and start from step 1 again. **/
  useEffect(() => {
    if (data?.tracks) {
      cacheTracks.current = [...cacheTracks.current, ...data.tracks];
      setCurrentTracks(cacheTracks.current);
    }
  }, [data?.tracks]);

  return (
    <GamePageView
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
      rounds={rounds}
      timeRemaining={timeRemaining}
      setRounds={setRounds}
    />
  );
};

export default GamePageLogic;
