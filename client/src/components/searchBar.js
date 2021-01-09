import { React, useEffect, useState } from 'react'
import styled from 'styled-components'
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import FetchServer from './fetchServer';
import logo from "./icons/black-spotify-logo.jpg";
import { useHistory } from "react-router-dom";

export default function SearchBar(props) {
    const [error, setError] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (error) {
            history.push({
                pathname: '/errorpage'
            });
        }
    }, [error]);

    const animatedComponents = makeAnimated();

    function artistImage(images) {
        let url = images.length >= 1 ? images[0].url : logo;
        return url;
    }

    const loadOptions = (inputValue, callback) => {
        FetchServer('search', props.token, inputValue)
            .then((artists) => callback(artists.artists.body.artists.items.map(i => ({ label: i.name, value: artistImage(i.images), id: i.id }))))
            .then((x) => console.log(x))
            .catch((e) => setError(true))
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
    padding-bottom: 2%;
}
`