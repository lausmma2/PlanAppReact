import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

class Header extends Component {

    logout() {
        this.props.logout();
        window.location.href = "/";
    }
    render() {
        const { validToken, user } = this.props.security;
        const { userData } = this.props.userData;

        const userIsAuthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/dashboard">
                            Dashboard
                        </a>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/user-info" className="nav-link ">
                            <i className="fas fa-user-circle mr-1" />
                            {userData.firstname} {userData.lastname}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/logout" className="nav-link" onClick={this.logout.bind(this)}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        );

        const userIsNotAuthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/register" className="nav-link ">
                            Sign up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        );

        let headerLinks;
        if (validToken && user) { //ještě isConfirmed
            headerLinks = userIsAuthenticated;
        } else {
            headerLinks = userIsNotAuthenticated;
        }

        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                    <div className="container">
                        <Link to="/" className="navbar-brand">
                            PlanApp - Trip planner
            </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                            <span className="navbar-toggler-icon" />
                        </button>
                        {headerLinks}
                    </div>
                </nav>
            </div >
        )
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security: state.security,
    userData: state.userData
})

export default connect(mapStateToProps, { logout })(Header);