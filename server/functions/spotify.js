var SpotifyWebApi = require('spotify-web-api-node');
const scopes = ['user-read-private', 'user-read-email', 'user-top-read'];

module.exports = {

    loginSpotify: async function (spotifyApi) {
        authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    },

    testSpotify: function (spotifyApi) {
        spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
            function (data) {
                console.log('Artist albums', data.body);
            },
            function (err) {
                console.error(err);
            }
        );
    },

    searchArtist: function (spotifyApi, artist) {
        
    }
}