import React, { Component } from 'react';
import TripSelectionCard from "../trip/TripSelectionCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTripTypes } from "../../actions/tripTypeActions";
import { getUsersLocation } from "../../actions/locationActions";
import { Link } from "react-router-dom";

class ChooseTripType extends Component {

    componentDidMount() {
        if (!this.props.security.validToken) {
            this.props.history.push("/")
        }
        this.props.getUsersLocation();
    }

    render() {
        const { tripType } = this.props.tripType;
        return (
            <div>
                <div className="card-columns">
                    {tripType.map(triptype => (
                        <TripSelectionCard key={triptype.id} triptype={triptype} props={this.props} />
                    ))}
                </div>
                <Link to="/dashboard" className="btn btn-lg btn-success" style={{ width: "31.7%", marginLeft: "0.5%", marginBottom: "0.7%" }}>Back to Dashboard</Link>
            </div>
        )
    }
}

ChooseTripType.propTypes = {
    tripType: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    coords: PropTypes.object.isRequired,
    getUsersLocation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    tripType: state.tripType,
    security: state.security,
    coords: state.coords
});

export default connect(
    mapStateToProps,
    { getTripTypes, getUsersLocation }
)(ChooseTripType);