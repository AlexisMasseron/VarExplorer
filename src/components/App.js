import React from 'react';

//COMPONENTS
import CustomHeader from './CustomHeader';
import ProxyInfo from './ProxyInfo';
// import CustomFooter from './CustomFooter';


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
		this.updateProvider(window.web3);
	}

	render() {
		return (
			<div>
				<CustomHeader provider={this.state.provider} />
				<ProxyInfo provider={this.state.provider} metamaskAddress={this.state.metamaskAddress} />
				<img className="mainLogo" alt="Variabl" src="https://variabl.io/assets/images/logo.svg" />
				{/* <CustomFooter/> */}
			</div>
		)
	}

}

export default App;