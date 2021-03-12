var express = require('express');
var router = express.Router();
var searchResponses = require('../responses/searchResponses');


router.get('/v1/search', function (req, res, next) {
  console.log(searchResponses.albumSearchResponse);
  res.json(searchResponses.albumSearchResponse);
});
router.get('/v1/albums/*', function (req, res, next) {
  res.json(searchResponses.albumTracksResponse);
});

module.exports = router;
