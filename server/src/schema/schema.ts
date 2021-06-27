import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Artist {
    name: String
    href: String
    uri: String
  }

  type Album {
    album_cover: String
    name: String
  }

  type Track {
    artists: [Artist]
    preview_url: String
    name: String
    href: String
    explicit: String
    album: Album
  }

  type Query {
    tracks: [Track]
  }
`;

const resolvers = {
  Query: {
    tracks: async (_, __, { dataSources }) => {
      const res = await dataSources.spotifyAPI.getTrack();
      const data = res.tracks.items;
      const tracks = data
        .filter((track) => track.preview_url !== null)
        .map((track) => {
          if (track.preview_url != null)
            return {
              artists: track.artists,
              preview_url: track.preview_url,
              name: track.name,
              href: track.href,
              explicit: track.explicit,
              album: {
                album_cover: track.album.images[0].url,
                name: track.album.name
              }
            };
        });
      return tracks;
    }
  }
};

export { typeDefs, resolvers };
