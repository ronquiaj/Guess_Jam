const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const { ApolloServer } = require("apollo-server-express");
const {
  typeDefs,
  resolvers,
} = require("./build/graphql/schema/GetAnyTrack/schema");
const app = express();
const { SpotifyAPI } = require("./build/dataSources/spotifyAPI");

// Get client info
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;

const mongoUrl = `mongodb+srv://${mongoUsername}:${mongoPassword}@guessjam.vogwr.mongodb.net/GuessJam?retryWrites=true&w=majority`;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to the GuessJam MongoDB server!");
});

// Middleware
app.use(cors());
app.use(express.json());

// Get acccess token, expires every 3600 ms. Sets our request token to the spotify token so we can use the application.
app.use(async (req, res, next) => {
  const token = await getSpotifyToken();
  req.headers.authorization = token;
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { token: req.headers.authorization || "" };
  },
  dataSources: () => ({
    spotifyAPI: new SpotifyAPI(),
  }),
  formatError: (err) => {
    console.error(err);
    return err;
  },
});

server.start();
server.applyMiddleware({ app });

console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);

// Deploy server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
