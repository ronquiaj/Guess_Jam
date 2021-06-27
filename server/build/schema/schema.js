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
exports.typeDefs = typeDefs;
const resolvers = {
    Query: {
        tracks: (_, __, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield dataSources.spotifyAPI.getTrack();
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
        })
    }
};
exports.resolvers = resolvers;
