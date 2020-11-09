import { Button } from 'react-bootstrap'
import { React, useState } from 'react'
import NavBar from '../components/navbar'
import fetchServer from '../components/fetchServer.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";


export default function Homepage() {

    async function HandleSubmit() {
        let url =
            'https://accounts.spotify.com/authorize' +
            '?response_type=token' +
            '&client_id=335c98b88aa9432a964557058c3b2bc6' +
            '&scope=' +
            encodeURIComponent('user-read-private%20user-read-email') +
            '&redirect_uri=' +
            encodeURIComponent('http://localhost:3000/searchpage');
        window.location = url;
    }

    return (
        <div>
            <h1>Spotify Playlist Generator App, Please connect your spotify</h1>
            <Button
                onClick={HandleSubmit}
            >Connect Spotify
        </Button>
        </div>
    )
}
