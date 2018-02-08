import React from 'react';

class CustomHeader extends React.Component { 

  getNetworkName = () => {
    setTimeout(function () {
      window.web3.version.getNetwork(function (err, network) {
        let styleElem = document.head.appendChild(document.createElement("style"));
        if (!err) {
          switch (network) {
            case "1":
              styleElem.innerHTML = ".sync-title:after {content: 'Mainnet'; color: rgb(0, 201, 158);}";
              break
            case "2":
              styleElem.innerHTML = ".sync-title:after {content: 'Morden'; color: rgb(0, 201, 158);}";
              break
            case "3":
              styleElem.innerHTML = ".sync-title:after {content: 'Ropsten'; color: rgb(0, 201, 158);}";
              break
            case "4":
              styleElem.innerHTML = ".sync-title:after {content: 'Ribenky'; color: rgb(0, 201, 158);}";
              break
            case "42":
              styleElem.innerHTML = ".sync-title:after {content: 'Kovan'; color: rgb(0, 201, 158);}";
              break
            default:
              console.log('This is an unknown network.')
          }
        } else
          console.log(err);
      });
      }, 5000);
    }



  componentDidMount = () => {
    this.getNetworkName();
  }

  render () {
    return (
      <header className="window--header">
        <div className="controls">
          <button className="controls--button controls--button__close">
            <a href="/"><svg className="icon" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg></a>
          </button>
          <button className="controls--button controls--button__min">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M19 13H5v-2h14v2z" />
            </svg>
          </button>
          <button className="controls--button controls--button__max">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M7.4 5l11.2 11V5m-2.8 13.8L4.6 7.8v11" />
            </svg>
          </button>
        </div>

        <div className="sync-indicator">
          <h6 id="networkIndic" className="sync-title"></h6>
          <svg className="sync-progress" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none"></circle>
          </svg>
        </div>
      </header>
    )
  }
}

export default CustomHeader;