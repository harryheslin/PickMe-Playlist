import { Redirect, useHistory } from "react-router-dom"
import { React, useEffect, useState } from 'react'
import FetchServer from '../components/fetchServer';
import { Col, Row, Container, Form } from 'react-bootstrap';
import styled from 'styled-components'
import GeneratedPlaylist from '../components/generatedPlaylist';
import PlaylistForm from '../components/playlistForm';
import AlertMessage from '../components/alert'

export default function GeneratePage(props) {
    let token = sessionStorage.getItem('token');

    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const history = useHistory();
    const [serverObject, setServerObject] = useState();
    const [returnObject, setReturnObject] = useState({ result: [] });

    //Alert booleans
    const [saved, setSaved] = useState(false);
    const [saveError, setSaveError] = useState(false);
    const [regenerated, setRegenerated] = useState(false);

    useEffect(() => {
        try {
            if (history.location.state.serverObject) {
                setServerObject(history.location.state.serverObject);
                setFirstLoad(true);
            }
        } catch {
            setError(true);
        }
    }, []);

    useEffect(() => {
        if (error) {
            history.push({
                pathname: '/errorpage'
            });
        }
    }, [error]);


    function alertStatus(action) {
        if (!firstLoad && action == 'Regenerate') {
            setRegenerated(true);
            setSaved(false);
            setSaveError(false);
        }
        else if (action == 'Save') {
            setSaveError(false);
            setSaved(true);
            setRegenerated(false);
        }
        else if (action == 'SaveError') {
            setSaveError(true);
            setSaved(false);
            setRegenerated(false);
        }
    }

    function updateTracks() {
        if (serverObject) {
            FetchServer('playlist', token, serverObject)
                .then((result) => setReturnObject(result))
                .then(() => (alertStatus('Regenerate')))
                .catch((e) => setError(true))
        }
    }

    function refreshTracks() {
        setRefresh(true);
    }

    //First Playlist Render
    if (firstLoad) {
        updateTracks();
        setFirstLoad(false);
    }

    //Subsequent Playlist rerenders
    if (refresh) {
        setSaved(false);
        returnObject.result[0].filler = false;
        updateTracks();
        setRegenerated(false);
        setRefresh(false);
    }

    function savePlaylist(name, description, publicPlaylist) {
        setRegenerated(false);
        setSaved(false);
        console.log(returnObject)
        let playlist = {
            songIds: [...returnObject.result[0].songs].map(song => (song.id)),
            name: name,
            description: description,
            publicPlaylist: publicPlaylist
        }
        FetchServer('save', token, playlist)
            .then(() => (alertStatus('Save')))
            .catch((e) => (alertStatus('SaveError')))
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
                                <AlertMessage saveError={saveError} savedStat={saved} regenerateStat={regenerated} fillerArtists={returnObject.result[0].filler} />
                            </div>
                            <PlaylistForm savePlaylist={savePlaylist} refresh={refreshTracks} token={token} />
                        </Col>
                    </Row>
                </Container>
            </Styles>
        )
    }
    return (
        <Styles>
            <div id='loading-div'>
                <h1>Generating your PickMe Playlist</h1>
                <img src='loading.gif' />
            </div>
        </Styles>
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

    #loading-div{
    text-align: center;
    margin-top: calc(var(--vh, 1vh) * 20)
    }

    #generate-message{
        margin-top: 8vh;
        margin-left: 1%;
    }

`


