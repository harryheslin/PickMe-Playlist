import SubNavBar from '../components/subNavbar'
import { React, useState, useEffect } from 'react'
import { Redirect, useLocation } from "react-router-dom"
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import SpotifySearch from '../components/spotifySearch';


export default function Searchpage(props) {

    const [redirect, setRedirect] = useState(false);
    const [artists, setArtists] = useState([]);
    const location = useLocation();

    let token = location.hash.match(new RegExp("access_token=" + "((.*))" + "&token_type"))[1];

    const saveArtists = (values) => {
        console.log(artists);
        console.log(values);
        setArtists(values);
    }

    const getArtists = () => {
        return artists;
    }

    if (redirect) {
        return (
            <Redirect to='/generate' />
        )
    }
    return (
        <Styles>
            {/* <SubNavBar code={1} /> */}
            <SpotifySearch token={token} saveArtists={saveArtists.bind(this)} getArtists={ getArtists.bind(this) }/>
            {/* <Button onClick= {() => setRedirect(true)}>Generate Playlist</Button> */}
        </Styles>
    )


} const Styles = styled.div``