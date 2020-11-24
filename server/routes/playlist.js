var express = require('express');
var router = express.Router();

router.post('/', async function (req, res, next) {
    let spotifyApi = req.app.locals.spotifyApi;
    let artistObject = JSON.parse(req.body.data);
    spotifyApi.setAccessToken(req.body.token);
    console.log(artistObject);
    res.status(200).json({artistObject});
  });
  
  module.exports = router;