import { React } from 'react'
import styled from 'styled-components'
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';

export default function SearchBar(props) {
    var SpotifyWebApi = require('spotify-web-api-node');
    let credentials = new SpotifyWebApi({
        clientId: '335c98b88aa9432a964557058c3b2bc6',
        clientSecret: '3af086ecdc724a52a909e8f4fd401159'
    });

    var spotifyApi = new SpotifyWebApi(credentials);
    spotifyApi.setAccessToken(props.token);
    
    const animatedComponents = makeAnimated();

    const loadOptions = async (inputValue, callback) => {
        const artists = await spotifyApi.searchArtists(inputValue, { limit: 5 });
        callback(artists.body.artists.items.map(i => ({ label: i.name, value: i.images[0].url, id: i.id })));
    }

    return (
        <Styles>
            <div className="search-bar">
                <AsyncSelect
                    isMulti
                    onChange={artist => (props.saveSearchBarArtists(artist))}
                    placeholder={"Search for artists..."}
                    loadOptions={loadOptions}
                    components={animatedComponents}
                />
            </div>
           
        </Styles>
    );


} const Styles = styled.div`

.search-bar{
    padding-left: 2%;
    padding-right: 3%;
    padding-top: 2%;
    padding-bottom: .5%;
}
`