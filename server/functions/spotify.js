var SpotifyWebApi = require('spotify-web-api-node');
const { shuffle } = require('./helpers.js');
const scopes = ['user-read-private', 'user-read-email', 'user-top-read'];
const helpers = require('./helpers.js');

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
        let filteredAlbums = [];
        let allAlbums = await spotifyApi.getArtistAlbums(artistID, { include_groups: 'album,single', country: 'AU', limit: 50 });

        //Ensure albums ids don't exceed 20, API maximum
        let j = -1;
        for (let i = 0; i < allAlbums.body.items.length; i++){
            if (i % 20 == 0) {
                filteredAlbums.push(new Array());
                j++
            }
            filteredAlbums[j].push(allAlbums.body.items[i]);
        }
        allAlbums = [];
        for (let i = 0; i < filteredAlbums.length; i++){
            allAlbums.push(await spotifyApi.getAlbums([filteredAlbums[i].map(albums => albums.id)]))
        }
        allAlbums = allAlbums.map(albumGroups => albumGroups.body.albums.map(album => album));
        for (let i = 0; i < allAlbums[0].length; i++) {
            let tracks = allAlbums[0][i].tracks;
            //Remove duplicates across EP and Albums
            for (let k = 0; k < tracks.items.length; k++) {
                if (!songNames.includes(tracks.items[k].name)) {
                    songNames.push(tracks.items[k].name);
                    result.push(tracks.items[k]);
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
            similarTracks = similarTracks.body.tracks.map(track => track);
            shuffle(similarTracks);
            for (let k = 0; k < similarTracks.length; k++) {
                result.push(similarTracks[k]);
                if (result.length >= tracksRequired) {
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
            for (let i = 0; i < tracks.body.tracks.length; i++) {
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