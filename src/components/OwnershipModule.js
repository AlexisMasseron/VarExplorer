import React from 'react';
import { ControlLabel, Button, Col, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

let contract = require('truffle-contract');
let factoryJson = require("../contracts/ProxiesFactory.json");
let Factory = contract(factoryJson);

class OwnershipModule extends React.Component  {

  handleOwnership = event => {
    event.preventDefault();
    let newAddress = this.newOwnerAddress.value;
    let oldAddress = this.props.ownerAddress;
    let bound = this;
    Factory.at(oldAddress).then(function (instance) {
      return instance.ChangedProxyOwner.call(bound.oldAddress, bound.newAddress ).then(function (addr) {
        window.alert("Your address has been changed to: " + bound.newAddress);
      });
    });
  }
  // TODO: set new adress as value 
  render() {
    return (
      <Col sm={10}>
        <FormGroup>
          <ControlLabel>New Address</ControlLabel>
          <FormControl className="formTX" type="text" placeholder="0x52706aa94C13AA7C4568E8E0d367a88AA2CAe103" ref={(input) => { this.newOwnerAddress = input }}/>
          <HelpBlock>If you want to change your contract address, please submit a valid address</HelpBlock>
        </FormGroup>
        <FormGroup >
          <ControlLabel><Button className="ownerButton" type="submit" onClick={(e) => this.handleTx(e)}>Change Owner</Button></ControlLabel>
        </FormGroup>
      </Col>
    )
  }

  static propTypes = {
		ownerAddress: React.PropTypes.string.isRequired,
	};
}
export default OwnershipModule;