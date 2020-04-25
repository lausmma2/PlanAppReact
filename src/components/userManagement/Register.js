import React, { Component } from 'react';
import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class Register extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            password: "",
            confirmPassword: "",
            isConfirmed: "",
            errors: {},
            isLoading: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard")
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    async onSubmit(e) {
        e.preventDefault();
        this.setState({
            isLoading: true
        })
        const newUser = {
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            isConfirmed: ""
        }
        await this.props.createNewUser(newUser, this.props.history);
        this.setState({
            isLoading: false
        })
        /*this.setState({
            isLoading: false
        })*/
        //setTimeout(() => {
        /*this.setState({
            isLoading: false
        })*/
        //}, this.props.createNewUser(newUser, this.props.history)) //2000
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center" style={{ color: "#003554" }}>Registration</h1>
                            <p className="lead text-center">Create your account to get full access to PlanApp</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.firstname
                                        })}
                                        placeholder="Firstname"
                                        name="firstname"
                                        value={this.state.firstname}
                                        onChange={this.onChange}

                                    />
                                    {errors.firstname && (
                                        <div className="invalid-feedback">{errors.firstname}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.lastname
                                        })}
                                        placeholder="Lastname"
                                        name="lastname"
                                        value={this.state.lastname}
                                        onChange={this.onChange}

                                    />
                                    {errors.lastname && (
                                        <div className="invalid-feedback">{errors.lastname}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.username
                                        })}
                                        placeholder="Email Address"
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
                                    <input
                                        type="password"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.confirmPassword
                                        })}
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.onChange}

                                    />
                                    {errors.confirmPassword && (
                                        <div className="invalid-feedback">
                                            {errors.confirmPassword}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" id="termsOfUse" style={{ width: "3%" }} required />
                                    <label htmlFor="termsOfUse">I accept the <a href="https://www.termsfeed.com/blog/sample-terms-of-use-template/">Terms of Use</a> & <a href="https://www.termsfeed.com/blog/sample-terms-of-use-template/">Privacy Policy</a></label>
                                </div>
                                <button type="submit" className="btn btn-info btn-block mt-4" style={{ backgroundColor: "#003554" }} disabled={this.state.isLoading}>
                                    {this.state.isLoading ? "Loading..." : "Odeslat"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security
});
export default connect(
    mapStateToProps,
    { createNewUser }
)(Register);