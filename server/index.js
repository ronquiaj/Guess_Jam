const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
require("dotenv").config();
const userRoutes = require("./build/routes/users");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./build/schema/schema");
const app = express();
const { SpotifyAPI } = require("./build/dataSources/spotifyAPI");

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
  useUnifiedTopology: true
});

const conn = mongoose.connection;
conn.on("error", (err) => console.log(err));
conn.once("open", () => console.log("Connected to database"));

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
      Authorization: `Basic ${auth}`
    }
  };
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  const result = await axios.post(url, params, config).catch((err) => console.log(err));
  return result.data.access_token;
};

// User routes
app.use("/users", userRoutes);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { token: req.headers.authorization || "" };
  },
  dataSources: () => ({
    spotifyAPI: new SpotifyAPI()
  }),
  formatError: (err) => {
    console.error(err);
    return err;
  }
});
server.start();
server.applyMiddleware({ app });
console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);

// Deploy server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
