var searchResponses = require('../responses/searchResponses');

function createPlaybackState(paused) {
  const track = searchResponses.albumTracksResponse.items[0];
  track.album = searchResponses.albumSearchResponse.albums.items[0];

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
    position: 5000,
    paused,
  }

  return playerState;
}

module.exports = {
  createPlaybackState,
}
