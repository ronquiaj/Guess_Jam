import { FC } from "react";
import Typography from "../../../../components/global/Typography/Typography";
import "./styles.scss";

type Props = {
  songName: string;
  imageUrl: string;
};

const SongInfo: FC<Props> = ({ songName, imageUrl }: Props) => {
  return (
    <div className="song-info-container">
      <img
        className="song-info-container--image"
        src={imageUrl}
        alt="album cover"
      />
      <Typography variant="white" className="song-info-container--album-name">
        {songName}
      </Typography>
    </div>
  );
};

export default SongInfo;
