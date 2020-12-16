const express = require('express');
const router = express.Router();
const spotify = require('../functions/spotify.js');
const helpers = require('../functions/helpers.js')

router.post('/', async function (req, res, next) {
  let spotifyApi = req.app.locals.spotifyApi;
  
   //Front end
   let artistObject = JSON.parse(req.body.data);
   console.log(req.body.token);
   //console.log(artistObject);
  //Using Postman
  //let artistObject = req.body.data;
  
  let totalSongs = artistObject.data.totalSongs;
  let artists = artistObject.data.artists;
  let finalSongs = [];
  spotifyApi.setAccessToken(req.body.token);
    
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
      //res.map(x => x.map(k => result.push(k.artists[0].name)));
      res.map(x => x.map(k => result.push(k)));
      result = helpers.shuffle(result);
      renderResult()
    })
  });
  
  module.exports = router;