import React from 'react';
import { Progress } from 'reactstrap';
import styled from 'styled-components'

export default function ProgressBar(props) {
    let data = props.totalProgress();
    let colour = data[0].colour;
    let percentage = data[0].percentage;
    let symbol = data[0].symbol;
    let animated = data[0].animated;
        return (
            <Styles>
                <div className='progress-bar'>
                    <Progress bar animated = {animated} color={colour} min='0' max='100' value={percentage}>{percentage} {symbol}</Progress>
                </div>
            </Styles>
        )
}

const Styles = styled.div`
.progress-bar{
    width: 100%;
    background-color: white;
    margin-bottom: 1vh;
}
`