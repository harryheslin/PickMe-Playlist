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
          <Navbar className='navbar-style'  light expand="md">
          <NavbarBrand className='title' href="/">PickMe Playlists</NavbarBrand>  
          </Navbar>
        </Styles>
    )
    
}

const Styles = styled.div`
.title{
  font-size: 180%;
  color: white;
}

.navbar-style{
  background-color: rgb(0, 0, 0, .5);
}
`
