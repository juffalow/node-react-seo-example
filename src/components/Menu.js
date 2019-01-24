import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  MenuItem,
  NavItem,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <Navbar fluid={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">ReactHelmetExample</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem componentClass={Link} href="/" to="/">Home</NavItem>
            <NavItem componentClass={Link} href="/whatever" to="/whatever">Whatever</NavItem>
            <NavDropdown title="StarWars" id="basic-nav-dropdown">
              <MenuItem componentClass={Link} href="/star-wars/1" to="/star-wars/1">Luke Skywalker</MenuItem>
              <MenuItem componentClass={Link} href="/star-wars/2" to="/star-wars/2">C-3PO</MenuItem>
              <MenuItem componentClass={Link} href="/star-wars/3" to="/star-wars/3">R2-D2</MenuItem>
              <MenuItem divider />
              <MenuItem componentClass={Link} href="/star-wars-preloaded/4" to="/star-wars-preloaded/4">Darth Vader</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem componentClass={Link} href="/help" to="/help">Help</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;
