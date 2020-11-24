var express = require('express');
var router = express.Router();

router.post('/', async function (req, res, next) {
  let spotifyApi = req.app.locals.spotifyApi;
  let inputValue = req.body.data;
  spotifyApi.setAccessToken(req.body.token);
  let artists = await spotifyApi.searchArtists(inputValue, { limit: 5 });
  console.log("Pinged by the client!");
  res.status(200).json({ artists });
});

module.exports = router;
