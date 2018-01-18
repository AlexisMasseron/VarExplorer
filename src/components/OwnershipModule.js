import React from 'react';
import { ControlLabel, Button, Col, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

class OwnershipModule extends React.Component  {

  render() {
    return (
      <Col sm={10}>
        <FormGroup>
          <ControlLabel>New Address</ControlLabel>
          <FormControl type="text" placeholder="0x52706aa94C13AA7C4568E8E0d367a88AA2CAe103" />
          <HelpBlock>If you want to change your contract address, please enter a valid address and validate</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel><Button className="ownerButton" /*onClick={this.handleClick}*/>Change Owner</Button></ControlLabel>
        </FormGroup>
      </Col>
    )
  }
}
export default OwnershipModule;