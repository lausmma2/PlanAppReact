import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../actions/securityActions";
import { Link } from "react-router-dom";

//Expresses login form
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    //check if the token is valid or not
    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard")
        }
    }

    //info about errors before getting new props and if token is valid it will send user to dashboard
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.security.validToken) {
            this.props.history.push("/dashboard");
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    //submitting the form button will send data to backend, verify user and block him or sign him in
    onSubmit(e) {
        e.preventDefault();
        const LoginRequest = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.login(LoginRequest);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center" style={{ color: "#003554" }}>Log In</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.username
                                        })}
                                        placeholder="Email Address (Username)"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChange}
                                    />
                                    {errors.username && (
                                        <div className="invalid-feedback">{errors.username}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.password
                                        })}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <Link to="/register">Don't have an account? Create one!</Link>
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" style={{ backgroundColor: "#003554" }} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//Exports range of validators that can be used to make sure the recieved data is valid
Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}

//Necessary to connect function... selecting parts of the data from the store that this component needs
const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { login }
)(Login);