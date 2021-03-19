import express from 'express';
import {
  albumSearchResponse,
  albumTracksResponse,
} from '../responses/searchResponses';
import { createPlaybackState } from '../spotify/playbackstate';
var router = express.Router();

import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 3334 });
let openWs: any;

wss.on('connection', function connection(ws: any) {
  console.log('WS connected');
  openWs = ws;
  ws.on('message', function incoming(message: string) {
    console.log('received: %s', message);
  });
});

wss.on('close', function close() {
  console.log('WS closed');
});

router.get('/v1/search', function (req, res, next) {
  res.json(albumSearchResponse);
});

router.get('/v1/albums/*', function (req, res, next) {
  res.json(albumTracksResponse);
});

router.put('/v1/me/player/play', function (req, res, next) {
  console.log(req.body);
  const trackId = req.body.offset.uri.split(':')[2];
  res.send();

  const wsResponse = {
    on: 'player_state_changed',
    payload: createPlaybackState(false, trackId),
  };
  openWs.send(JSON.stringify(wsResponse));
});

// Internally used for spotify-player.js
router.put('/v1/me/player/pause', function (req, res, next) {
  res.send();

  const wsResponse = {
    on: 'player_state_changed',
    payload: createPlaybackState(true),
  };
  openWs.send(JSON.stringify(wsResponse));
});

module.exports = router;
