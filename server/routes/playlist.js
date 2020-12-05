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
  
  function getSongs(artist) {
    return new Promise(async (resolve) => {
      try {
        let songs = await spotify.getSongs(spotifyApi, artist.id, artist.percentage, totalSongs);
      resolve(songs);
      } catch (error) {
        console.log(error);
      } 
    })
  }

  for (let i = 0; i < artists.length; i++){
    finalSongs[i] = getSongs(artists[i])
  }


  function renderResult() {
    res.status(200).json({result});
  }
 
  Promise.all(finalSongs)
    .then((res) => {
      result = [];
      res.map(x => x.map(k => result.push(k.name)));
      result = shuffle(result);
      renderResult()
    })
  });
  
  module.exports = router;