import { gql } from "apollo-server-express";
import * as GraphQL from "../../generated/graphql";

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
  preview_url: string;
  artists: string;
  name: string;
  href: string;
  explicit: string;
  album: {
    images: { width: string; height: string; url: string }[];
    name: string;
  };
};

/**
 * Function which takes in song name, and returns the name possibly shortened if it contains (feat. ) or (with)
 * @param name Name of the song
 * @returns Potentially shortened name
 */
const cleanTrackName = (name: string): string => {
  return name.replace(/\((feat\.?|with)([^)]+)\)/gi, "");
};

/**
 * Function which takes in a name, and if the name is greater than 99 words shortens the string and adds ... to the end
 * @param name Name of the song
 * @returns Potentially shortened name
 */
const shortenName = (name: string): string => {
  return name.length > 99 ? name.slice(0, 96) + "..." : name;
};

const resolvers: GraphQL.Resolvers = {
  Query: {
    tracks: async (_, __, { dataSources }) => {
      const res = await dataSources.spotifyAPI.getTrack();
      const data: SpotifyTrack[] = res.tracks.items;
      // Keep list of current song names to prevent duplicates, because duplicates can potentially be sent from Spotify
      const currentTrackNames: string[] = [];

      /* For each track, check to see if the track has a preview url, and if it has one then that track will be included in the 
      response from this resolver. In addition, check to see if we already have that track name */
      const tracks: GraphQL.Track[] = data.reduce(
        (returnTracks: GraphQL.Track[], curTrack) => {
          if (
            curTrack.preview_url !== null &&
            !currentTrackNames.find((name) => name === curTrack.name)
          ) {
            currentTrackNames.push(curTrack.name);
            returnTracks.push({
              artists: curTrack.artists as unknown as GraphQL.Artist[],
              preview_url: curTrack.preview_url as string,
              name: shortenName(cleanTrackName(curTrack.name)) as string,
              href: curTrack.href as string,
              explicit: curTrack.explicit as string,
              album: {
                album_cover: curTrack.album.images[0].url,
                name: curTrack.album.name,
              } as GraphQL.Album,
            });
          }
          return returnTracks;
        },
        []
      );
      return tracks;
    },
  },
};

export { typeDefs, resolvers };
