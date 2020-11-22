import { React, useEffect, useState } from 'react';
import Slider from 'react-rangeslider'
import styled from 'styled-components'
import { Col, Row, Container } from 'react-bootstrap';

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
            <Container>
                <Row>
                    <Col>
                        <h3 className='percentage-text'>{percentage}%</h3>
                    </Col>
                    <Col>
                        <Slider
                            value={percentage}
                            orientation="horizontal"
                            onChange={handleChange}
                            step={5}
                        />
                    </Col>
                </Row>
            </Container>
        </Styles>
    )
}
const Styles = styled.div`

.rangeslider__fill{
    background-color: green
}

.percentage-text {
    color: white;
}
`