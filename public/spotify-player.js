var Spotify = {};
Spotify.Player = function (options) {
  var socket = new WebSocket("ws://localhost:3334");
  socket.onopen = (event) => {
    console.log('websocket open');
  };
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log(data);
      console.log(this.onCallbacks);
      if (data.on && this.onCallbacks[data.on]) {
        this.onCallbacks[data.on](data.payload);
      }
    } catch (e) {
      console.error(e);
    }
  }

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

  this.player.getCurrentState = async () => {
    return null;
  }

  this.player.pause = async () => {
    const response = await fetch('http://localhost:3333/v1/me/player/pause', {method: 'PUT'});
    return null;
  }

  return this.player;
};

window.onSpotifyPlayerAPIReady();
