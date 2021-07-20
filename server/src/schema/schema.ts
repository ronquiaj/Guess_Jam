import { gql } from "apollo-server-express";
import * as GraphQL from "../generated/graphql";

const typeDefs = gql`
  type Artist {
    name: String!
    href: String!
    uri: String!
  }

  type Album {
    album_cover: String!
    name: String!
  }

  type Track {
    artists: [Artist!]!
    preview_url: String!
    name: String!
    href: String!
    explicit: String!
    album: Album!
  }

  type Query {
    tracks: [Track!]
  }
`;

// This type models the response from the Spotify api
type SpotifyTrack = {
  preview_url: String;
  artists: String;
  name: String;
  href: String;
  explicit: String;
  album: {
    images: { width: String; height: String; url: String }[];
    name: String;
  };
};

const resolvers: GraphQL.Resolvers = {
  Query: {
    tracks: async (_, __, { dataSources }) => {
      const res = await dataSources.spotifyAPI.getTrack();
      const data: SpotifyTrack[] = res.tracks.items;
      const tracksWithPreview = data.filter(
        (track) => track.preview_url !== null
      );

      /* For each track, check to see if the track has a preview url, and if it has one then that track will be included in the 
      response from this resolver */
      const tracks: GraphQL.Track[] = tracksWithPreview.reduce(
        (returnTracks: GraphQL.Track[], curTrack) => {
          if (curTrack.preview_url != null)
            returnTracks.push({
              artists: curTrack.artists as unknown as GraphQL.Artist[],
              preview_url: curTrack.preview_url as string,
              name: curTrack.name as string,
              href: curTrack.href as string,
              explicit: curTrack.explicit as string,
              album: {
                album_cover: curTrack.album.images[0].url,
                name: curTrack.album.name,
              } as GraphQL.Album,
            });
          console.log(returnTracks);
          return returnTracks;
        },
        []
      );
      return tracks;
    },
  },
};

export { typeDefs, resolvers };
