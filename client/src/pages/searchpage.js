import { React, useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import SearchBar from '../components/searchBar';
import ProgressBar from '../components/progress';
import ArtistList from '../components/artistList';
import TotalSongsOptions from '../components/totalSongs';
import { Col, Row, Container } from 'react-bootstrap';
import AlertMessage from '../components/alert';

let qs = require('qs');

export default function Searchpage(props) {

    const [redirect, setRedirect] = useState(false);
    const [artists, setArtists] = useState([]);
    const [songAmount, setSongAmount] = useState(0);
    const [selectedArtists, setSelectedArtists] = useState();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [serverObject, setServerObject] = useState();
    // let token = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    let token = sessionStorage.getItem('token');
    const history = useHistory();

    useEffect(() => {
        console.log(serverObject)
        if (serverObject !== undefined) {
            history.push({
                pathname: '/generatepage',
                state: {
                    serverObject
                }
            });
        }
    }, [serverObject]);


    const totalPercentage = () => {
        let total = 0;
        artists.map((element) => {
            total += element.percentage;
        })
        return total;
    }

    if (redirect) {
        if (totalPercentage() > 100) {
            setErrorMessage("Please reduce percentage to 100%")
            setError(true);
            setRedirect(false);
        }
        else if (totalPercentage() < 100) {
            setErrorMessage("Please increase percentage to 100%")
            setError(true);
            setRedirect(false);
        }
        else if (songAmount === 0) {
            setErrorMessage("Must select total songs")
            setError(true);
            setRedirect(false);
        }
        else {
            let finalArtists = [...artists].filter(artist => artist.percentage > 0);
            setServerObject({
                totalSongs: songAmount,
                artists: finalArtists
            })
            setRedirect(false);
            // return (
            //     <Redirect to={'/parampage?token=' + token} />
            // )
        }
    }

    const getArtists = () => {
        return artists;
    }

    const totalProgress = () => {
        let total = totalPercentage();
        if (total > 100) {
            return [{
                percentage: 100,
                colour: 'danger',
                symbol: '+',
                animated: false
            }];
        }
        if (total < 100) {
            return [{
                percentage: total,
                colour: 'success',
                symbol: '%',
                animated: false
            }];
        }
        return [{
            percentage: total,
            colour: 'success',
            symbol: '%',
            animated: true
        }];
    }

    if (selectedArtists && [...selectedArtists].length > 0) {
        return (
            <Styles>
                <SearchBar token={token} saveSearchBarArtists={setSelectedArtists} />
                <div className='artists-list'>
                    <ArtistList artists={selectedArtists} saveArtists={setArtists} getArtists={getArtists.bind(this)} />
                </div>
                <div className='justify-content-center'>
                    <Container fluid >
                    <Row>
                        <Col className='alert-col'>
                            <AlertMessage error={error} errorMessage={errorMessage} setError={setError} />
                        </Col>
                    </Row>
                    <Row className='progress-row'>
                        <Col>
                            <ProgressBar totalProgress={totalProgress.bind(this)} />
                            </Col>
                    </Row>
                    <Row className='row justify-content-center'>
                        <TotalSongsOptions id='total-songs' songAmount={songAmount} setSongAmount={setSongAmount} />
                    </Row>
                    <Row>
                        <Button id="generate-button" onClick={() => setRedirect(true)}>Generate Playlist</Button>
                    </Row>
                    </Container>
                </div>
            </Styles>
        )
    }

    if (!selectedArtists && error) {
        setError(false);
    }
    return (
        <Styles>
            <SearchBar token={token} saveSearchBarArtists={setSelectedArtists} />
            <div className='search-prompt'>
                <h1>Search an artist to get started</h1>
            </div>
        </Styles>
    )

} const Styles = styled.div`

.search-prompt{
    margin: auto;
    width: 70%;
    background-color: rgba(30, 215, 96);
    color: white;
    border-radius: 20px;
    margin-top: 2%;
    padding: 20px;
    text-align: center;
  }

  #total-songs{
      width: 60%
      text-align: center;
  }

  #generate-button{
    background-color: black;
    color: white;
    border-color: rgba(30, 215, 96);
    width: 100%;
    margin-top: 3vh;
    margin-left: 2%;
    margin-right:2%;
    margin-bottom: 1%;
    font-size: clamp(25px, 2vw, 30px);
    box-shadow: 0 0 0 0.2rem rgba(30, 215, 96, .5);
    border-radius: 25px;
  }
  
  .artists-list{
    height: calc(var(--vh, 1vh) * 50);
    margin-bottom: calc(var(--vh, 1vh) * 1);
    overflow-y:scroll;
    margin-bottom: 1%;
}

.alert-col{
    margin-left:1%;
    margin-right: 2.2%;
}

.playlist-controls{
    position:absolute;
    width: 100vw;
}

`