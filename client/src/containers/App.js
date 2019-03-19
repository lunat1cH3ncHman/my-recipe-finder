import React, { Component } from 'react';
import './App.css';
// import '../MyRecipe.css';
import Routes from '../Routes';
import ReactGA from 'react-ga';

function initializeReactGA() {
    ReactGA.initialize('UA-81127558-2');
    ReactGA.set({ anonymizeIp: true });
    ReactGA.pageview('/load');
}

class App extends Component {
  componentDidMount() {
    initializeReactGA();
  }
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
