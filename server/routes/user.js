var express = require('express');
var router = express.Router();
const spotify = require('../functions/spotify.js');

router.post('/', function (req, res, next) {
    res.json(req.app.locals.spotifyApi);
});

module.exports = router;