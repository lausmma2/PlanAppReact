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
        const { validToken } = this.props.security;
        const { userData } = this.props.userData;
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark mb-5" style={{ backgroundColor: "#003554" }}>
                    <div className="container">
                        <Link to="/" className="navbar-brand" >
                            PlanApp - Trip planner
            </Link>
                        {validToken && userData ?
                            (
                                <div className="navbar-collapse" >
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/">
                                                Dashboard
                        </Link>
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
                            ) : (
                                <div className="navbar-collapse" id="mobile-nav">

                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link to="/register" className="nav-link ">
                                                Register
                        </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/login" className="nav-link">
                                                Login
                        </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
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