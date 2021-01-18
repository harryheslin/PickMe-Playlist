import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Col, Row, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom"

export default function PlaylistForm(props) {

    const history = useHistory();
    const [newPlaylist, setNewPlaylist] = useState(false);

    useEffect(() => {
        if (newPlaylist) {
            history.push({
                pathname: '/search'
            });
            history.go(0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newPlaylist]);

    const savePlaylist = props.savePlaylist;
    const refresh = props.refresh;

    //Form Components
    const [name, setName] = useState('PickMe Playlist');
    const [description, setDescription] = useState('This playlist was generated using PickMe Playlist');
    const [publicPlaylist, setPublicPlaylist] = useState(false);

    const updatePublic = () => setPublicPlaylist(!publicPlaylist);
    const save = () => { savePlaylist(name, description, publicPlaylist)}
    const regenerate = () => {refresh()}

    return (
        <Styles>
            <div id='form-div'>
                <Form>
                    <Form.Group>
                        <Col>
                            <Row id="title-row">
                                <h5 id='title'>Playlist Details</h5>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label id='label'>Name</Form.Label>
                                    <Form.Control type="text" size='lg' value={name} onChange={(e) => setName(e.target.value)} />
                                    <Form.Label id='label'>Description</Form.Label>
                                    <Form.Control as="textarea" rows={5} size='sm' value={description} onChange={(e) => setDescription(e.target.value)} />
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
                        <Row>
                            <Col>
                                <Button className="main-buttons" onClick={save}>Save Playlist</Button>
                            </Col>
                            <Col>
                                <Button className="main-buttons" onClick={() => setNewPlaylist(true)}>New Playlist</Button>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button id="generate-button" onClick={regenerate}>Regenerate Playlist Songs</Button>
                            </Col>
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
    font-size: clamp(20px, 3vw, 22px);
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
.btn-primary:not(:disabled):not(.disabled).active:focus, 
.show>.btn-primary.dropdown-toggle {
    background-color: black;
    border-color: green;
    box-shadow: 0 0 0 0.2rem rgba(30, 215, 96, .5);
}

#generate-button{
    font-size: clamp(12px, 2vw, 10px);
    background-color: black;
    border-color: black;
    width: 100%;
}
`