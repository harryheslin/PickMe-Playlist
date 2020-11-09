import React from 'react'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
} from 'reactstrap';
import styled from 'styled-components'
import { Link } from "react-router-dom";

export default function SubNavBar(props) {
    let page = props.code;

    return (
        <Styles>
            <Navbar color="light" light expand="md">
                <Nav className="container-fluid" navbar>
                    <NavbarText className="artist-search">Artist Search </NavbarText>
                    <NavbarText className="center-navbar">Specify Paramaters</NavbarText>
                    <NavbarText className="ml-auto" >Save Playlist</NavbarText>
                </Nav>
            </Navbar>
        </Styles>
    )
}

const Styles = styled.div`
.center-navbar {
    width:30%;
    margin-left: 35%;
  }
  
  .artist-search {
      color: red;
  }`  
