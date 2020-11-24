import { React } from 'react'
import styled from 'styled-components'
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import FetchServer from './fetchServer';

export default function SearchBar(props) {
    const animatedComponents = makeAnimated();

    const loadOptions = async (inputValue, callback) => {
        const artists = await FetchServer('search', props.token, inputValue);
        callback(artists.artists.body.artists.items.map(i => ({ label: i.name, value: i.images[0].url, id: i.id })));
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