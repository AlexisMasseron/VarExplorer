import React from 'react';
import { Form, Panel, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';

let contract = require('truffle-contract');
let factoryJson = require("../contracts/ProxiesFactory.json");
let Factory = contract(factoryJson);

let proxyJson = require("../contracts/Proxy.json"); 
let UserProxy = contract(proxyJson);

let vctokenJson = require("../contracts/VCToken.json");
let VCToken = contract(vctokenJson);

class ProxyInfo extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      allowance: null,
      vctBallance: null,
    };

    this.deployFactory = this.deployFactory.bind(this);
    this.deployUserProxy = this.deployUserProxy.bind(this);
  }

  setContract = (contract, provider) => {
    contract.setProvider(provider.currentProvider);
  }

  toEth = (wei) => {   // Used to convert Wei to ETH because web3.utils.FromWei() is available only from web3@0.1.X
    let eth = (wei / Math.pow(10, 18)).toFixed(3);
    return eth;
  }

  // handleClick = () => {
  //   let proxyAddress = this.state.address;
  //   let bound = this;
  //    Factory.deployed().then(function (instance) {
  //      return instance.ChangedProxyOwner.call(proxyAddress, ).then(function (addr) {
  //     });
  //   });  
  // }

  deployFactory = () => {
    let metamask = this.props.metamaskAddress; // Metamask address
    let bound = this; // Need to pass the "this" keyword into a variable to be able to access it inside promise scope
    Factory.deployed().then(function (instance) {
      return instance.tradersProxy.call(metamask).then(function (addr) {
        bound.setState({
          address: addr.toString(),
        });
        bound.deployUserProxy(); // Need to be called after here to prevent async error such as empty adress in state
        bound.deployVCToken();
      });
    });  
  }

  deployUserProxy = () => {
    let proxyAddress = this.state.address; // User account address
    let bound = this;
    UserProxy.at(proxyAddress).then(function (instance) {
      return instance.allowance.call().then(function (res) {
        bound.setState({
          allowance: bound.toEth(res).toString(10),  // return user's allowance
        });
      });
    });
  }

  deployVCToken = () => {
    let proxyAddress = this.state.address; 
    let bound = this;
    VCToken.deployed().then(function (instance) {
      return instance.balanceOf(proxyAddress).then(function (res) {
        bound.setState({
          vctBallance: (res/10e17).toFixed(3).toString(10),   // return user's vct ballance
        });
      });
    });
  }

  componentDidMount = () => {
    this.setContract(Factory, this.props.provider);
    this.deployFactory();
    this.setContract(UserProxy, this.props.provider);
    this.setContract(VCToken, this.props.provider);
  }

  render () {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Variable account {this.state.address} Info </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Form horizontal>
            <FormGroup controlId="formHorizontallowance">
              <Col componentClass={ControlLabel} sm={2}>
                <ControlLabel>Allowance: {this.state.allowance} ETH</ControlLabel>
              </Col>
              <Col componentClass={ControlLabel} sm={8}>
                <ControlLabel><Button className="ownerButton" /*onClick={this.handleClick}*/>Change Owner</Button></ControlLabel>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalBallance">
              <Col componentClass={ControlLabel} sm={2}>
                <ControlLabel>VCT balance: {this.state.vctBallance} VCT</ControlLabel>
              </Col>
            </FormGroup>
          </Form>
        </Panel.Body>
      </Panel>
    )
  }
}

export default ProxyInfo;