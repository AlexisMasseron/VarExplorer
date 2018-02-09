import React from 'react';

class ProxyInfo extends React.Component {
  
  toggleBack = event => {
    event.preventDefault();
    let activeSection = document.getElementById("proxySection");
    if (activeSection.style.display === "none") {
      activeSection.style.display = "block";
    } else {
      activeSection.style.display = "none";
    }
  }

  render () {
    return (
      <div>
        <input className="hide" type="checkbox" id="proxyInfo"/>
        <section className="section" id="proxySection">
          <h1 className="section--title">Account information</h1>

          <p>Quick reminder: The Ethers your are visualizing are linked to your variabl account and not to your metamask account.</p>

          <div className="form--group--2">
            <strong>ETH</strong><span>{this.props.allowance}</span>
          </div>
          <div className="form--group--2">
            <strong>VCT</strong><span>{this.props.balance}</span>
          </div>
          <button type="submit" className="form--button" onClick={(e) => this.toggleBack(e)} >Back</button>
        </section>
      </div>
    )
  }

  static propTypes = {
    allowance: React.PropTypes.string.isRequired,
    balance: React.PropTypes.string.isRequired,
  }; 
}

export default ProxyInfo;