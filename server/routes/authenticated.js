var express = require('express');
var router = express.Router();
var qs = require('qs');
const spotify = require('../functions/spotify.js');

//needs to be a post, but is a get
router.get('/', function (req, res) {
    let spotifyApi = req.app.locals.spotifyApi;
    if (req.query.code) {
        let code = req.query.code;
        spotifyApi.authorizationCodeGrant(code)
            .then(async (data) => {
                res.status(301).redirect(process.env.SPOTIFYREDIRECT + "/authed?token=" + data.body.access_token);
            })
            .catch((e) => {
                console.log(e);
                res.status(400).redirect(process.env.SPOTIFYREDIRECT + "/error");
            })
    } else {
        res.redirect('/');
    }
});

module.exports = router;