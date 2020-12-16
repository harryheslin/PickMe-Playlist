import { Button } from 'react-bootstrap'
import { Redirect, useHistory } from "react-router-dom"
import { React, useEffect, useState } from 'react'
import FetchServer from '../components/fetchServer';
import { Col, Row, Container } from 'react-bootstrap';
import styled from 'styled-components'
import GeneratedPlaylist from '../components/generatedPlaylist';

let qs = require('qs');

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

    if (refresh) {
        updateTracks();
        setRefresh(false);
    }

    if (returnObject.result.length > 0) {
        return (
            <Styles>
                <Row>
                    <Col>
                        <GeneratedPlaylist playlist={returnObject} />
                    </Col>
                    <Col>
                    <Button id="generate-button" onClick={() => setRefresh(true)}>Regenerate</Button>
                    </Col>
                </Row>
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

`


