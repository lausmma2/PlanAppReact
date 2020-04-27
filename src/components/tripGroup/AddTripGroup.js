import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createTripGroup } from "../../actions/tripGroupActions";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { getUsersInfo } from "../../actions/userActions";

class AddTripGroup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            tripGroupIdentifier: "",
            description: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (!this.props.security.validToken) {
            this.props.history.push("/")
        } else {
            this.props.getUsersInfo();
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const newTripGroup = {
            name: this.state.name,
            tripGroupIdentifier: this.state.tripGroupIdentifier,
            description: this.state.description
        };
        this.props.createTripGroup(newTripGroup, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="trip">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Trip Group form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.name
                                        })}
                                        placeholder="Trip Group Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.tripGroupIdentifier
                                        })}
                                        placeholder="Unique Trip Group ID"
                                        name="tripGroupIdentifier"
                                        value={this.state.tripGroupIdentifier}
                                        onChange={this.onChange}
                                    />
                                    {errors.tripGroupIdentifier && (
                                        <div className="invalid-feedback">{errors.tripGroupIdentifier}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <textarea
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.description
                                        })}
                                        placeholder="Trip Group Description"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                    >
                                    </textarea>
                                    {errors.description && (
                                        <div className="invalid-feedback">{errors.description}</div>
                                    )}
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                    style={{ backgroundColor: "#003554" }} />
                                <Link to="/groupDashboard"
                                    className="btn btn-primary btn-block btn-success mt-2">
                                    Back
                                    </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddTripGroup.propTypes = {
    createTripGroup: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { createTripGroup, getUsersInfo })
    (AddTripGroup);