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
  songPlaying: string;
  setSongPlaying: Dispatch<SetStateAction<string>> | undefined;
};
const SongContext = createContext<Song>({
  songPlaying: "",
  setSongPlaying: undefined,
});

const useSong = () => {
  const context = useContext(SongContext);

  if (context === undefined)
    throw new Error("useSong must be used with SongProvider.");

  return context;
};

const SongProvider: FC<Props> = ({ children }: Props) => {
  const [songPlaying, setSongPlaying] = useState<string>("shadow of death");
  return (
    <SongContext.Provider value={{ songPlaying, setSongPlaying }}>
      {children}
    </SongContext.Provider>
  );
};

export { SongProvider, useSong };
