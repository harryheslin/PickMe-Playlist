import React, { Component } from 'react';
import styled from 'styled-components'
import { Button } from 'react-bootstrap'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };

        if (this.props.showError === false) {
            this.state.error = null;
            this.state.errorInfo = null;
        }
    }

    componentDidCatch = (error, info) => {
        console.log("Client Side Error");
        this.setState({ error: error, errorInfo: info });
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <Styles>
                    <div id='main-div'>
                        <h1>Uh Oh!</h1>
                        <img src='broken.png' alt='Error Image'/>
                        <h3>A client error has occurred,</h3>
                        <h3>Please return home and try again.</h3>
                        <Button id="home-button" href="/">Home</Button>
                    </div>
                </Styles>
            );
        }
        else {
            return this.props.children;
        }
    }
}

const Styles = styled.div`
    #main-div{
        text-align: center;
    }

    img{
        width: 40vw;
        max-width: 250px;
        padding-bottom: 5%;
    }

    #home-button{
        background-color: black;
        color: white;
        border-color: rgba(30, 215, 96);
        width: 40%;
        margin-top: 5vh;
        margin-left: 2%;
        margin-right:2%;
        margin-bottom: 1%;
        font-size: clamp(25px, 2vw, 30px);
        box-shadow: 0 0 0 0.2rem rgba(30, 215, 96, .5);
        border-radius: 25px;
      }
`
export default ErrorBoundary;