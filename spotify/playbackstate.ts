import {
  albumSearchResponse,
  albumTracksResponse,
} from '../responses/searchResponses';

export function createPlaybackState(paused: boolean, trackId?: string, position: number = 0) {
  let index = albumTracksResponse.items.findIndex(track => track.id === trackId);
  console.log(trackId, index);
  index = index >= 0 ? index : 0;

  const track = albumTracksResponse.items[index] as any;
  track.album = albumSearchResponse.albums.items[0];

  const playerState = {
    // context,
    // disallows,
    repeat_mode: 0,
    shuffle: false,
    // restrictions,
    track_window: {
      previous_tracks: [],
      current_track: track,
      next_tracks: [],
    },
    duration: track.duration_ms,
    position: position,
    paused,
  };

  return playerState;
}
