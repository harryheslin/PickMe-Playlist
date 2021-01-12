
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


function App() {
  return (
    <Styles>
      <Router>
        <NavBar />
        <ErrorBoundary>
        <Switch>
          <Route path="/" exact component={homepage} />
          <Route path="/authed" exact component={authed} />
          <Route path="/searchpage" component={searchpage} />
          <Route path="/generatepage" component={generatepage} />
          <Route path="/errorpage" render={() => (<Errorpage message='An application error has occured'/>)} />
          <Route path="*" render={() => (<Errorpage message='The requested page does not exist'/>)} />
        </Switch>
        </ErrorBoundary>
      </Router>
    </Styles>
  );
}
const Styles = styled.div``

export default App;
