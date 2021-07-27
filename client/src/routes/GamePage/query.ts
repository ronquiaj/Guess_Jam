import { gql } from "@apollo/client";

const GET_TRACKS = gql`
  query GetTracks {
    tracks {
      name
      preview_url
      album {
        name
        album_cover
      }
    }
  }
`;
export default GET_TRACKS;
