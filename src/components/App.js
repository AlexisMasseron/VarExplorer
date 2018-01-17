import React from 'react';
import Header from './Header';
import TxForm from './TxForm';
import ProxyInfo from './ProxyInfo';

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			provider: {},
			metamaskAddress: Number,
			// myContractAddress: '' 
		};
	}
	
	changeProvider = (newProvider) => {
		this.setState({
			provider: newProvider,
			metamaskAddress: newProvider.eth.accounts[0],
		});
	}

	componentWillMount = () => {
		this.changeProvider(
			window.web3
		);
	}

	// myContractAddress = { this.state.myContractAddress }
	render() {
		return (
			<div>
				<Header provider={this.state.provider} />
				<ProxyInfo provider={this.state.provider} metamaskAddress={this.state.metamaskAddress} />
				<TxForm/>
				{/* <img className="kitty" alt="Variabl" src="https://variabl.io/assets/images/logo.svg" /> */}
			</div>
		)
	}

}

export default App;