import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from 'components/Menu';
import HomePage from 'pages/Home';
import WhateverPage from 'pages/Whatever';
import HelpPage from 'pages/Help';
import StarWarsPage from 'pages/StarWars';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu />
          <Route path="/whatever" component={WhateverPage} />
          <Route path="/help" component={HelpPage} />
          <Route path="/star-wars/:id" component={StarWarsPage} />
          <Route path="/" exact component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
