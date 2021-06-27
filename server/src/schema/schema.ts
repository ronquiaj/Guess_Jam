import { gql } from "apollo-server-express";

const data = [
  {
    name: "Adrian",
    profession: "Programmer"
  },
  {
    name: "Kaitlin",
    profession: "Editor"
  }
];

const typeDefs = gql`
  type Artist {
    name: String
    href: String
    uri: String
  }

  type Track {
    artists: [Artist]
    preview_url: String
    name: String
    href: String
    explicit: String
  }

  type Query {
    getTracks: [Track]
  }
`;

const resolvers = {
  Query: {
    getTracks: async (_, __, { dataSources }) => {
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
              explicit: track.explicit
            };
        });

      return tracks;
    }
  }
};

export { typeDefs, resolvers };
