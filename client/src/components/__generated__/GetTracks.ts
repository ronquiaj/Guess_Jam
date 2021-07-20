/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTracks
// ====================================================

export interface GetTracks_tracks_album {
  __typename: "Album";
  name: string;
  album_cover: string;
}

export interface GetTracks_tracks {
  __typename: "Track";
  name: string;
  preview_url: string;
  album: GetTracks_tracks_album;
}

export interface GetTracks {
  tracks: GetTracks_tracks[] | null;
}
