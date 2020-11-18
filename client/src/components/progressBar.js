import React from 'react';
import { Progress } from 'reactstrap';
import styled from 'styled-components'

export default function ProgressBar(props) {
    let data = props.totalProgress();
    let colour = data[0].colour;
    let percentage = data[0].percentage;
    let symbol = data[0].symbol;
    let animated = data[0].animated;
    if (percentage > 0) {
        return (
            <Styles>
                <div className='progress-bar'>
                    <Progress bar animated = {animated} color={colour} min='0' max='100' value={percentage}>{percentage} {symbol}</Progress>
                </div>
            </Styles>
        )
    }
    return (
        <Styles>
            <div className='instructions'>
                <h5>Increase artist percentage with sliders</h5>
            </div>
        </Styles>
    )
}

const Styles = styled.div`
.progress-bar{
    width: 100%;
    margin-left: 1%;
    background-color: white;
}

.instructions{
    margin-left: 2%;
}
`