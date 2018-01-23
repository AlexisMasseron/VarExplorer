import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class CustomHeader extends React.Component { 

  render () {
    return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
            <a href="/"><img src="https://image.ibb.co/kVryjG/variabl_Home.png" alt="brandLogo"/>VariablExplorer</a>
            </Navbar.Brand>
          <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem>
                <p>Your metamask address: {this.props.provider.eth.accounts[0]}</p>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    )
  }
}

export default CustomHeader;