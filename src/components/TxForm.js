import React from 'react'


class TxForm extends React.Component {
    // constructor(props) {
	// 	super(props);
		
	// 	this.state = {
	// 		show: false,
	// 		txHash: ''
	// 	}

	// 	this.handleDismiss = this.handleDismiss.bind(this);
	// 	this.handleTx = this.handleTx.bind(null);
	// }

	// toWei = eth => {
	// 	let wei = (eth * Math.pow(10, 18));
	// 	return wei;
	// }

	// handleDismiss() {
	// 	this.setState({ show: false });
	// }

	// handleTx = event => {
	// 	event.preventDefault();
	// 	// let sender = this.props.variablAddress;    => Need to figure out if we send from metamask or Variabl account
	// 	let sender = window.web3.eth.accounts[0];
   	// 	let receiver = this.addressInput.value;
	// 	let amount = this.toWei(this.amountInput.value);
	// 	let bound = this;
	// 	if (receiver.length !== 42) { // Check if receiver's address is well formated (0x + 4O chars)
	// 		window.alert("Please enter a valid address");
	// 		return false;                  // keep form from submitting
	// 	} else if (amount <= 0) { 		   // Prevent from sending null or negative amounts.
	// 		window.alert("Please enter a valid amount to send");
	// 		return false 
	// 	}
	// 	window.web3.eth.sendTransaction({ from: sender, to: receiver, value: amount }, function(err, transactionHash){
	// 		if (!err){
	// 			console.log(transactionHash);
	// 			bound.setState({ 
	// 				show: true,
	// 				txHash: transactionHash 
	// 			});
	// 		}
	// 		else
	// 			window.alert("Transaction failed: " + err);
	// 			console.log(err);
	// 		} 
	// 	);
	// }

	render() {
			return (
				<div>
					<input className="hide" type="checkbox" id="newHost" />
					<section className="section">
						<h1 className="section--title">Send Ether</h1>
						<div className="form--group">
							<input className="form--input" type="text" placeholder="0x52706aa94C13AA7C4568E8E0d367a88AA2CAe103" />
						</div>
						<div className="form--group">
							<input className="form--input" type="Number" placeholder="Amount" />
						</div>
					</section>
				</div>
			);
	}
}

export default TxForm;