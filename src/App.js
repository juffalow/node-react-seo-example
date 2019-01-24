import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Menu from 'components/Menu';
import HomePage from 'pages/Home';
import WhateverPage from 'pages/Whatever';
import HelpPage from 'pages/Help';
import StarWarsPage from 'pages/StarWars';
import StarWarsPreloaded from 'pages/StarWarsPreloaded';

class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Route path="/whatever" component={WhateverPage} />
        <Route path="/help" component={HelpPage} />
        <Route path="/star-wars/:id" component={StarWarsPage} />
        <Route path="/star-wars-preloaded/:id" component={StarWarsPreloaded} />
        <Route path="/" exact component={HomePage} />
      </div>
    );
  }
}

export default App;
