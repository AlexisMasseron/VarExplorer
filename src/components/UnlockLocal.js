import React from 'react';
import { Alert } from 'react-bootstrap';
import CustomHeader from './CustomHeader';

class UnlockLocal extends React.Component {

    render() {
        return (
            <div className="window window__osx">
                <CustomHeader />
                <div className="window-content">
                    <div className="welcome-screen">
                        <h2 className="greeting">Please unlock your local wallet</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default UnlockLocal;