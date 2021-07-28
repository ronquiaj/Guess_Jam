import { FC } from "react";
import "./styles.scss";

type Props = {
  albumName: string;
  imageUrl: string;
};

const SongInfo: FC<Props> = ({ albumName, imageUrl }: Props) => {
  return (
    <div className="song-info-container">
      <img
        className="song-info-container--image"
        src={imageUrl}
        alt="album cover"
      />
      <div className="song-info-container--album-name">{albumName}</div>
    </div>
  );
};

export default SongInfo;
