import React from 'react';
import Header from './Header';
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
	
	updateProvider = (newProvider) => {
		this.setState({
			provider: newProvider,
			metamaskAddress: newProvider.eth.accounts[0],
		});
	}

	componentWillMount = () => {
		this.updateProvider(
			window.web3
		);
	}

	render() {
		return (
			<div>
				<Header provider={this.state.provider} />
				<ProxyInfo provider={this.state.provider} metamaskAddress={this.state.metamaskAddress} />
				<img className="kitty" alt="Variabl" src="https://variabl.io/assets/images/logo.svg" />
			</div>
		)
	}

}

export default App;