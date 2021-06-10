import React, { useState, useEffect } from "react";
const axios = require("axios");

// const callApi: any = async () => {
//   const result = await axios.get("http://localhost:5000/spotify/getRandomSong");
//   const previewUrl = await result.data;
//   return previewUrl;
// };

const GetRandomSong = () => {
  //   const [previewUrl, setPreviewUrl] = useState("");
  //   const [prevAudio, setPrevAudio] = useState(new Audio());
  //   useEffect(() => {
  //     setPreviewUrl(callApi());
  //     setPrevAudio(new Audio(previewUrl))
  //   }, []);

  const handleClick = async () => {
    // prevAudio.pause()
    // setPreviewUrl(callApi());
    // setPrevAudio(new Audio(previewUrl));
    // prevAudio.play()
    const result = await axios.get(
      "http://localhost:5000/spotify/getRandomSong"
    );
    const previewUrl = await result.data;
    const audio = new Audio();
    audio.src = previewUrl;
    audio.play();
  };

  return (
    <div>
      <button onClick={handleClick}>play random song</button>
    </div>
  );
};

export default GetRandomSong;
