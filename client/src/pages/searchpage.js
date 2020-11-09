import SubNavBar from '../components/subNavbar'
import { React, useState, useEffect } from 'react'
import { Redirect, useLocation } from "react-router-dom"
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import SpotifySearch from '../components/spotifySearch';


export default function Searchpage(props) {

    const [redirect, setRedirect] = useState(false);
    const location = useLocation();

    let token = location.hash.match(new RegExp("access_token=" + "((.*))" + "&token_type"))[1];
    if (redirect) {
        return (
            <Redirect to='/parampage' />
        )
    }
    return (
        <Styles>
            <SubNavBar code={1} />
            <h1>Search Page</h1>
            <SpotifySearch token={token} />
            <Button onClick= {() => setRedirect(true)}>Next Page</Button>
        </Styles>
    )


} const Styles = styled.div``