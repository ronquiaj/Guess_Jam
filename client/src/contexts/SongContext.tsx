import {
  createContext,
  useState,
  FC,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef
} from "react";

type Props = {
  children: ReactNode;
};

type Song = {
  currentSong: string;
  setCurrentSong: Dispatch<SetStateAction<string>>;
  stopCurrentSong: () => void;
};
const SongContext = createContext<Song>({
  currentSong: "",
  setCurrentSong: () => {},
  stopCurrentSong: () => {}
});

const useSong = () => {
  const context = useContext(SongContext);

  if (context === undefined) throw new Error("useSong must be used with SongProvider.");

  return context;
};

const SongProvider: FC<Props> = ({ children }: Props) => {
  const [currentSong, setCurrentSong] = useState<string>("");
  const activeSong = useRef<HTMLAudioElement | undefined>();

  const stopCurrentSong = () => {
    setCurrentSong("");
  };

  useEffect(() => {
    if (currentSong) {
      if (activeSong.current) activeSong.current.pause();
      const audio = new Audio();
      audio.src = currentSong;
      setTimeout(() => (activeSong.current = audio), 100);
      audio.play();
    } else {
      activeSong.current?.pause();
      activeSong.current = undefined;
    }
  }, [currentSong]);

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong, stopCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
};

export { SongProvider, useSong };
