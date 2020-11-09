var express = require('express');
var router = express.Router();
var qs = require('qs');
const spotify = require('../functions/spotify.js');

router.get('/', function (req, res, next) {
    let spotifyApi = req.app.locals.spotifyApi;
    if (req.query.code) {
        let code = req.query.code;
        spotifyApi.authorizationCodeGrant(code)
            .then( async (data) => {
                spotifyApi.setAccessToken(data.body['access_token']);
                spotifyApi.setRefreshToken(data.body['refresh_token']);
                // let user = await spotify.getUser(spotifyApi);
                // console.log(spotifyApi);
                res.status(301).redirect("http://www.localhost:3000/searchpage");
            })
            .catch((e) => {
                res.render('error', { error: e});
            })
    } else {
        res.redirect('/');
    }
});

module.exports = router;