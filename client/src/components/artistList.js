import { React, useEffect, useState } from 'react';
import PercentageSlider from './percentageSlider'
import styled from 'styled-components'
import { Col, Row, Container } from 'react-bootstrap'

export default function ArtistList(props) {

    let getArtists = props.getArtists();
    let saveArtists = props.saveArtists;
    let colour = ['result-item1', 'result-item2'];

    useEffect(() => {
        let artistsTemp = [];
        let previousArtistsNames = getArtists.map(i => i.name);

        //Checks whether the artist already exists, 
        //ensuring that previous percentage value is used
        props.artists.map((element, index) => {
            if (previousArtistsNames.includes(element.label)) {
                getArtists.map(artist => {
                    if (artist.name == element.label) {
                        artistsTemp.push(artist)
                    }
                })
            }
            else {
                let temp =
                {
                    number: index,
                    name: element.label,
                    image: element.value,
                    percentage: 0
                }
                artistsTemp.push(temp);
            }
        })
        saveArtists(artistsTemp);
    }, [props.artists])



    const updatePercentage = (value, key) => {
        let temp = [...getArtists];
        let artist = key;
        let updatedArtist = {
            number: artist.number,
            name: artist.name,
            image: artist.image,
            percentage: value
        };
        getArtists.map((element, index) => {
            if (element.name == key.name) {
                temp[index] = updatedArtist
            }
            saveArtists(temp);
        })
    }

    return (
        <Styles>
            {getArtists.map((i, index) => {
                return (
                    <div className="artist-list">
                        <Container fluid className={colour[index % 2]}>
                            <Row md={3}>
                                <Col>
                                    <img className='spotify-images' src={i.image} />
                                </Col>
                                <Col className='result-name'>
                                    <h2 key={i} >{i.name}</h2>
                                </Col>
                                <Col className='result-slider'>
                                    <PercentageSlider updatePercentage={updatePercentage.bind(this)} artist={i} />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )
            })}
        </Styles>
    )
}
const Styles = styled.div`

.spotify-images{
    max-width: 20%;
    height: auto;
    border-radius: 50%;
    padding: 1%;
}

.result-item1{
    background-color: rgba(30, 215, 96) ;
    border-radius: 10px;
}

.result-item2{
    background-color: rgb(0, 0, 0 ) ;
    border-radius: 10px;
}

.result-name{
    padding-top: 2%;
    color: white;
}

.result-slider{
    padding-top: 2%;
}

.artist-list {
    margin-bottom: .5%;
    margin-left: 2%;
    margin-right: 2%;
}
`

