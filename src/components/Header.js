import React from 'react';
import { Navbar, Nav, NavItem, } from 'react-bootstrap';

class Header extends React.Component { 

  render () {
    return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">VarExplorer</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem>
              Your address: {this.props.provider.eth.accounts[0]}
            </NavItem>
          </Nav>
        </Navbar>
    )
  }
}

export default Header;