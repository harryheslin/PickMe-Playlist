import React from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import styled from 'styled-components'

export default function NavBar(props) {
  return (
    <Styles>
      <Navbar className='navbar-style nav-item:hover' light expand="md">
        <NavbarBrand className='title' href="/">PickMe Playlists</NavbarBrand>
        <img className='logo ml-auto' src='spotifylogo.png' />
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
  background-color: rgb(0, 0, 0 );
}

.navbar-light .navbar-brand:focus, .navbar-light .navbar-brand:hover {
  color: rgba(30, 215, 96);
}

.logo{
  max-width: 3%;
  margin-right: 3%
}
`
