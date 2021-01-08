import React from 'react';
import { Alert } from 'reactstrap';
import styled from 'styled-components'

export default function AlertMessage(props) {

    const messages = {
        error: props.errorMessage,
        saved: 'Your Playlist has been succesfully saved to your Spotify account',
        regenerate: 'Your playlist has been regenerated with new tracks',
        filler: 'Sorry! Some artists did not have enough songs to meet your request, these spaces have been filled with songs by similar artists'
    }

    let returnColour = '';
    let returnMessage = '';

    if (props.error) {
        returnMessage = messages.error;
        returnColour = 'danger'
    } else if (props.savedStat) {
        returnMessage = messages.saved;
        returnColour = 'success'
    } else if (props.regenerateStat) {
        returnMessage = messages.regenerate;
        returnColour = 'success'
    } else if (props.fillerArtists) {
        returnMessage = messages.filler;
        returnColour = 'warning'
    }
    if (returnMessage != '') {
        return (
            <Styles>
                <Alert color={returnColour} className='alert-bar'>
                    {returnMessage}
                </Alert>
            </Styles>
        )
    }
    else {
        return (
            <Styles>
            </Styles>
        )
    }
}
const Styles = styled.div`
.alert-bar{
    
}`

