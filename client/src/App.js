
import { React, useState } from 'react';
import homepage from './pages/homepage';
import searchpage from './pages/searchpage';
import NavBar from './components/navbar'
import SubNavBar from './components/subNavbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from 'styled-components'
import Parampage from './pages/parampage';

function App() {
  return (
    <Styles>
      <Router>
      <NavBar />
        <Switch>
          <Route path="/" exact component={homepage} />
          <Route path="/searchpage" exact component={searchpage} />
          <Route path="/parampage" exact component={Parampage} />
        </Switch>
      </Router>
    </Styles>
  );
}
const Styles = styled.div``

export default App;
