import React from 'react';
import { Alert } from 'reactstrap';
import styled from 'styled-components'

export default function AlertMessage(props) {
    if (props.error) {
        return (
            <Styles>
                <Alert color="danger" className='alert-bar'>
                    {props.errorMessage}
                </Alert>
            </Styles>
        );
    }
    return (
        <Styles />
    )
        
}
const Styles = styled.div`
.alert-bar{
    
}`

