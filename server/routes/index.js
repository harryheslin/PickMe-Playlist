var express = require('express');
var router = express.Router();
const spotify = require('../functions/spotify.js');

router.post('/', async function (req, res, next) {
  spotify.loginSpotify(req.app.locals.spotifyApi)
    .then(() => res.json({ spotifyauth: authorizeURL + "&show_dialog=true" }))
    .catch((e) => {
      console.log(e)
      res.render('error', { error: e});
  })
});

module.exports = router;
