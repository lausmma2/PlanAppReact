import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux"; // This is going to connect to the state
import { createTrip } from "../../actions/tripActions";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { getUsersInfo } from "../../actions/userActions";

//Component that expresses trip adding form
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

    //when component mounts - this will check if the token is valid or not
    componentDidMount() {
        if (!this.props.security.validToken) {
            this.props.history.push("/")
        } else {
            this.props.getUsersInfo();
        }
    }
    
    //info about errors before getting new props
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    //after form submit - createTrip will be called with specific user's parameters
    onSubmit(e) {
        e.preventDefault();
        const newTrip = {
            name: this.state.name,
            tripIdentifier: this.state.tripIdentifier,
            description: this.state.description
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
//Exports range of validators that can be used to make sure the recieved data is valid
AddTrip.propTypes = {
    createTrip: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
//Necessary to connect function... selecting parts of the data from the store that this component needs
const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { createTrip, getUsersInfo })
    (AddTrip);