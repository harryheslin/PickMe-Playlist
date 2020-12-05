var SpotifyWebApi = require('spotify-web-api-node');
const scopes = ['user-read-private', 'user-read-email', 'user-top-read'];

module.exports = {

    loginSpotify: async function (spotifyApi) {
        authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    },

    getArtistAlbums: function (spotifyApi, artistId) {
        spotifyApi.getArtistAlbums(artistId).then(
            function (data) {
                console.log('Artist albums', data.body);
            },
            function (err) {
                console.error(err);
            }
        );
    },

    getAllTracks: async function (spotifyApi, artistID) {
        let result = [];
        let songNames = [];
        let allAlbums = await spotifyApi.getArtistAlbums(artistID, { include_groups: 'album,single', country: 'AU', limit: 50 });
        for (let i = 0; i < allAlbums.body.items.length; i++) {
            let item = await spotifyApi.getAlbumTracks(allAlbums.body.items[i].id, { limit: 50 });
            //Remove duplicates accross EP and Albums
            for (let k = 0; k < item.body.items.length; k++) {
                if (!songNames.includes(item.body.items[k].name)) {
                    songNames.push(item.body.items[k].name);
                    result.push(item.body.items[k]);
                }
            }
        }
        return result;
    },

    getSongs: async function (spotifyApi, artistID, percentage, totalSongs) {
        let returnSongs = [];
        let artistTrackTotal = totalSongs * (percentage / 100);
        let tracks;
        

        //In for loop add another if statement for i < tracks.length
        //Add into while loop to stop infinite loop
            //if tracks.length < artistTracktotal, push them all, no need to randomize here
            //then do a get similarArtistsTracks function
            //get max number of similar artists, and get their popular in non random order
            //continue this while the tracks is less then the required total 

        //Get popular tracks first if less then or equal to 10
        if (artistTrackTotal <= 10) {
            tracks = await spotifyApi.getArtistTopTracks(artistID, 'AU');
            for (let i = 0; i < artistTrackTotal; i++) {
                returnSongs.push(tracks.body.tracks[i])
            }
        } else {
            //Full artist catalog if over 10 songs
            tracks = await this.getAllTracks(spotifyApi, artistID)
            let i = 0;
            while (i < artistTrackTotal) {
                let random = Math.floor(Math.random() * tracks.length);
                if (!returnSongs.includes(tracks[random])) {
                    returnSongs.push(tracks[random]);
                    i++;
                }
            }
        }
        return returnSongs;
    },

    getUser: async function (spotifyApi) {
        try {
            username = await spotifyApi.getMe();
            return (username.body.id);
        }
        catch (error) {
            console.log(error);
        }
    }
}