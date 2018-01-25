import React from 'react';
import { default as Web3} from 'web3';
import { Alert } from 'react-bootstrap';

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
                            <h2> We have trouble loading your account! </h2>
                        </div>
                        <img className="kitty" alt="FancyKitty"
                            src="https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/459063.png" />
                    </div>
                </div>
            )
        } else if(this.state.localPopUpIsVisible){
            return (
                <div>
                    <div className="alertHeader">
                        <nav>
                            <Alert className="connexionAlert" bsStyle="danger" block>
                                <h4>Impossible to connect to your local node</h4>
                            </Alert>
                        </nav>
                    </div>
                    <div className="connexionBox">
                        <div className="headerConnexion">
                            <h1> Welcome to VarExplorer</h1>
                            <h2> We have trouble loading your account! </h2>
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
                        <h2> We are loading your account, please wait. </h2>
                    </div>
                    <img className="kitty" alt="FancyKitty"
                        src="https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/459063.png" />
                </div>
            )
        }
    }
    static contextTypes = {
        router: React.PropTypes.object
    };
    
};

export default Connexion;

