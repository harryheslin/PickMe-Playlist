import { Button } from 'react-bootstrap'
import { React, useState } from 'react'
import fetchServer from '../components/fetchServer.js';

export default function Homepage() {

    async function HandleSubmit() {
        let redirect = await fetchServer('', '', '');
        window.location = redirect.spotifyauth;

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
