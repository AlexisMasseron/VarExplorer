import React from 'react';
import BigNumber from 'big-number';
import { Form, Panel, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';

let contract = require('truffle-contract');
let json = require("../contracts/ProxiesFactory.json");
let Factory = contract(json);

let json2 = require("../contracts/Proxy.json"); 
let UserProxy = contract(json2);

class ProxyInfo extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      allowance: null,
    };

    this.deployFactory = this.deployFactory.bind(this);
    this.deployUserProxy = this.deployUserProxy.bind(this);
  }

  setContract = (contract, provider) => {
    contract.setProvider(provider.currentProvider);
  }

  deployFactory = () => {
    let metamask = this.props.metamaskAddress;
    let bound = this; // Need to pass the "this" keyword into a variable to be able to access it inside promise scope

      Factory.deployed().then(function (instance) {
        return instance.tradersProxy.call(metamask).then(function (addr) {
          
          bound.setState({
            address: addr.toString(),
          });
        });
      });  
   }

   deployUserProxy = () => {
     let proxyAddress = this.state.address;
     let bound = this;
     UserProxy.at("0x119d45380e2ccd4fddb44c36a51029d307476b8f").then(function (instance) {
       console.log(instance)
       return instance.allowance.call().then(function (res) {
         bound.setState({
           allowance: res.plus(21).toString(10),
         });
       });
     });
   }

  componentDidMount = () => {
    this.setContract(Factory, this.props.provider);
    this.deployFactory();
    this.setContract(UserProxy, this.props.provider);
    this.deployUserProxy();
  }

  render () {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Account {this.state.address} Info </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Form horizontal>
            <FormGroup controlId="formHorizontaladdress">
              <Col componentClass={ControlLabel} sm={2}>
                <ControlLabel>Allowance: {this.state.allowance}</ControlLabel>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontaladdress">
              <Col componentClass={ControlLabel} sm={2}>
                <ControlLabel>VCT balance: {/* Proxy balance */}</ControlLabel>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontaladdress">
              <Col componentClass={ControlLabel} sm={2}>
                <ControlLabel><Button className="ownerButton">Change Owner</Button></ControlLabel>
              </Col>
            </FormGroup>
          </Form>
        </Panel.Body>
      </Panel>
    )
  }
}

export default ProxyInfo;