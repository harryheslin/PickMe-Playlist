var SpotifyWebApi = require('spotify-web-api-node');
const { shuffle } = require('./helpers.js');
const scopes = ['playlist-modify-public', 'playlist-modify-private'];

//'user-read-private', 'user-read-email', 'user-top-read',
module.exports = {

    loginSpotify: async function (spotifyApi) {
        authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    },

    getAllTracks: async function (spotifyApi, artistID) {
        try {
            let result = [];
            let songNames = [];
            let filteredAlbums = [];
            let allAlbums = await spotifyApi.getArtistAlbums(artistID, { include_groups: 'album,single', country: 'AU', limit: 50 });

            //Ensure albums ids don't exceed 20, API maximum
            let j = -1;
            for (let i = 0; i < allAlbums.body.items.length; i++) {
                if (i % 20 == 0) {
                    filteredAlbums.push(new Array());
                    j++
                }
                filteredAlbums[j].push(allAlbums.body.items[i]);
            }
            allAlbums = [];
            for (let i = 0; i < filteredAlbums.length; i++) {
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
        }
        catch (e) {
            console.log(e);
        }
    },

    getSimilarSongs: async function (spotifyApi, artistID, tracksRequired) {
        try {
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
        } 
        catch (e) {
            console.log(e);
        }
    },

    getSongs: async function (spotifyApi, artistID, percentage, totalSongs) {
        try {
            let returnSongs = {
                songs: [],
                filler: false
            };
            let artistTrackTotal = totalSongs * (percentage / 100);
            let tracks;
            let filler = false;

            //Get popular tracks first if less then or equal to 10
            if (artistTrackTotal <= 10) {
                tracks = await spotifyApi.getArtistTopTracks(artistID, 'AU');
                for (let i = 0; i < artistTrackTotal; i++) {
                    returnSongs.songs.push(tracks.body.tracks[i])
                }
                //If artist does not have enough popular songs to satisfy request, get similar artist tracks
                if (returnSongs.songs.length < artistTrackTotal) {
                    let tracksRequired = artistTrackTotal - returnSongs.songs.length;
                    let similarTracks = await this.getSimilarSongs(spotifyApi, artistID, tracksRequired);
                    similarTracks.map(track => returnSongs.songs.push(track));
                    filler = true;
                }
            } else {
                //Retrieve Full artist catalog if over 10 songs
                tracks = await this.getAllTracks(spotifyApi, artistID);
                //If not enough tracks are found from artist, get similar artist
                if (tracks.length < artistTrackTotal) {
                    let tracksRequired = artistTrackTotal - tracks.length;
                    let similarTracks = await this.getSimilarSongs(spotifyApi, artistID, tracksRequired);
                    similarTracks.map(track => returnSongs.songs.push(track));
                    filler = true;
                }
                let i = 0;
                let k = artistTrackTotal - returnSongs.songs.length;
                while (i < k) {
                    let random = Math.floor(Math.random() * tracks.length);
                    if (!returnSongs.songs.includes(tracks[random])) {
                        returnSongs.songs.push(tracks[random]);
                        i++;
                    }
                }
            }
            returnSongs.filler = filler;
            return returnSongs;
        }
        catch (e) {
            console.log(e);
        }
    },

    createPlaylist: async function (spotifyApi, data) {
        try {
            spotifyApi.createPlaylist(data.name, { 'description': data.description, 'public': data.publicPlaylist })
                .then((res) => {
                    let id = res.body.id;
                    spotifyApi.addTracksToPlaylist(id, data.songIds.map(track => "spotify:track:" + track))
                        .catch((e) => {
                            console.log(e);
                            return false;
                        })
                })
            return true;
        } 
        catch(e) {
            console.log(e)
            return false;
        }
    } 
}