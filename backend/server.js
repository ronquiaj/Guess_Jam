const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// get client info
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyUrl = process.env.SPOTIFY_Url;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

//https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow

const getSpotifyToken = async () => {
  const url = `${spotifyUrl}/api/token`;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const config = {
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
  };
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  const result = await axios
    .post(url, params, config)
    .catch((err) => console.log(err));
  return result.data.access_token;
};

const getSong = async (token) => {
  const url = `https://api.spotify.com/v1/tracks/${encodeURI(
    "6rPO02ozF3bM7NnOV4h6s2"
  )}`;
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const result = await axios.get(url, config).catch((err) => console.log(err));
  console.log(result.data);
};
const start = async () => {
  const token = await getSpotifyToken();
  console.log(token);
  getSong(token);
};
start();
//
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
