import { React, useState, useEffect } from 'react'
import styled from 'styled-components'
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';

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
        const artists = await spotifyApi.searchArtists(inputValue, {limit: 10});
        console.log(artists);
        callback(artists.body.artists.items.map(i => ({ label: i.name, value: i.images[0].url })));  
    }

    if (selectedArtists) {
        return (
            <Styles>
                <AsyncSelect
                    hasValue
                    isMulti
                    onChange={artist => (setSelectedArtists(artist))}
                    placeholder={"Search for artists..."}
                    loadOptions={loadOptions}
                    components={animatedComponents}
                />
                {selectedArtists.map(i => {
                    return (
                        <div>
                        <h2 key={i} >{i.label}</h2>
                            <img className='spotify-images' src={i.value}/>
                        </div>
                    )
                })}
            </Styles>
        );
    }
    return (
        <Styles>
            <AsyncSelect
                isMulti
                onChange={artist => (setSelectedArtists(artist))}
                placeholder={"Search for artists..."}
                loadOptions={loadOptions}
                components={animatedComponents}
            />
        </Styles>
    );


} const Styles = styled.div`

.spotify-images{
    max-width: 10%;
    height: auto;
}`