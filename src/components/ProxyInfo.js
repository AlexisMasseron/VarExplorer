import React from 'react';
import { Form, Panel, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import OwnershipModule from './OwnershipModule';
import TxForm from './TxForm';

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
      name: '',  // Account name
      address: '', // Account address
      allowance: null,
      vctBallance: null,
    };

    this.deployFactory = this.deployFactory.bind(this);
    this.deployUserProxy = this.deployUserProxy.bind(this);
    this.deployVCToken = this.deployVCToken.bind(this);
  }

  setContract = (contract, provider) => {
    contract.setProvider(provider.currentProvider);
  }

  toEth = (wei) => {   // Used to convert Wei to ETH because web3.utils.FromWei() is available only from web3@0.1.X and we are @0.0.7
    let eth = (wei / Math.pow(10, 18)).toFixed(4);
    return eth;
  }

  deployFactory = () => {
    let metamask = this.props.metamaskAddress; // Metamask address
    let bound = this; // Need to pass the "this" keyword into a variable to be able to access it inside promise scope
    Factory.deployed().then(function (instance) {
      return instance.tradersProxy.call(metamask).then(function (addr) {
        if (addr === "0x0000000000000000000000000000000000000000"){
          window.alert("Please use a registered and valid metamask address")
        } else {
          bound.setState({
            address: addr.toString(),
          }); 
          // bound.deployUserProxy(); // Need to be called after to prevent async error such as empty adress in state
          // bound.deployVCToken();
        }
      });
    });
    Factory.deployed().then(function (instance) {     // TODO: link promises 
      return instance.getNickname(metamask).then(function (nick) {
        bound.setState({
          name: nick.toString(),
        });
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
    this.setContract(UserProxy, this.props.provider);
    this.setContract(VCToken, this.props.provider);
    this.deployFactory();
  }

  render () {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3"><p>Welcome {this.state.name} to your Variable account {this.state.address} </p></Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Form >
            <Col componentClass={ControlLabel} sm={6}>
            <FormGroup>
                <ControlLabel><p>Allowance:</p> {this.state.allowance} ETH</ControlLabel>
            </FormGroup>
            <FormGroup>
              <ControlLabel><p>VCT balance:</p> {this.state.vctBallance} VCT</ControlLabel>
            </FormGroup>
            </Col>
            <Col className="rightInfo" componentClass={ControlLabel} sm={6}>
              <OwnershipModule ownerAddress={this.state.address} /> {/*OWNERSHIP COMPONENT */}
            </Col>
         </Form> 
        </Panel.Body>
        <TxForm variablAddress={this.state.address} /> {/*TXFORM COMPONENT*/}
      </Panel>
    )
  }

  static propTypes = {
		provider: React.PropTypes.object.isRequired,
		metamaskAddress: React.PropTypes.string.isRequired,
	};
}

export default ProxyInfo;