# Mock Spotify Web API + Web Playback SDK

### Why does this project exist?
I'm developing a Web/Android Application to facilitate listening of Audiobooks with Spotify (https://play.google.com/store/apps/details?id=com.tobik.audiobookspotify)

In order to do end to end testing with my app I started this project that replicates the Web API of Spotify and sends back minimal data to make the client application work.

Maybe it's not the best idea but instead of refactoring my code to be able to mock it there I thought just to create this project.

You can also send spotify errors to your application to test how they are handled.

For the moment I only mock the bare minimum of functionality to make my tests work but it could be interesting to grow this project so that more people can profit from it.

## Run mock server
First install dependencies via `npm install`
Then start the server via `npm start`

The server is accesible under `http://localhost:3333/`

### Mocked APIs
To authorize use: `/authorize`
This compares to the `https://accounts.spotify.com/authorize`. Except that the popup window closes itself and sends back some fake tokens so it's useable without user interaction.

POST `/exchange` gives back some fake access and refresh tokens.

GET `/v1/search`
GET `/v1/albums/*`

For playback testing integrate the fake Web Playback SDK `spotify_player.js` (compares to `https://sdk.scdn.co/spotify_player.js`)

PUT `/v1/me/player/play`
PUT `/v1/me/player/pause`

### Send errors
GET `http://localhost:3333/debug/initialization_error`

## ToDo
- example app that shows how to use the mock server
