
import * as React from 'react';
import homepage from './pages/homepage';
import searchpage from './pages/searchpage';
import authed from './pages/authed';
import Errorpage from './pages/errorpage';
import NavBar from './components/navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import styled from 'styled-components'
import generatepage from './pages/generatepage';
import ErrorBoundary from "./errorBoundary";

//Change this variable when undergoing repairs
const maintain = false;

function App() {
  if (maintain) {
    return (
      <Styles>
        <div id='maintain-div'>
          <h1 className='maintain-title'>Sorry!</h1>
          <img src='maintenance.png' alt='maintenance'/>
          <h2 className='maintain-title'>PickMe Playlists is currently offline for scheduled maintenance</h2>
          <h3 className='maintain-title'>Please try again later!</h3>
        </div>
      </Styles>
    )
  }
  return (
    <Styles>
      <Router>
        <NavBar />
        <ErrorBoundary>
          <Switch>
            <Route path="/" exact component={homepage} />
            <Route path="/authed" component={authed} />
            <Route path="/search" component={searchpage} />
            <Route path="/generate" component={generatepage} />
            <Route path="/error" render={() => (<Errorpage message='An application error has occured' />)} />
            <Route path="*" render={() => (<Errorpage message='The requested page does not exist' />)} />
          </Switch>
        </ErrorBoundary>
      </Router>
    </Styles>
  );
}
const Styles = styled.div`

#maintain-div{
  text-align: center;
}

maintain-title{
  padding: 30px;
}`

export default App;
