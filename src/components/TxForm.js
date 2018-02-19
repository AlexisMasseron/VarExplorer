import React from 'react'


class TxForm extends React.Component {
    constructor(props) {
		super(props);
		
		this.state = {
			show: false,
			txHash: ''
		}

		this.toggleBack = this.toggleBack.bind(this);
		this.handleTx = this.handleTx.bind(null);
	}

	toWei = eth => {
		let wei = (eth * Math.pow(10, 18));
		return wei;
	}

	toggleBack = event => {
		event.preventDefault();
		let activeSection = document.getElementById("sendTxSection");
		activeSection.style.opacity = 0;
		activeSection.style.transform = "translateY(0)";
		activeSection.style.display = "none";
	}

	handleTx = event => {
		event.preventDefault();
		// let sender = this.props.variablAddress;    => Need to figure out if we send from metamask or Variabl account
		let sender = window.web3.eth.accounts[0];
   		let receiver = this.addressInput.value;
		let amount = this.toWei(this.amountInput.value);
		let bound = this;
		if (receiver.length !== 42) { // Check if receiver's address is well formated (0x + 4O chars)
			window.alert("Please enter a valid address");
			return false;                  // keep form from submitting
		} else if (amount <= 0) { 		   // Prevent from sending null or negative amounts.
			window.alert("Please enter a valid amount to send");
			return false 
		}
		window.web3.eth.sendTransaction({ from: sender, to: receiver, value: amount }, function(err, transactionHash){
			if (!err){
				console.log(transactionHash);
				bound.setState({ 
					txHash: transactionHash 
				});
				document.getElementById('alert').style.display = "block";
			}
			else
				window.alert("Transaction failed: " + err);
				console.log(err);
			} 
		);
	}

	render() {
		return (
			<div>
				<input className="hide" type="checkbox" id="txForm" />
				<section id="sendTxSection" className="section">
					<h1 className="section--title">Send Ether</h1>
					<div className="form--group">
						<strong>Address: </strong>
						<input className="form--input" type="text" placeholder="0x52706aa94C13AA7C4568E8E0d367a88AA2CAe103" ref={(input) => { this.addressInput = input }} />
					</div>
					<div className="form--group">
						<strong>Amount to send: </strong>
						<input className="form--input" type="number" placeholder="Amount" ref={(input) => { this.amountInput = input }}/>
					</div>
					<div id="alert" className="hide"><strong>Tx Hash: </strong><span>{this.state.txHash}</span></div>
					<ul className="finalForm">
						<button className="form--button-tx" type="submit" onClick={(e) => this.handleTx(e)}>Send</button>
						<button className="form--button-tx" type="submit" onClick={(e) => this.toggleBack(e)}>Back</button>
					</ul>
					</section>
			</div>
		);
	}
}

export default TxForm;