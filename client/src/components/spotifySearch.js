import { React, useState, useEffect } from 'react'
import styled from 'styled-components'
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import ArtistList from '../components/artistList';

export default function SpotifySearch(props) {
    var SpotifyWebApi = require('spotify-web-api-node');
    let credentials = new SpotifyWebApi({
        clientId: '335c98b88aa9432a964557058c3b2bc6',
        clientSecret: '3af086ecdc724a52a909e8f4fd401159'
    });

    var spotifyApi = new SpotifyWebApi(credentials);
    spotifyApi.setAccessToken(props.token);

    const [selectedArtists, setSelectedArtists] = useState();
    const animatedComponents = makeAnimated();

    const loadOptions = async (inputValue, callback) => {
        const artists = await spotifyApi.searchArtists(inputValue, {limit: 5});
        console.log(artists);
        callback(artists.body.artists.items.map(i => ({ label: i.name, value: i.images[0].url })));  
    }

    if (selectedArtists) {
        return (
            <Styles>
                <div className = "search-bar">
                <AsyncSelect
                    hasValue
                    isMulti
                    onChange={artist => (setSelectedArtists(artist))}
                    placeholder={"Search for artists..."}
                    loadOptions={loadOptions}
                    components={animatedComponents}
                    />
                     </div>
                    <ArtistList artists={selectedArtists} saveArtists={props.saveArtists} getArtists={props.getArtists} />
                   
            </Styles>
        );
    }
    return (
        <Styles> 
            <div className = "search-bar">
            <AsyncSelect
                isMulti
                onChange={artist => (setSelectedArtists(artist))}
                placeholder={"Search for artists..."}
                loadOptions={loadOptions}
                components={animatedComponents}
            />
            </div>
            <div className='search-prompt'>
                <h1>Search an artist to get started</h1>
                </div>
        </Styles>
    );


} const Styles = styled.div`


.search-prompt{
  margin: auto;
  width: 70%;
  background-color: rgba(51, 170, 51, .8);
  color: white;
  border-radius: 20px;
  padding: 10px;
  text-align: center;
    
}
.search-bar{
    padding: 2%;
}
`