import React, { Component } from 'react';
import SEO from 'components/SEO';

class StarWarsPreloaded extends Component {

  constructor(props) {
    super(props);

    const data = (props.hasOwnProperty('staticContext') && typeof props.staticContext !== 'undefined') ? props.staticContext : window.__INITIAL_DATA__;

    this.state = {
      isLoading: !props.hasOwnProperty('staticContext'),
      ...data
    };
  }

  componentDidMount() {
    if (!this.state.name) {
      this.setState({ isLoading: true }, () => {
        fetch(`https://swapi.co/api/people/${this.props.match.params.id}/`)
          .then(response => response.json())
          .then(data => this.setState(data))
          .then(() => this.setState({ isLoading: false }));
      });
    }
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

export default StarWarsPreloaded;
