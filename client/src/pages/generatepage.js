import { Button } from 'react-bootstrap'
import { Redirect, useHistory } from "react-router-dom"
import { React, useEffect, useState } from 'react'
import FetchServer from '../components/fetchServer';
import { Col, Row, Container, Form } from 'react-bootstrap';
import styled from 'styled-components'
import GeneratedPlaylist from '../components/generatedPlaylist';



export default function Parampage(props) {
    const [refresh, setRefresh] = useState(false);
    let token = props.match.params.value;
    const history = useHistory();
    const [serverObject, setServerObject] = useState();
    const [returnObject, setReturnObject] = useState({ result: [] });

    useEffect(() => {
        if (history.location.state.serverObject) {
            setServerObject(history.location.state.serverObject);
            setRefresh(true);
        }
    }, []);

    function updateTracks() {
        FetchServer('playlist', token, serverObject)
            .then((result) => setReturnObject(result))
    }

    // UP TO HERE---------------------------- Need to make a form - Object must contain, name, description, public or private, image as base 64 
    function savePlaylist() {
        FetchServer('save', token)
    }

    if (refresh) {
        updateTracks();
        setRefresh(false);
    }

    if (returnObject.result.length > 0) {
        return (
            <Styles>
                <Container fluid>
                <Row>
                    <Col sm={9}>
                        <GeneratedPlaylist playlist={returnObject} />
                        </Col>
                        <div id='form-div'>
                    <Form>
                        <Col>
                            <Form.Group>
                                <Col>
                                    <Row>
                                        <h5 id='title'>Customize your playlists details</h5>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Label>Image</Form.Label>
                                            <div id='placeholder'></div>
                                            <Form.File id='file-upload' />
                                            <Form.Label id='label'>Name</Form.Label>
                                            <Form.Control type="text" size='lg' placeholder="PickMe Playlist" />
                                            <Form.Label id='label'>Description</Form.Label>
                                            <Form.Control as="textarea" rows={4} size='sm' placeholder="This Playlist was generated using PickMe Playlist" />
                                        </Col>
                                        
                                    </Row>
                                </Col>
                                <Row>
                                    <Col>
                                        <Form.Check
                                            type="radio"
                                            label="Public"
                                            className="form-checks"
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Check
                                            type="radio"
                                            label="Private"
                                            className="form-checks"
                                        />
                                    </Col>
                                </Row>
                                <Row id='button-row'>
                                    <Col>
                                        <Button className="main-buttons" onClick={savePlaylist()}>Save Playlist</Button>
                                    </Col>
                                    <Col>
                                        <Button className="main-buttons" onClick={savePlaylist()}>New Playlist</Button>
                                        
                                    </Col>
                                </Row>
                                <Button id="generate-button" onClick={() => setRefresh(true)}>Regenerate Playlist Songs</Button>
                            </Form.Group>
                        </Col>
                            </Form>
                            </div>
                    </Row>
                    </Container>
            </Styles>
        )
    }
    return (
        <div>
            <h1>Your Playlist is generating...</h1>
        </div>
    )
}
const Styles = styled.div`

    #generate-button{
        margin-right: 20px;
        font-size: clamp(12px, 2vw, 10px);
        background-color: grey;
        border-color: black;
        width: 93%;
    }

    #button-row{
        margin-right: 5%;
    }
    #image-col{
        margin-left: 0%;
    }

    #generate-message{
        margin-top: 8vh;
        margin-left: 1%;
    }

    #placeholder{
        height: 9vw;
        width: 9vW;
        background-color: green;
    }

    #form-div{
        margin: 0 auto;
    }

    #title{
        margin-left: 1%;
        margin-bottom: 3%;
        font-size: clamp(18px, 3vw, 14px);
    }

    #label{
        margin-top: 3vh;
    }

    Form{
        padding-top: 2%;
    }

    .main-buttons{
        margin-top: 3vh;
        font-size: clamp(16px, 2vw, 12px);
        border-color: black;
        width: 100%;
    }

    .form-checks{
        margin-top: 5%;
        margin-left:10%;
    }

    Button{
        margin-top: 15%;
        background-color: black;
    }

    #file-upload{
        padding-top: 5%;
    }
`


