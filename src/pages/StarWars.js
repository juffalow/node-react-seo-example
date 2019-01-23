import React, { Component } from 'react';
import SEO from 'components/SEO';

class StarWars extends Component {

  state = {
    isLoading: true,
  };

  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      fetch(`https://swapi.co/api/people/${this.props.match.params.id}/`)
        .then(response => response.json())
        .then(data => this.setState(data))
        .then(() => this.setState({ isLoading: false }));
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id === prevProps.match.params.id) {
      return;
    }

    this.setState({ isLoading: true }, () => {
      fetch(`https://swapi.co/api/people/${this.props.match.params.id}/`)
        .then(response => response.json())
        .then(data => this.setState(data))
        .then(() => this.setState({ isLoading: false }));
    });
  }

  renderLoader() {
    return (
      <div>Loading...</div>
    );
  }

  renderDetail() {
    return (
      <SEO title={this.state.name} description={this.state.name}>
        <h1>{this.state.name}</h1>
        <p>Height: {this.state.height}</p>
        <p>Mass: {this.state.mass}</p>
        <p>Skin color: {this.state.skin_color}</p>
      </SEO>
    );
  }
  render() {
    if (this.state.isLoading) {
      return this.renderLoader();
    }
    
    return this.renderDetail();
  }
}

export default StarWars;
