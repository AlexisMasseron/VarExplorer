import React from 'react';

class OwnershipModule extends React.Component  {

  // handleOwnership = event => {
  //   event.preventDefault();
  //   let newAddress = this.newOwnerAddress.value;
  //   let oldAddress = this.props.ownerAddress;
  //   let bound = this;
  //   Factory.at(oldAddress).then(function (instance) {
  //     return instance.ChangedProxyOwner.call(bound.oldAddress, bound.newAddress ).then(function (addr) {
  //       window.alert("Your address has been changed to: " + bound.newAddress);
  //     });
  //   });
  // }
  // TODO: set new adress as value 
  render() {
    return (
      <div>
        <input className="hide" type="checkbox" id="recoverWallet"/>
        <section className="section">
          <h1 className="section--title">Change your account address</h1>
          <div className="form--group">
            <input className="form--input" type="text" placeholder="0x52706aa94C13AA7C4568E8E0d367a88AA2CAe103" />
          </div>
          <button className="form--button">Change</button>
        </section>
      </div>
    )
  }

  // static propTypes = {
	// 	ownerAddress: React.PropTypes.string.isRequired,
	// };
}
export default OwnershipModule;