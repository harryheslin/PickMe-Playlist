import React from 'react'
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';
import styled from 'styled-components'

export default function NavBar(props) {
  return (
    <Styles>
      <Navbar className='navbar-style nav-item:hover' light expand="md">
        <NavbarBrand className='title' href="/">PickMe Playlist</NavbarBrand>
        <img className='logo ml-auto' src='spotifylogo.png' alt='Spotify Logo' />
      </Navbar>
    </Styles>
  )
}

const Styles = styled.div`
.title{
  font-size: 160%;
  color: white;
}

.navbar-style{
  background-color: rgb(0, 0, 0 );
}

.navbar-light .navbar-brand:focus, .navbar-light .navbar-brand:hover {
  color: rgba(30, 215, 96);
}

.logo{
  max-width: 50px;
  min-width: 20px;
  margin-right: 3%
}
`
