const express = require('express');
const router = express.Router();
const spotify = require('../functions/spotify.js');

router.post('/', async function (req, res, next) {
  let spotifyApi = req.app.locals.spotifyApi;
  
   //Front end
   let artistObject = JSON.parse(req.body.data);
   console.log(req.body.token);
  console.log(artistObject);
  //Using Postman
  //let artistObject = req.body.data;
  
  let totalSongs = artistObject.data.totalSongs;
  let artists = artistObject.data.artists;
  let finalSongs = [];
  spotifyApi.setAccessToken(req.body.token);
  
  //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

  for (let i = 0; i < artists.length; i++){
    finalSongs[i] = (await spotify.getSongs(spotifyApi, artists[i].id, artists[i].percentage, totalSongs))
  }
  result = [];
  finalSongs.map(x => x.map(k => result.push(k.name)))
  console.log(shuffle(result));
  res.status(200).json({result});
  });
  
  module.exports = router;