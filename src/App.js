import React, { Component } from 'react';
import Game from './components/Game/Game';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>2048 Clone by Lloyd</h1>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
