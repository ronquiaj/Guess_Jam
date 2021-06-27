"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyAPI = void 0;
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
class SpotifyAPI extends apollo_datasource_rest_1.RESTDataSource {
  constructor() {
    super();
    this.getRandomCharacter = () => {
      // A list of all characters that can be chosen.
      const characters = "abcdefghijklmnopqrstuvwxyz";
      // Gets a random character from the characters string.
      const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
      return randomCharacter;
    };
    this.baseURL = "https://api.spotify.com/v1/";
  }
  willSendRequest(request) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }
  getTrack() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.get("search/", {
        q: this.getRandomCharacter(),
        type: "track",
        offset: Math.floor(Math.random() * 1000)
      });
    });
  }
}
exports.SpotifyAPI = SpotifyAPI;
