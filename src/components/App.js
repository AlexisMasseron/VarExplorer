import React from 'react';

//COMPONENTS
import CustomHeader from './CustomHeader';
import ProxyInfo from './ProxyInfo';
import OwnershipModule from './OwnershipModule';
import TxForm from './TxForm';
// import CustomFooter from './CustomFooter';

let contract = require('truffle-contract');
let factoryJson = require("../contracts/ProxiesFactory.json");
let Factory = contract(factoryJson);

let proxyJson = require("../contracts/Proxy.json");
let UserProxy = contract(proxyJson);

let vctokenJson = require("../contracts/VCToken.json");
let VCToken = contract(vctokenJson);

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			provider: {},
			metamaskAddress: Number,
			name: '',  // Account name
			address: '', // Account address
			allowance: null,
			vctBalance: null,
		};

		this.deployFactory = this.deployFactory.bind(this);
		this.deployUserProxy = this.deployUserProxy.bind(this);
		this.deployVCToken = this.deployVCToken.bind(this);
	}
	
	updateProvider = (newProvider) => {
		this.setState({
			provider: newProvider,
			metamaskAddress: newProvider.eth.accounts[0],
		});
	}


	setContract = (contract, provider) => {
		contract.setProvider(provider.currentProvider);
	}

	toEth = (wei) => {   // Used to convert Wei to ETH because web3.utils.FromWei() is available only from web3@0.1.X and we are @0.0.7
		return (wei / Math.pow(10, 18)).toFixed(4);
	}

	deployFactory = () => {
		let metamask = this.state.metamaskAddress; // Metamask address
		let bound = this; // Need to pass the "this" keyword into a variable to be able to access it inside promise scope
		Factory.deployed().then(function (instance) {
			return instance.tradersProxy.call(metamask).then(function (addr) {
				if (addr === "0x0000000000000000000000000000000000000000") {
					window.alert("Please use a registered and valid metamask address")
				} else {
					bound.setState({
						address: addr.toString(),  
					});
					bound.deployUserProxy(); // Need to be called after to prevent async error such as empty adress in state
					bound.deployVCToken();
				}
			});
		});
		Factory.deployed().then(function (instance) {     // TODO: link promises 
			return instance.getNickname(metamask).then(function (nick) {
				bound.setState({
					name: nick.toString(),
				});
			});
		});
	}

	deployUserProxy = () => {
		let proxyAddress = this.state.address; // User account address
		let bound = this;
		UserProxy.at(proxyAddress).then(function (instance) {
			return instance.allowance.call().then(function (res) {
				bound.setState({
					allowance: bound.toEth(res).toString(10),  // return user's allowance
				});
			});
		});
	}

	deployVCToken = () => {
		let proxyAddress = this.state.address;
		let bound = this;
		VCToken.deployed().then(function (instance) {
			return instance.balanceOf(proxyAddress).then(function (res) {
				bound.setState({
					vctBalance: (res / 10e17).toFixed(3).toString(10),   // return user's vct ballance
				});
			});
		});
	}

	

	componentWillMount = () => {
		this.updateProvider(window.web3);
	}

	componentDidMount = () => {
		this.setContract(Factory, this.state.provider);
		this.setContract(UserProxy, this.state.provider);
		this.setContract(VCToken, this.state.provider);
		this.deployFactory();
	}

	toggleIn = (event) => {
		// event.preventDefault();
		let targetSection = document.getElementById(event.target.id) 
		if (targetSection === document.getElementById("proxySection")) {
			if (targetSection.style.display === "none") {
			targetSection.style.display = "flex";
			} else {
				targetSection.style.display = "none";
			}
		} else if (targetSection=== "txForm") {
			if (targetSection.style.display === "none") {
				targetSection.style.display = "flex";
			} else {
				targetSection.style.display = "none";
			}
		} else {
			if (targetSection.style.display === "none") {
				targetSection.style.display = "flex";
			} else {
				targetSection.style.display = "none";
			}
		}
		// if (targetSection.style.display === "none") {
		// 	targetSection.style.display = "flex";
		// } else {
		// 	targetSection.style.display = "none";
		// }
	}


	render() {
		return (
			<div className="window window__osx">
				<CustomHeader/>
				<div className="window-content">
					{/* <div className="form--group" >
						<span>Variabl</span><img className="brandLogo" src="https://image.ibb.co/kVryjG/variabl_Home.png" alt="brandLogo" /><span>Explorer</span>
					</div> */}
					<OwnershipModule ownerAddress={this.state.address}/>
					<TxForm/>
					<ProxyInfo allowance={this.state.allowance} balance={this.state.vctBalance}/>
						<div className="welcome-screen">
						<section className="customTrigger">
							<input className="hide" type="checkbox" id="mainPage" />
						</section>
						<h2 className="greeting">Welcome {this.state.name}! to your Variabl account: {this.state.address}</h2>
							<ul className="options">
							{/* TODO: Passer arguments aux event handlers */}
								<li className="option">
								<label htmlFor="ownershipModule"></label>
									<div className="option--icon">
										<svg viewBox="0 0 24 24">
											<path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
										</svg>
									</div>
									<h4 className="option--title">Change your account address.</h4>
								</li>


								<li className="option">
								<label id="proxySection" onClick={ this.toggleIn}></label>
									<div className="option--icon">
										<svg viewBox="0 0 24 24">
											<path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
										</svg>
									</div>
									<h4 className="option--title">Visualize your account balance.</h4>
								</li>



								<li className="option">
									<label htmlFor="txForm"></label>
									<div className="option--icon">
										<svg viewBox="0 0 24 24">
											<path d="M19.35 10.04C18.67 6.6 15.65 4 12 4 9.1 4 6.6 5.64 5.35 8.04 2.35 8.36 0 10.9 0 14c0 3.3 2.7 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.2 0-4-1.8-4-4s1.8-4 4-4h.7c.68-2.3 2.8-4 5.3-4 3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z" />
										</svg>
									</div>
									<h4 className="option--title">Transfert Ether to another account.</h4>
								</li>

							</ul>
						</div>
				</div>
			</div>
		)
	}

}

export default App;