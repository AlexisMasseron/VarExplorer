import React from 'react';

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

  toggleBack = event => {
    event.preventDefault();
    let activeSection = document.getElementById("ownerSection");
    activeSection.style.opacity = 0;
    activeSection.style.transform = "translateY(0)";
    activeSection.style.display = "none";
  }

  render() {
    return (
      <div>
        <input className="hide" type="checkbox"/>
        <section id="ownerSection" className="section">
          <h1 className="section--title">Change your account address</h1>
          <div className="form--group">
            <input className="form--input" type="text" placeholder="0x52706aa94C13AA7C4568E8E0d367a88AA2CAe103" />
          </div>
          <ul className="finalForm">
            <button className="form--button-tx">Change</button>
            <button className="form--button-tx" onClick={this.toggleBack}>Back</button>
          </ul>
        </section>
      </div>
    )
  }

  static propTypes = {
		ownerAddress: React.PropTypes.string.isRequired,
	};
}
export default OwnershipModule;