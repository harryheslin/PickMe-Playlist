import React from 'react'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
import styled from 'styled-components'

export default function NavBar(props) {
    return (
            <Styles>
          <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Spotify Playlist App</NavbarBrand>  
          </Navbar>
        </Styles>
    )
    
}

const Styles = styled.div``
