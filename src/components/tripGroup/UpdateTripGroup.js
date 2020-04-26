import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getTripGroup, createTripGroup } from "../../actions/tripGroupActions";
import { Link } from "react-router-dom";

class UpdateTripGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tripGroupId: "",
            name: "",
            tripGroupIdentifier: "",
            description: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (!this.props.security.validToken) {
            this.props.history.push("/")
        }
        const { id } = this.props.match.params;
        this.props.getTripGroup(id, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        const {
            tripGroupId,
            name,
            tripGroupIdentifier,
            description
        } = nextProps.tripGroup.tripGroup;

        this.setState({
            tripGroupId,
            name,
            tripGroupIdentifier,
            description
        })
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
        const updatedTripGroup = {
            tripGroupId: this.state.tripGroupId,
            name: this.state.name,
            tripGroupIdentifier: this.state.tripGroupIdentifier,
            description: this.state.description
        };
        this.props.createTripGroup(updatedTripGroup, this.props.history);
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="tripGroup">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Update Trip Group form</h5>
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
                                        disabled
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

UpdateTripGroup.propTypes = {
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    tripGroup: PropTypes.object.isRequired,
    getTripGroup: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors,
    tripGroup: state.tripGroups
})

export default connect(
    mapStateToProps,
    { getTripGroup, createTripGroup })
    (UpdateTripGroup);