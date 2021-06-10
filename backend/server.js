const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
require("dotenv").config();
const spotifyRoutes = require("./routes/spotify");

const app = express();
const port = process.env.PORT || 5000;

// get client info
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyUrl = process.env.SPOTIFY_Url;

// middleware
app.use(cors());
app.use(express.json());

// get acccess token, expires every 3600 ms
app.use(async (req, res, next) => {
  const token = await getSpotifyToken();
  req.token = token;
  next();
});

const getSpotifyToken = async () => {
  const url = `https://accounts.spotify.com/api/token`;
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

// spotify routes
app.use("/spotify", spotifyRoutes);

// deploy server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
