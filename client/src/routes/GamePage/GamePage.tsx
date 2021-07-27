import { FC, useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GetTracks, GetTracks_tracks } from "../../components/__generated__/GetTracks";
import Button from "../../components/global/Button/Button";
import ReadySetGo from "./components/ReadySetGo/ReadySetGo";
import GET_TRACKS from "./query";
import "./styles.scss";
import playAudio from "../../functions/playAudio";

const GamePage: FC = () => {
  const [score, setScore] = useState<number>(0);
  const [openingCountdownOver, setOpeningCountdownOver] = useState<boolean>(false);
  const [cacheTracks, setCacheTracks] = useState<GetTracks_tracks[]>([]);
  const [currentTracks, setCurrentTracks] = useState<GetTracks_tracks[]>([]);
  const [currentSong, setCurrentSong] = useState<GetTracks_tracks>();
  const [getTracks, { data }] = useLazyQuery<GetTracks>(GET_TRACKS);

  const closeOpeningCountdown = () => setOpeningCountdownOver(true);

  // Gets the tracks after the countdown finishes
  useEffect(() => {
    if (openingCountdownOver) getTracks();
  }, [openingCountdownOver, getTracks]);

  // When there are tracks coming from the data, then set the tracks to that data. If there is cached tracks, add cached tracks to new data
  useEffect(() => {
    if (data?.tracks) {
      cacheTracks.length > 0
        ? setCacheTracks((cache) => [...cache, ...(data.tracks as GetTracks_tracks[])])
        : setCacheTracks(data.tracks);
    }
  }, [data?.tracks]);

  // Look at our cache of tracks and see if we need to get a fresh set, otherwise take four of the cacheTracks, and set cacheTracks to that
  useEffect(() => {
    if (openingCountdownOver && cacheTracks) {
      if (cacheTracks.length < 4) getTracks();
      else {
        const newTracks = cacheTracks.splice(0, 4);
        setCurrentTracks(newTracks);
        const randomSong = newTracks[Math.floor(Math.random() * newTracks.length)];
        setCurrentSong(randomSong);
        playAudio(randomSong.preview_url);
        console.log(randomSong);
      }
    }
  }, [cacheTracks, getTracks, openingCountdownOver]);

  return (
    <div className='game-container'>
      <ReadySetGo
        neon={true}
        countdownWords={["Ready?", "Set...", "Go!"]}
        className='game-container--ready-set-go'
        time={1000}
        animationOver={closeOpeningCountdown}
      />
      <div className='game-container--button-container'>
        <Button onClick={() => alert("Hi")}>
          {currentTracks.length > 0 ? currentTracks[0].name : "Song 1"}
        </Button>
        <Button onClick={() => alert("Hi")}>
          {currentTracks.length > 0 ? currentTracks[1].name : "Song 2"}
        </Button>
        <Button onClick={() => alert("Hi")}>
          {currentTracks.length > 0 ? currentTracks[2].name : "Song 3"}
        </Button>
        <Button onClick={() => alert("Hi")}>
          {currentTracks.length > 0 ? currentTracks[3].name : "Song 4"}
        </Button>
      </div>
    </div>
  );
};

export default GamePage;
