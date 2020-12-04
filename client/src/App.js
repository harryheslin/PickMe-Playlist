
import { React } from 'react';
import homepage from './pages/homepage';
import searchpage from './pages/searchpage';
import NavBar from './components/navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import styled from 'styled-components'
import generatepage from './pages/generatepage';

function App() {
  return (
    <Styles>
      <Router>
      <NavBar />
        <Switch>
          <Route path="/" exact component={homepage} />
          <Route path="/searchpage" component={searchpage} />
          <Route path="/parampage?token:value" component={generatepage} />
        </Switch>
      </Router>
    </Styles>
  );
}
const Styles = styled.div``

export default App;
