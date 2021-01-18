import styled from 'styled-components'
import { Col, Row, Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap'

export default function aboutPage() {
    return (
        <Styles>
            <Container fluid>
                <div id='about-titles'>
                    <h1>PickMe Playlists</h1>
                    <h2>Spotify Playlist Generation Application</h2>
                    <h3>Developer: Harry Heslin</h3>
                </div>
                <Row id='description-row'>
                    <Col sm={7}>
                        <p>Developed as a passion project this website allows for Spotify playlist generation.
                        Users select between 1 to 20 artists and a percentage of
                        which each artist will make up the total album tracks.
                        The user then selects a total amount of songs and a playlist is generated.
                        If less then 10 tracks from a particular artist are requested these are randomly
                        taken from popular tracks. If greater then 10, the tracks are randomly taken from the whole
                        artist catalog. Once the user is satisfied with the playlist it is saved to the users Spotify Account.</p>
                        <br />
                        <br></br>
                        <br></br>
                        <p>The project has been developed with Express, React and NPM.</p>
                        <p>This project complies with the Spotify Developer Terms of Service.</p>
                        <p>Feel free to contact with any discovered bugs: hheslin@gmail.com</p>
                    </Col>
                    <Col id='button-col'>
                    <Button>GitHub Repository</Button>
                    <Button>Create a playlist</Button>
                    </Col>
                </Row>
            </Container>
        </Styles>
    )
}

const Styles = styled.div`

#about-titles {
    text-align: center;
}

#description-row{
    margin-top: 5%;
}
#button-col{
    text-align: center;
}

Button, Button:hover, Button:focus, Button:active, .btn-primary:not(:disabled):not(.disabled):active{
    background-color: black;
    color: white;
    border-color: rgba(30, 215, 96);
    width: 80%;
    margin: 5%;
    font-size: clamp(25px, 2vw, 30px);
    box-shadow: 0 0 0 0.2rem rgba(30, 215, 96);
    border-radius: 25px;
}

`