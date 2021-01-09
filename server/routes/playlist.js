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
  let fillerSongs = false;
  let totalSongs = artistObject.data.totalSongs;
  let artists = artistObject.data.artists;
  let finalSongs = [];
  spotifyApi.setAccessToken(req.body.token);

  function getSongs(artist) {
    return new Promise(async (resolve, reject) => {
      try {
        let returnSongs = await spotify.getSongs(spotifyApi, artist.id, artist.percentage, totalSongs);
        if (returnSongs.filler) {
          fillerSongs = true;
        }
        resolve(returnSongs.songs);
      } catch (error) {
        console.log(error);
        res.status(400).json({ error });
      }
    })
  }

  for (let i = 0; i < artists.length; i++) {
    finalSongs[i] = getSongs(artists[i])
  }


  function renderResult() {
    res.status(200).json({ result });
  }

  Promise.all(finalSongs)
    .then((res) => {
      let songs = [];

      result = [{
        songs: [],
        filler: fillerSongs
      }];

      //res.map(x => x.map(k => result.push(k.artists[0].name)));
      res.map(x => x.map(k => songs.push(k)));
      result[0].songs = helpers.shuffle(songs);
      console.log(result);
      renderResult()
    })
});

module.exports = router;