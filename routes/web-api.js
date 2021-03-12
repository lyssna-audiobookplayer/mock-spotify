var express = require('express');
var router = express.Router();
var searchResponses = require('../responses/searchResponses');
var playbackHelper = require('../spotify/playbackstate');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3334 });
let openWs;

wss.on('connection', function connection(ws) {
  console.log('WS connected');
  openWs = ws;
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
});

wss.on('close', function close() {
  console.log('WS closed');
});

router.get('/v1/search', function (req, res, next) {
  console.log(searchResponses.albumSearchResponse);
  res.json(searchResponses.albumSearchResponse);
});

router.get('/v1/albums/*', function (req, res, next) {
  res.json(searchResponses.albumTracksResponse);
});

router.put('/v1/me/player/play', function (req, res, next) {
  console.log(req.body);
  res.send();

  const wsResponse = {
    on: 'player_state_changed',
    payload: playbackHelper.createPlaybackState(false),
  }
  openWs.send(JSON.stringify(wsResponse))
});

// Internally used for spotify-player.js
router.put('/v1/me/player/pause', function (req, res, next) {
  res.send();

  const wsResponse = {
    on: 'player_state_changed',
    payload: playbackHelper.createPlaybackState(true),
  }
  openWs.send(JSON.stringify(wsResponse))
});



module.exports = router;
