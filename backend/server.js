const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
require("dotenv").config();
const spotifyRoutes = require("./routes/spotify");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

// Get client info
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
const dbUri = process.env.DB;
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;
conn.on("error", (err) => console.log(err));
conn.once("open", () => console.log("Connected to database"))

// Get acccess token, expires every 3600 ms. Sets our request token to the spotify token so we can use the application.
app.use(async (req, res, next) => {
  const token = await getSpotifyToken();
  req.token = token;
  next();
});

/**
 * Function that gets our secret and id from the .env file we provide, and sends the data to the spotify api, which gives us back the token.
 * @returns
 */
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

// Spotify routes
app.use("/spotify", spotifyRoutes);

// Deploy server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
