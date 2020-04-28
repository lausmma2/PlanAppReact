import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Component that displays the first page user can see - landing page
class Landing extends Component {

    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard")
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="light-overlay landing-inner text-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Trip-planning App</h1>
                                <p className="lead">
                                    Create your account to join active trips or start your own trips
                        </p>
                                <hr />
                                <Link to="/register" className="btn btn-lg btn-primary mr-2" style={{ backgroundColor: "#003554" }}>
                                    Register
                        </Link>
                                <Link to="/login" className="btn btn-lg btn-secondary mr-2">
                                    Login
                        </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Landing.propTypes = {
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security
});

export default connect(
    mapStateToProps,
    {}
)(Landing);