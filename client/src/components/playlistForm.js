import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Col, Row, Container, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import { useHistory, Redirect } from "react-router-dom"

export default function PlaylistForm(props) {

    const history = useHistory();
    const [newPlaylist, setNewPlaylist] = useState(false);

    useEffect(() => {
        if (newPlaylist) {
            history.push({
                pathname: '/searchpage?token=' + props.token
            });
            history.go(0)
        }
    }, [newPlaylist]);

    const savePlaylist = props.savePlaylist;
    const refresh = props.refresh;
    //Form Components
    const [name, setName] = useState('PickMe Playlist');
    const [description, setDescription] = useState('This playlist was generated using PickMe Playlist');
    const [publicPlaylist, setPublicPlaylist] = useState(false);


    const updatePublic = () => setPublicPlaylist(!publicPlaylist);

    return (
        <Styles>
            <div id='form-div'>
                <Form>
                    <Form.Group>
                        <Col>
                            <Row id="title-row">
                                <h5 id='title'>Customize your playlists details</h5>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label id='label'>Name</Form.Label>
                                    <Form.Control type="text" size='lg' value={name} onChange={(e) => setName(e.target.value)} />
                                    <Form.Label id='label'>Description</Form.Label>
                                    <Form.Control as="textarea" rows={4} size='sm' value={description} onChange={(e) => setDescription(e.target.value)} />
                                </Col>

                            </Row>
                        </Col>
                        <Row>
                            <Col>
                                <Form.Check
                                    type="radio"
                                    label="Public"
                                    className="form-check"
                                    checked={publicPlaylist}
                                    onClick={updatePublic}
                                />
                            </Col>
                        </Row>
                        <Row id='button-row'>
                            <Col>
                                <Button className="main-buttons" onClick={() => savePlaylist(name, description, publicPlaylist)}>Save Playlist</Button>
                            </Col>
                            <Col>
                                <Button className="main-buttons" onClick={() => setNewPlaylist(true)}>New Playlist</Button>

                            </Col>
                        </Row>
                        <Row>
                            <Button id="generate-button" onClick={() => refresh()}>Regenerate Playlist Songs</Button>
                        </Row>
                    </Form.Group>
                </Form>
            </div>
        </Styles>
    )
}

const Styles = styled.div`
   
Form{
    padding-top: 2%;
}

#form-div{
    margin: auto;
}

#title-row{
    background-color: rgba(30, 215, 96);
    border-radius: 20px;
}

#title{
    margin-left: 5%;
    margin-bottom: 3%;
    padding: 10px;
    font-size: clamp(18px, 3vw, 14px);
}

#label{
    margin-top: 3vh;
}

.form-check{
    margin-top: 5%;
    margin-left:5%;
}

.main-buttons{
    margin-top: 3vh;
    font-size: clamp(16px, 2vw, 12px);
    border-color: black;
    width: 100%;
    border: 0em;
}

button{
    margin-top: 15%;
    background-color:black
}

#generate-button:active,
#generate-button:hover,
{
    background-color: black;
    box-shadow: 0 0 0 0.2rem rgba(30, 215, 96, .5);
}

button:focus,
#generate-button:focus
{
    background-color:black;
    box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, .01);
}

.btn-primary:hover,
.btn-primary:not(:disabled):not(.disabled).active, 
.btn-primary:not(:disabled):not(.disabled):active, 
.show>.btn-primary.dropdown-toggle,
.btn-primary:not(:disabled):not(.disabled):active:focus {
    background-color: black;
    border-color: green;
    box-shadow: 0 0 0 0.2rem rgba(30, 215, 96, .5);
}

#button-row{
    margin-right: 5%;
}

#generate-button{
    margin-right: 20px;
    font-size: clamp(12px, 2vw, 10px);
    background-color: black;
    border-color: black;
    width: 93%;
}
`