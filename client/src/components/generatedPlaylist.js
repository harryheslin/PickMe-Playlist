import { React, useEffect } from 'react';
import AudioPreview from './audioPreview';
import styled from 'styled-components'
import { Col, Row, Container } from 'react-bootstrap'

export default function generatedPlaylist(props) {
    let playlist = props.playlist.result;
    let first = true;
    //https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    return (
        <Styles>
            <div className="playlist-outside">
                <div className="playlist-inside">
                    <div className="generated-playlist">
                        {playlist.map(x => {
                            if (first) {
                                first = false;
                                return (
                                    < Container >
                                        <Row className="playlist-headings">
                                            <Col xs={5}> <h5>Name</h5>  </Col>
                                            <Col xs={3}> <h5>Artist</h5> </Col>
                                        </Row>
                                        <Row className="playlist-songs">
                                            <Col xs={5}> <h5>{x.name}</h5>  </Col>
                                            <Col xs={3}> <h5>{x.artists[0].name}</h5> </Col>
                                            <Col id='duration'> <h5>{millisToMinutesAndSeconds(x.duration_ms)}</h5> </Col>
                                            <Col  className="song-preview"> <AudioPreview preview={x.preview_url} /></Col>
                                        </Row>
                                    </Container>
                                )
                            }
                            return (
                                < Container >
                                    <Row className="playlist-songs">
                                        <Col xs={5}> <h5>{x.name}</h5>  </Col>
                                        <Col xs={3}> <h5>{x.artists[0].name}</h5> </Col>
                                        <Col id='duration'> <h5>{millisToMinutesAndSeconds(x.duration_ms)}</h5> </Col>
                                        <Col className="song-preview"> <AudioPreview preview={x.preview_url} /></Col>
                                    </Row>
                                </Container>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Styles >
    )

}

const Styles = styled.div`

.playlist-outside{
    background-color: rgba(30, 215, 96) ;
    padding: 0.5%;
    height: 87vh;
    margin: 1%;
    border-radius: 20px;
}
.playlist-inside{
    border-radius: 20px;
    padding: 2%;
    height: 100%;
    background-color: rgba(0, 0, 0 ) ;
}
.playlist-songs{
    color: white;
    padding-top: 1%;
    border-bottom: .5px solid white;
}

h5{
    font-size: clamp(18px, 2vw, 8px);
}

.playlist-headings{
    color: white;
}

.generated-playlist{
    height: 80vh;
    overflow-y:scroll;  
}

#duration{
    padding-left:10%;
}

.song-preview{
    float: right;
}
`