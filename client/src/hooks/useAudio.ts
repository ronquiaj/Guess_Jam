import { useState, useEffect } from "react";

/**
 * Hook where you set the current song url, and then play that audio from that url. If we leave the page, the song stops playing
 * @returns
 */
export default function useAudio() {
  const [currentSong, setCurrentSong] = useState<string>();
  const [audioPlaying, setAudioPlaying] = useState<HTMLAudioElement | null>();
  console.log(window.location.pathname);

  // If the user leaves the page, remove the song playing
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      audioPlaying?.remove();
      setAudioPlaying(null);
    });
  }, []);

  useEffect(() => {
    if (currentSong) {
      console.log("here");
      const audio = new Audio();
      audio.src = currentSong;
      setAudioPlaying(audio);
      audio.play();
    }
  }, [currentSong]);

  return setCurrentSong;
}
