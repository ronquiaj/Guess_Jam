const express = require("express");
const router = express.Router();
const axios = require("axios");

const spotifyUrl = "https://api.spotify.com/v1";

const getRandomCharacter = () => {
  // A list of all characters that can be chosen.
  const characters = "abcdefghijklmnopqrstuvwxyz";

  // Gets a random character from the characters string.
  const randomCharacter = characters.charAt(
    Math.floor(Math.random() * characters.length)
  );
  return randomCharacter;
};

router.get("/getRandomSong", async (req, res) => {
  //https://developer.spotify.com/documentation/web-api/reference/#category-search
  let previewUrl = "";
  while (!previewUrl) {
    const char = getRandomCharacter();
    const offset = Math.floor(Math.random() * 1000);
    const url = `${spotifyUrl}/search/`;
    const config = {
      params: {
        q: char,
        type: "track",
        offset: offset,
      },
      headers: {
        Authorization:
          "Bearer " +
          "BQACOczQWzKWDvm81h-ByAF1M8ZGaFmr4xS5IVdO9psUlif5IyyqiPxen4F0T0cdwrCoIp6dn5JHD_cGOak",
      },
    };

    try {
      const result = await axios.get(url, config);
      const tracks = await result.data.tracks.items;
      for (let track of tracks) {
        if (track["preview_url"]) {
          previewUrl = track["preview_url"];
          break;
        }
      }
    } catch (err) {
      console.log(err);
      previewUrl = "error";
    }
  }
  previewUrl === "error"
    ? res.status(500).json({ msg: "error fetching random song" })
    : res.json({ previewUrl: previewUrl });
});

module.exports = router;
