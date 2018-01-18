import React from 'react'
import {Form, Button, Col, Panel, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

class TxForm extends React.Component {
    constructor(...args) {
		super(...args);

		this.handleChange = this.handleChange.bind(null);

		this.state = {
			value: ''
		};
	}

	getValidationState() {
		const length = this.state.value.length;
		if (length > 10) return 'success';
		else if (length > 5) return 'warning';
		else if (length > 0) return 'error';
		return null;
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	render() {
		return (
			<Panel >
					<Panel.Heading>
					<Panel.Title componentClass="h3"><p>Send Tokens</p></Panel.Title>
						</Panel.Heading>
						<Panel.Body>
							<Form horizontal>


						<FormGroup controlId="formHorizontaladdress">
							<Col componentClass={ControlLabel} sm={2}>
								<ControlLabel>To Address</ControlLabel>
							</Col>
							<Col sm={10}>
								<FormControl type="text" placeholder="0x52706aa94C13AA7C4568E8E0d367a88AA2CAe103" />
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorizontalamount">
							<Col componentClass={ControlLabel} sm={2}>
								<ControlLabel>Amount to send</ControlLabel>
							</Col>
							<Col sm={10}>
								<FormControl type="Number" placeholder="Amount" />
							</Col>
						</FormGroup>
							<Button className="buttonTX" block>
								Validate transaction
							</Button>
					</Form>
				</Panel.Body>
			</Panel>
		);
	}
}

export default TxForm;