import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getTrip, createTrip } from "../../actions/tripActions";
import { Link } from "react-router-dom";
import { getUsersInfo } from "../../actions/userActions";

class TripUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tripId: "",
            name: "",
            tripIdentifier: "",
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
        this.props.getTrip(id, this.props.history);
        this.props.getUsersInfo();
    }

    componentWillReceiveProps(nextProps) {
        const {
            tripId,
            name,
            tripIdentifier,
            description
        } = nextProps.trip.trip;

        this.setState({
            tripId,
            name,
            tripIdentifier,
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
        const updatedTrip = {
            tripId: this.state.tripId,
            name: this.state.name,
            tripIdentifier: this.state.tripIdentifier,
            description: this.state.description
        };
        this.props.createTrip(updatedTrip, this.props.history);
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="trip">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Update Trip form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.name
                                        })}
                                        placeholder="Trip Name"
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
                                        })}
                                        placeholder="Unique Trip ID"
                                        name="tripIdentifier"
                                        value={this.state.tripIdentifier}
                                        onChange={this.onChange}
                                        disabled
                                    />
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
                                    </textarea>
                                    {errors.description && (
                                        <div className="invalid-feedback">{errors.description}</div>
                                    )}
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                    style={{ backgroundColor: "#003554" }} />
                                <Link to="/dashboard"
                                    className="btn btn-primary btn-block btn-success mt-2"
                                >
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

//Exports range of validators that can be used to make sure the recieved data is valid
TripUpdate.propTypes = {
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    trip: PropTypes.object.isRequired,
    getTrip: PropTypes.func.isRequired
}

//Necessary to connect function... selecting parts of the data from the store that this component needs
const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors,
    trip: state.trip
})

export default connect(
    mapStateToProps,
    { getTrip, createTrip, getUsersInfo })
    (TripUpdate);