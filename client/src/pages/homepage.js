import { Button } from 'react-bootstrap'
import { React } from 'react'
import styled from 'styled-components'
import fetchServer from '../components/fetchServer.js';
import { Row } from 'react-bootstrap';

export default function Homepage() {

    async function HandleSubmit() {
        let redirect = await fetchServer('', '', '');
        window.location = redirect.spotifyauth;
    }

    return (
        <Styles>
            <Row>
                <div className='instruction-div'>
                    <img className='numbers' src='number-one.png' alt='Step 1' />
                    <h1>Pick Artists</h1>
                    <h3>Pick up to 20 artists to add to your playlist</h3>
                    <div className='bottom-line'></div>
                </div>
            </Row>
            <Row>
                <div className='instruction-div'>
                    <img className='numbers' src='number-two.png' alt='Step 2' />
                    <h1>Pick Percent</h1>
                    <h3>Choose your playlist size and percentage for each artist</h3>
                    <div className='bottom-line'></div>
                </div>
            </Row>
            <Row>
                <div className='instruction-div'>
                    <img className='numbers' src='number-three.png' alt='Step 3' />
                    <h1>Save Playlist</h1>
                    <h3>Customise playlist details and save to your Spotify account</h3>
                    <div className='bottom-line'></div>
                </div>
            </Row>
            <Row>
                <Button
                    onClick={HandleSubmit}
                >Create a Playlist
                    </Button>
            </Row>
            <Row className='about-row'>
                <p>Github Repository</p>
                <p className='ml-auto'><a href="https://github.com/harryheslin/PickMe-Playlist">hheslin@gmail.com</a></p>
                </Row>
        </Styles>
    )
}

const Styles = styled.div`
    .instruction-div{
        border-radius: 25px;
        text-align: center;
        border-color: black;
        border-width: medium;
        width: 100%;
        margin-top: 2%;
    }

    a{
        color: rgba(30, 190, 96);
    }
    .about-row{
        margin-left: 5%;
        margin-right: 5%;
    }

    .bottom-line{
        background-color: rgba(30, 215, 96);
        height:1vh;
    }
    .numbers{
        max-width: 10%;
    }
    h1{
        font-size: clamp(40px, 5vw, 80px);
        -webkit-text-stroke-width: .5px;
        -webkit-text-stroke-color: white;   
        padding: 3%;
    }

    h3{
        font-size: clamp(20px, 3vw, 40px);
        padding: 3%;
        padding-top: 0%;
    }

    Button, Button:hover, Button:focus, Button:active, .btn-primary:not(:disabled):not(.disabled):active{
        background-color: black;
        color: white;
        border-color: rgba(30, 215, 96);
        width: 100%;
        margin: 5%;
        margin-top:10%;
        font-size: clamp(25px, 2vw, 30px);
        box-shadow: 0 0 0 0.2rem rgba(30, 215, 96);
        border-radius: 25px;
    }
`
