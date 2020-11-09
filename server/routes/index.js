var express = require('express');
var router = express.Router();
const spotify = require('../functions/spotify.js');

router.post('/', async function (req, res, next) {
  await spotify.loginSpotify(req.app.locals.spotifyApi);
  res.json({ spotifyauth: authorizeURL + "&show_dialog=true" });
});

module.exports = router;