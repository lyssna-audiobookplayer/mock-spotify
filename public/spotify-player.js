var Spotify = {};

Spotify.Player = function (options) {
  console.log('player options', options);
  this.onCallbacks = {};

  this.player = {};
  // on:
  // initialization_error
  // authentication_error
  // account_error
  // playback_error
  // player_state_changed
  // ready
  this.player.on = (scope, callback) => {
    this.onCallbacks[scope] = callback;
  };
  this.player.connect = async () => {
    if (this.onCallbacks['ready']) {
      this.onCallbacks['ready']({ device_id: 'fake_device_id' });
    }
    return true;
  };

  this.player.getCurrentState = () => {
    return null;
  }

  return this.player;
};

window.onSpotifyPlayerAPIReady();
