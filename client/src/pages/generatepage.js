import { Redirect, useHistory } from "react-router-dom"
import { React, useEffect, useState } from 'react'
import FetchServer from '../components/fetchServer';
import { Col, Row, Container, Form } from 'react-bootstrap';
import styled from 'styled-components'
import GeneratedPlaylist from '../components/generatedPlaylist';
import PlaylistForm from '../components/playlistForm';


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

    function refreshTracks() {
        setRefresh(true);
    }

    function savePlaylist(name, description, publicPlaylist) {
        let playlist = {
            songIds: [...returnObject.result].map(song => (song.id)),
            name: name,
            description: description,
            publicPlaylist: publicPlaylist
        }
        FetchServer('save', token, playlist)
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
                        <Col id='playlist-div'>
                            <GeneratedPlaylist playlist={returnObject} />
                        </Col>
                        <Col xs>
                            <PlaylistForm savePlaylist={savePlaylist} refresh={refreshTracks} token={token} />
                        </Col>
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

    #playlist-div{
        min-width: 70%;
    }

    #generate-message{
        margin-top: 8vh;
        margin-left: 1%;
    }

`


