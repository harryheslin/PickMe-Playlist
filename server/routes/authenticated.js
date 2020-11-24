var express = require('express');
var router = express.Router();
var qs = require('qs');
const spotify = require('../functions/spotify.js');

router.get('/', function (req, res) {
    let spotifyApi = req.app.locals.spotifyApi;
    if (req.query.code) {
        let code = req.query.code;
        spotifyApi.authorizationCodeGrant(code)
            .then(async (data) => {
                res.status(301).redirect("http://www.localhost:3000/searchpage?token=" + data.body.access_token);
            })
            .catch((e) => {
                res.render('error', { error: e});
            })
    } else {
        res.redirect('/');
    }
});

module.exports = router;