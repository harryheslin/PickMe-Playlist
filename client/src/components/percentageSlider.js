import { React, useEffect, useState } from 'react';
import Slider from 'react-rangeslider'
import styled from 'styled-components'

export default function PercentageSlider(props) {
    const [percentage, setPercentage] = useState(0);
    let updatePercentage = props.updatePercentage;
    let artist = props.artist;

    useEffect(() => {
        setPercentage(props.artist.percentage)
    }, [props])

    const handleChange = (value) => {
        setPercentage(value);
        updatePercentage(value, artist);
    }

    return (
        <Styles>
            <Slider
                value={percentage}
                orientation="horizontal"
                onChange={handleChange}
            />
        </Styles>
    )
}
const Styles = styled.div`

.rangeslider__fill{
    background-color: green
}
`