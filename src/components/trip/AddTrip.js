import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux"; // This is going to connect to the state
import { createTrip } from "../../actions/tripActions";
import classnames from "classnames";
import { Link } from "react-router-dom";

class AddTrip extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            tripIdentifier: "",
            description: "",
            start_date: "",
            end_date: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (!this.props.security.validToken) {
            this.props.history.push("/")
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        const newTrip = {
            name: this.state.name,
            tripIdentifier: this.state.tripIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        };
        this.props.createTrip(newTrip, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="trip">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Trip form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.name
                                        })}
                                        placeholder="Trip to Morava"
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
                                            "is-invalid": errors.tripIdentifier
                                        })}
                                        placeholder="Unique Trip ID - např. 1111, MORAVA, 14.02"
                                        name="tripIdentifier"
                                        value={this.state.tripIdentifier}
                                        onChange={this.onChange}
                                    />
                                    {errors.tripIdentifier && (
                                        <div className="invalid-feedback">{errors.tripIdentifier}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <textarea
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.description
                                        })}
                                        placeholder="Trip Description"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                    >
                                        {errors.description && (
                                            <div className="invalid-feedback">{errors.description}</div>
                                        )}
                                    </textarea>
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="start_date"
                                        value={this.state.start_date}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="end_date"
                                        value={this.state.end_date}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                    style={{ backgroundColor: "#003554" }}
                                />
                                <Link to="/dashboard"
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

AddTrip.propTypes = {
    createTrip: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { createTrip })
    (AddTrip);