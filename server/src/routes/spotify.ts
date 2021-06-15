import express from "express";
import axios from "axios";

const router = express.Router();

const spotifyUrl = "https://api.spotify.com/v1";

const getRandomCharacter = () => {
  // A list of all characters that can be chosen.
  const characters = "abcdefghijklmnopqrstuvwxyz";

  // Gets a random character from the characters string.
  const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
  return randomCharacter;
};

router.get("/getRandomSong", async (req, res) => {
  let previewUrl = "";
  while (!previewUrl) {
    const char = getRandomCharacter();
    const offset = Math.floor(Math.random() * 1000);
    const url = `${spotifyUrl}/search/`;
    const config = {
      params: {
        q: char,
        type: "track",
        offset: offset
      },
      headers: {
        Authorization: `Bearer ${req.token}`
      }
    };

    /*disc_number: 1,
  duration_ms: 190458,
  explicit: true,
  external_ids: { isrc: 'USLD91731549' },
  external_urls: { spotify: 'https://open.spotify.com/track/7HsjuVBM93Z2RoxjpWLgTT' },
  href: 'https://api.spotify.com/v1/tracks/7HsjuVBM93Z2RoxjpWLgTT',
  id: '7HsjuVBM93Z2RoxjpWLgTT',
  is_local: false,
  name: 'Richer (feat. Polo G)',
  popularity: 79,
  preview_url: 'https://p.scdn.co/mp3-preview/236826c91f513ef4f2ed93e55a5801b75c7acde3?cid=9b12eecf545e4430adf9f9fdf87ce10c',
  track_number: 7,
  type: 'track',
  uri: 'spotify:track:7HsjuVBM93Z2RoxjpWLgTT' */

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
    : res.send(previewUrl);
});

module.exports = router;
