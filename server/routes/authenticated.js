var express = require('express');
var router = express.Router();
const spotify = require('../functions/spotify.js');

router.get('/', function (req, res, next) {
    let spotifyApi = req.app.locals.spotifyApi;
    if (req.query.code) {
        let code = req.query.code;
        spotifyApi.authorizationCodeGrant(code)
            .then((data) => {
                spotifyApi.setAccessToken(data.body['access_token']);
                spotifyApi.setRefreshToken(data.body['refresh_token']);
                //spotify.testSpotify(spotifyApi);
                res.render('index', { title: 'Express' });
            })
            .catch((e) => {
                res.render('error', { error: e});
            })
    } else {
        res.redirect('/');
    }
});

module.exports = router;