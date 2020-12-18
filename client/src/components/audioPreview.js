import { React, useState, useEffect } from 'react';
import play from "./icons/play-button.png";
import pause from "./icons/pause-button.png";
import styled from 'styled-components'

export default function AudioPreview(props) {
    const [audio, setAudio] = useState();

    useEffect(() => {
        setAudio(new Audio(props.preview))
    }, [props])

    const [playing, setPlaying] = useState(false);
 
    const start = () => {
        audio.play();
        setPlaying(true);
        const interval = setTimeout(() => {
            setPlaying(false);
        }, 30000 - (audio.currentTime * 1000))
    }

    const stop = () => {
        audio.pause();
        setPlaying(false);
    }

    return (
        <Styles>
            <img className='icons' src={playing ? pause : play } onClick={playing ? stop : start}></img>
            </Styles>
    )
}

const Styles = styled.div`
.icons{
    width: 2vw;
    min-width: 25px;
    padding-bottom: 2px;
}
`