import React, { Component } from 'react';

class AfterRegistrationPage extends Component {
    render() {
        return (
            <div className="landing">
                <div className="light-overlay landing-inner text-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Trip-planning App</h1>
                                <p className="lead">
                                    We've sent you registration confirmation on your registered e-mail. Please confirm your registration.
                        </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default AfterRegistrationPage;