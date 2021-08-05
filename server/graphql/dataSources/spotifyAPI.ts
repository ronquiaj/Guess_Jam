import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spotify.com/v1/";
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  /**
   * Function to get a random character, this will be used for fetching a random song from the Spotify API
   * @returns a random character
   */
  getRandomCharacter = () => {
    // A list of all characters that can be chosen.
    const characters = "abcdefghijklmnopqrstuvwxyz";

    // Gets a random character from the characters string.
    const randomCharacter = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    return randomCharacter;
  };

  async getTrack() {
    return this.get("search/", {
      q: this.getRandomCharacter(),
      type: "track",
      offset: Math.floor(Math.random() * 1000),
    });
  }
}

export { SpotifyAPI };
