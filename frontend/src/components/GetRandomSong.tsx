import { useState } from "react";
import axios from "axios";

const GetRandomSong = () => {
  const [currentSong, setCurrentSong] =
    useState<HTMLAudioElement | undefined>(undefined);

  const handleClick = async () => {
    const result = await axios.get(
      "http://localhost:5000/spotify/getRandomSong"
    );
    const previewUrl = await result.data;
    currentSong && currentSong.pause();
    const audio = new Audio();
    audio.src = previewUrl;
    setCurrentSong(audio);
    audio.play();
  };

  return (
    <div>
      <button onClick={handleClick}>play random song</button>
    </div>
  );
};

export default GetRandomSong;
