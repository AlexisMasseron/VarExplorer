import React from 'react';
import { default as Web3} from 'web3';
import { Alert } from 'react-bootstrap';

// let web3 = require('web3')

class Connexion extends React.Component {

    state = {
        popUpVisible: false,
    }

    componentDidMount = () => {
        this.checkProvider();
    }   
    
    checkProvider = () =>{
        let web3;
        let account;
        window.addEventListener('load', function() {
            if (typeof window.web3 !== 'undefined') {
                console.warn("Browser injection detected");
                web3 = new Web3(window.web3.currentProvider); 
                account = web3.eth.accounts[0];
                if (web3.eth.accounts.length === 0) {
                    // throw new Error("Please unlock metamask account");
                    this.setState({
                        popUpVisible: true,
                    });
                }else {
                    // this.context.router.transitionTo(`/acc/${account}`);
                }                
            } else {
                web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
                account = web3.eth.accounts[0];
                console.warn("Local injection detected")
                // this.context.router.transitionTo(`/acc/${account}`);
            }
        }.bind(this));
    }
    
    render() {
        if(this.state.popUpVisible){
            return (
                <div>
                    <div className="alertHeader">
                        <nav>
                            <Alert className="connexionAlert" bsStyle="danger" block>
                                <h4>"Please unlock your metamask account!</h4>
                            </Alert>
                        </nav>
                    </div>
                    <div className="connexionBox">
                        <div className="headerConnexion">
                            <h1> Welcome to VarExplorer</h1>
                        </div>
                        <img className="kitty" alt="FancyKitty"
                            src="https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/459063.png" />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="connexionBox">
                    <div className="headerConnexion">
                        <h1> Welcome to VarExplorer</h1>
                    </div>
                    <img className="kitty" alt="FancyKitty"
                        src="https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/459063.png" />
                </div>
            )
        }
    }
    
};

export default Connexion;

