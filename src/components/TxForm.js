import React from 'react'
import { Alert, Form, Button, Col, Panel, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

class TxForm extends React.Component {
    constructor(props) {
		super(props);
		
		this.state = {
			show: false,
			txHash: ''
		}

		this.handleDismiss = this.handleDismiss.bind(this);
		this.handleTx = this.handleTx.bind(null);
	}

	toWei = eth => {
		let wei = (eth * Math.pow(10, 18));
		return wei;
	}

	handleDismiss() {
		this.setState({ show: false });
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
					show: true,
					txHash: transactionHash 
				});
			}
			else
				window.alert("Transaction failed: " + err);
				console.log(err);
			} 
		);
	}

	render() {
		if (this.state.show) {
			return (
				<Panel >
					<Panel.Heading>
						<Panel.Title componentClass="h3"><p>Send ETH</p></Panel.Title>
					</Panel.Heading>
					<Panel.Body>
						<Form horizontal onSubmit={(e) => this.handleTx(e)}>
							<FormGroup controlId="formHorizontaladdress">
								<Col componentClass={ControlLabel} sm={2}>
									<ControlLabel>To Address</ControlLabel>
								</Col>
								<Col sm={10}>
									<FormControl type="text" placeholder="0x52706aa94C13AA7C4568E8E0d367a88AA2CAe103" required inputRef={(input) => { this.addressInput = input }} />
								</Col>
							</FormGroup>

							<FormGroup controlId="formHorizontalamount">
								<Col componentClass={ControlLabel} sm={2}>
									<ControlLabel>Amount to send</ControlLabel>
								</Col>
								<Col sm={10}>
									<FormControl type="Number" step="any" placeholder="Amount" required inputRef={(input) => { this.amountInput = input }} />
									{/* <ControlLabel id="txHashLabel"><p>Transaction hash: {this.state.txHash}</p></ControlLabel> */}
								</Col>
							</FormGroup>
							<Button block className="buttonTX" type="submit">Validate transaction</Button>
							<Alert className="txAlert" bsStyle="success" onDismiss={this.handleDismiss}><strong>Transaction successful!</strong> Tx Hash:{this.state.txHash}</Alert>
						</Form>
					</Panel.Body>
				</Panel>
			)
		}
		return (
			<Panel >
				<Panel.Heading>
					<Panel.Title componentClass="h3"><p><i className="fa fa-paper-plane" aria-hidden="true"></i>  Send ETH</p></Panel.Title>
				</Panel.Heading>
				<Panel.Body>
					<Form horizontal onSubmit={(e) => this.handleTx(e)}>
						<FormGroup controlId="formHorizontaladdress">
							<Col componentClass={ControlLabel} sm={2}>
								<ControlLabel><p>To Address</p></ControlLabel>
							</Col>
							<Col sm={10}>
								<FormControl type="text" placeholder="0x52706aa94C13AA7C4568E8E0d367a88AA2CAe103" required inputRef={(input) => { this.addressInput = input }} />
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorizontalamount">
							<Col componentClass={ControlLabel} sm={2}>
								<ControlLabel><p>Amount to send</p></ControlLabel>
							</Col>
							<Col sm={10}>
								<FormControl type="Number" step="any" placeholder="Amount" required inputRef={(input) => { this.amountInput = input }}/>
							</Col>
						</FormGroup>
						<Button block className="buttonTX" type="submit">Validate transaction</Button>
					</Form>
				</Panel.Body>
			</Panel>
		);
	}

	static propTypes = {
		variablAddress: React.PropTypes.string.isRequired,
	};
}

export default TxForm;