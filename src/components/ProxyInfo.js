import React from 'react';
// import contract from 'truffle-contract';
// import artifactor from 'truffle-artifactor';
import { Form, Panel, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';

let contract = require('truffle-contract');
let json = require("../contracts/ProxiesFactory.json");
let Factory = contract(json);

let json2 = require("../contracts/Proxy.json"); 
let UserProxy = contract(json2);

class ProxyInfo extends React.Component {
  
  state = {
    address: '',
    allowance: Number,
  }

  
  // setContract = ( contract, provider) => {
  //   contract.setProvider(provider.currentProvider);
  // }

  // deployContract = (contract) => {

  //   if(contract === Factory){
  //     contract.at("0x56654cDeD18aB263751ee9403A6CA38d6FAe0edC").then(function (instance) {
  //       return instance.orderbook().then(function (addr) {
  //         this.setState({
  //           address: addr,
  //         });
  //       });
  //     });
      
  //   } else {
  //     contract.at(this.state.address).then(function (instance) {
  //       return instance.allowance().then(function (res) {
  //         this.setState({
  //           allowance: res,
  //         });
  //       });
  //     });
  //   }
  //  }

  componentDidMount = () => {
    // console.log(typeof(Factory), Factory)
    // console.log(window.web3.currentProvider);
    // this.setContract(Factory, this.props.provider);
    // this.deployContract(Factory);
    // this.setContract(UserProxy, this.props.provider);
    // this.deployContract(UserProxy);$
    console.log(Factory);
    Factory.setProvider(this.props.provider.currentProvider);
    console.log(Factory);
    let Metamask = this.props.metamaskAddress;
    console.log(typeof(proxyAddress))

    Factory.at("0x56654cDeD18aB263751ee9403A6CA38d6FAe0edC").then(function (instance) {
      console.log(instance);
      return instance.tradersProxy.call(Metamask).then(function (addr) {
        this.setState({
          address: addr.toString(),
        });
       }); 
    });
    // let proxyAddress = this.state.address;
    // console.log(proxyAddress)
    UserProxy.at(this.state.address).then(function (instance) {
      return instance.allowance().then(function (res) {
        this.setState({
          allowance: res,
        });
      });
    });
  }
  

  // componentDidMount = () => {
  //   artifactor.save(myContract, "../contracts/ProxiesFactory.sol.js").then(function() {
  //     let Factory = contract("../contracts/ProxiesFactory.sol.js");
  //     console.log(Factory)
  //     Factory.setProvider(this.props.provider.currentProvider);
  //     Factory.at("0x56654cDeD18aB263751ee9403A6CA38d6FAe0edC").then(function (instance) {
  //       return instance.orderbook().then(function (addr) {
  //         console.log(addr)
  //       })
  //     })
  //   })
  // }

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
            {/* <FormGroup controlId="formHorizontaladdress">
              <Col componentClass={ControlLabel} sm={2}>
                <ControlLabel><Button className="ownerButton">Change Owner</Button></ControlLabel>
              </Col>
            </FormGroup> */}
          </Form>
        </Panel.Body>
      </Panel>
    )
  }
}

export default ProxyInfo;