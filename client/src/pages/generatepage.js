import { Redirect, useHistory } from "react-router-dom"
import { React, useEffect, useState } from 'react'
import FetchServer from '../components/fetchServer';
import { Col, Row, Container, Form } from 'react-bootstrap';
import styled from 'styled-components'
import GeneratedPlaylist from '../components/generatedPlaylist';
import PlaylistForm from '../components/playlistForm';
import AlertMessage from '../components/alert'

export default function GeneratePage(props) {
    const [refresh, setRefresh] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    let token = sessionStorage.getItem('token');
    const history = useHistory();
    const [serverObject, setServerObject] = useState();
    const [returnObject, setReturnObject] = useState({ result: [] });

    //Banner booleans
    const [saved, setSaved] = useState(false);
    const [regenerated, setRegenerated] = useState(false);

    useEffect(() => {
        if (history.location.state.serverObject) {
            setServerObject(history.location.state.serverObject);
            setFirstLoad(true);
        }
    }, []);

    function alertStatus(action) {
        if (!firstLoad && action == 'Regenerate') {
            setRegenerated(true);
            setSaved(false);
        }
        else if (action == 'Save') {
            setSaved(true);
            setRegenerated(false);
        }
    }

    function updateTracks() {
        //Get the object normal here and then filter it down as it gets passed to other components, 
        //e.g. in generated playlist
        if (serverObject) {
            FetchServer('playlist', token, serverObject)
                .then((result) => setReturnObject(result))
                .then(() => (alertStatus('Regenerate')))
        }
    }

    function refreshTracks() {
        setRefresh(true);
        //return (true);
    }

    if (firstLoad) {
        updateTracks();
        setFirstLoad(false);
    }

    if (refresh) {
        setSaved(false);
        updateTracks();
        setRegenerated(false);
        setRefresh(false);
    }

    function savePlaylist(name, description, publicPlaylist) {
        setRegenerated(false);
        setSaved(false);
            let playlist = {
                songIds: [...returnObject.result].map(song => (song.id)),
                name: name,
                description: description,
                publicPlaylist: publicPlaylist
            }
        FetchServer('save', token, playlist)
                .then(() => (alertStatus('Save')))
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
                            <div id='alert-row'>
                                <AlertMessage savedStat={saved} regenerateStat={regenerated} fillerArtists={returnObject.result[0].filler}/>
                            </div>
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

    #alert-row{
        margin-top: 5%;
        margin-left: 5%;
        margin-right: 5%;
    }

    #generate-message{
        margin-top: 8vh;
        margin-left: 1%;
    }

`


