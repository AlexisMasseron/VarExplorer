import React from 'react';
import { default as Web3} from 'web3';
import { Alert } from 'react-bootstrap';

import UnlockMeta from './UnlockMeta'

class Connexion extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            metaPopUpIsVisible: false,
            localPopUpIsVisible: false,
            account: String,
        };   
    }

    componentDidMount = () => {
        this.checkProvider();
    }   
    
    checkProvider = () =>{
        let web3;
        window.addEventListener('load', function() {
            if (typeof window.web3 !== 'undefined') {
                console.log("Browser injection detected");
                web3 = new Web3(window.web3.currentProvider);
                this.setState({
                    account: web3.eth.accounts[0],
                }); 
                if (web3.eth.accounts.length === 0) {
                    this.setState({
                        metaPopUpIsVisible: true,
                    });
                }else {
                    this.context.router.transitionTo(`/acc/${this.state.account}`);
                }                
            } else {
                console.log("Local injection detected");
                web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
                if (web3.eth.accounts.length === 0) {
                    this.setState({
                        localPopUpIsVisible: true,
                    });
                } else {
                    this.setState({
                        account: web3.eth.accounts[0],
                    });
                    this.context.router.transitionTo(`/acc/${this.state.account}`);
                }
            }
        }.bind(this));
    }
    
    render() {
        if(this.state.metaPopUpIsVisible){
            return (
                <div>
                    <UnlockMeta/>
                </div>
            )
        } else if(this.state.localPopUpIsVisible){
            return (
                <div>
                    <UnlockLocal/>
                </div>
            )
        } else {
            return (
                <div className="connexionBox">
                    <div className="headerConnexion">
                        <h1> Welcome to VarExplorer</h1>
                        <h2> We are loading your account, please wait. </h2>
                    </div>
                </div>
            )
        }
    }
    static contextTypes = {
        router: React.PropTypes.object
    };
}

export default Connexion;

