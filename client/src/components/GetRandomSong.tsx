import { useState, useEffect } from "react";
import React, { FC } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const GET_TRACKS = gql`
  query GetTracks {
    tracks {
      name
      preview_url
      album {
        name
        album_cover
      }
    }
  }
`;

const GetRandomSong: FC = () => {
  const [currentSong, setCurrentSong] = useState<HTMLAudioElement | undefined>(undefined);
  const [albumName, setAlbumName] = useState<string | undefined>();
  const [albumCover, setAlbumCover] = useState<string | undefined>();
  const [getTracks, { loading, data }] = useLazyQuery(GET_TRACKS);

  useEffect(() => {
    if (data?.tracks) {
      const chosenTrack = data.tracks[Math.floor(Math.random() * (data.tracks.length - 1))];
      console.log(chosenTrack);
      setAlbumCover(chosenTrack.album.album_cover);
      setAlbumName(chosenTrack.album.name);
      currentSong && currentSong.pause();
      const audio = new Audio();
      audio.src = chosenTrack.preview_url;
      setCurrentSong(audio);
      audio.play();
    }
  }, [data]);

  return (
    <div>
      <button onClick={() => getTracks()}>play random song</button>
      {albumName}
      <img src={albumCover ?? ""} />
    </div>
  );
};

export default GetRandomSong;
