import React from 'react';
import { Navbar } from 'react-bootstrap';

class CustomFooter extends React.Component {
 
  render() {
    return(
      <footer>
        <nav >
          <ul className="nav justify-content-end">
            <a href="https://www.facebook.com/bootsnipp"><i className="fa fa-facebook-square fa-3x social"></i></a>
            <a href="https://twitter.com/bootsnipp"><i className="fa fa-twitter-square fa-3x social"></i></a>
            <a href="https://plus.google.com/+Bootsnipp-page"><i className="fa fa-google-plus-square fa-3x social"></i></a>
            <a href="mailto:bootsnipp@gmail.com"><i className="fa fa-envelope-square fa-3x social"></i></a>
          </ul>
        </nav>
      </footer>
    )
  }
}

export default CustomFooter;