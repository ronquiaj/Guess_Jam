import {
  createContext,
  useState,
  FC,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type Props = {
  children: ReactNode;
};

type Song = {
  currentSong: string;
  setCurrentSong: Dispatch<SetStateAction<string>> | undefined;
};
const SongContext = createContext<Song>({
  currentSong: "",
  setCurrentSong: undefined,
});

const useSong = () => {
  const context = useContext(SongContext);

  if (context === undefined)
    throw new Error("useSong must be used with SongProvider.");

  return context;
};

const SongProvider: FC<Props> = ({ children }: Props) => {
  const [currentSong, setCurrentSong] = useState<string>("shadow of death");
  const [activeSong, setActiveSong] = useState<HTMLAudioElement | undefined>();

  // if we play  asong from the game page, then set active song to the audio along with the src, if the current song is changed to blank

  useEffect(() => {
    if (currentSong) {
      const audio = new Audio();
      audio.src = currentSong;
      setActiveSong(audio);
      audio.play();
    } else {
      activeSong?.pause();
      setActiveSong(undefined);
    }
  }, [currentSong]);

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
};

export { SongProvider, useSong };
