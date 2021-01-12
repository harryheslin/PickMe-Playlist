const express = require('express');
const router = express.Router();
const spotify = require('../functions/spotify.js');

router.post('/', async function (req, res, next) {
    let spotifyApi = req.app.locals.spotifyApi;
    let data = JSON.parse(req.body.data);
    data = data.data;
    spotifyApi.setAccessToken(req.body.token);
    let saveSuccess = await spotify.createPlaylist(spotifyApi, data);
    if (saveSuccess) {
        res.status(200).json({ status: 'Success' });
    } else {
        res.status(400).json({ status: 'Error' });
    }
})

module.exports = router;