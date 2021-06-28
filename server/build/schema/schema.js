"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = apollo_server_express_1.gql `
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
exports.typeDefs = typeDefs;
const resolvers = {
    Query: {
        tracks: (_, __, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield dataSources.spotifyAPI.getTrack();
            const data = res.tracks.items;
            const tracksWithPreview = data.filter((track) => track.preview_url !== null);
            /* For each track, check to see if the track has a preview url, and if it has one then that track will be included in the
            response from this resolver */
            const tracks = tracksWithPreview.reduce((returnTracks, curTrack) => {
                if (curTrack.preview_url != null)
                    returnTracks.push({
                        artists: curTrack.artists,
                        preview_url: curTrack.preview_url,
                        name: curTrack.name,
                        href: curTrack.href,
                        explicit: curTrack.explicit,
                        album: {
                            album_cover: curTrack.album.images[0].url,
                            name: curTrack.album.name
                        }
                    });
                return returnTracks;
            }, []);
            return tracks;
        })
    }
};
exports.resolvers = resolvers;
