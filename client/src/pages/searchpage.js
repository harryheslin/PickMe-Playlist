import SubNavBar from '../components/subNavbar'
import { React, useState, useEffect } from 'react'
import { Redirect, useLocation } from "react-router-dom"
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import SearchBar from '../components/searchBar';
import ProgressBar from '../components/progressBar';
import ArtistList from '../components/artistList';
import TotalSongsOptions from '../components/totalSongsOptions';
import { Col, Row, Container } from 'react-bootstrap';
import AlertMessage from '../components/alert';
export default function Searchpage(props) {

    const [redirect, setRedirect] = useState(false);
    const [artists, setArtists] = useState([]);
    const [songAmount, setSongAmount] = useState(0);
    const [selectedArtists, setSelectedArtists] = useState();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const location = useLocation();
    //const [totalPercentage, setTotalPercentage] = useState(0);

    let token = location.hash.match(new RegExp("access_token=" + "((.*))" + "&token_type"))[1];

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
            return (
                <Redirect to='/parampage' />
            )
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
                <div className='playlist-controls'>
                    <Container fluid >
                        <Row>
                            <Col auto className='alert-col'>
                                <AlertMessage error={error} errorMessage={errorMessage} setError={setError}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <ProgressBar totalProgress={totalProgress.bind(this)} />
                            </Col>
                            <Col>
                                <h5 id="total-song-heading">Total Songs: </h5>
                            </Col>
                            <Col>
                                <TotalSongsOptions songAmount={songAmount} setSongAmount={setSongAmount} />
                            </Col>
                            <Col>
                                <Button id="generate-button" onClick={() => setRedirect(true)}>Generate Playlist</Button>
                            </Col>
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

  #total-song-heading{
    text-align: right;
    padding-top: 1%;
    padding-right: 5%;
  }

  #generate-button{
    background-color: black;
    height: 110%;
    border-color: black;
    margin-left: 15%;
  }
  
  .artists-list{
    height: 67vh;
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