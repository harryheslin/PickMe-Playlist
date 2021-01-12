var express = require('express');
var router = express.Router();

router.post('/', async function (req, res) {
  try {
    let spotifyApi = req.app.locals.spotifyApi;
    let inputValue = req.body.data;
    spotifyApi.setAccessToken(req.body.token);
    let artists = await spotifyApi.searchArtists(inputValue, { limit: 10 })
    res.status(200).json({ artists })
  } catch (error) {
    console.log(error);
    res.status(400).json({ error } )
  }
});

module.exports = router;
