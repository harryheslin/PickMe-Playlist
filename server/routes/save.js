const express = require('express');
const router = express.Router();
const spotify = require('../functions/spotify.js');
const helpers = require('../functions/helpers.js')

router.post('/', async function (req, res, next) {
    let spotifyApi = req.app.locals.spotifyApi;
    let data = JSON.parse(req.body.data);
    data = data.data;
    spotifyApi.setAccessToken(req.body.token);
    await spotify.createPlaylist(spotifyApi, data);
    res.status(200);
})

module.exports = router;