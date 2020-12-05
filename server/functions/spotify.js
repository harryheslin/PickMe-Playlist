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

    getSimilarSongs: async function (spotifyApi, artistID, tracksRequired) {
        let result = [];
        let similarArtists = await spotifyApi.getArtistRelatedArtists(artistID);
        let similarIDs = similarArtists.body.artists.map(artist => artist.id);
        for (let i = 0; i < similarIDs.length; i++) {
            let similarTracks = await spotifyApi.getArtistTopTracks(similarIDs[i], 'AU');
            //console.log(similarTracks);
            for (let k = 0; k < similarTracks.body.tracks.length; k++) {
                result.push(similarTracks.body.tracks[k]);
                if (result.length >= tracksRequired) {
                    console.log('DONE');
                    return result;
                }
            }
        }
    },

    getSongs: async function (spotifyApi, artistID, percentage, totalSongs) {
        let returnSongs = [];
        let artistTrackTotal = totalSongs * (percentage / 100);
        let tracks;
 
        //Get popular tracks first if less then or equal to 10
        if (artistTrackTotal <= 10) {
            tracks = await spotifyApi.getArtistTopTracks(artistID, 'AU');
            for (let i = 0; i < tracks.length; i++) {
                returnSongs.push(tracks.body.tracks[i])
            }
            //If artist does not have enough popular songs to satisfy request, get similar artist tracks
            if (returnSongs.length < artistTrackTotal) {
                let tracksRequired = artistTrackTotal - returnSongs.length;
                let similarTracks = await this.getSimilarSongs(spotifyApi, artistID, tracksRequired);
                similarTracks.map(track => returnSongs.push(track));
            }
        } else {
            //Retrieve Full artist catalog if over 10 songs
            tracks = await this.getAllTracks(spotifyApi, artistID);

            //If not enough tracks are found from artist, get similar artist
            if (tracks.length < artistTrackTotal) {
                let tracksRequired = artistTrackTotal - tracks.length;
                let similarTracks = await this.getSimilarSongs(spotifyApi, artistID, tracksRequired);
                similarTracks.map(track => returnSongs.push(track));
                console.log(returnSongs.length);
            }
            let i = 0;
            while (i < tracks.length) {
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