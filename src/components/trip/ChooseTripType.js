import React, { Component } from 'react';
import TripSelectionCard from "../trip/TripSelectionCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTripTypes } from "../../actions/tripTypeActions";
import { getUsersLocation } from "../../actions/locationActions";
import { Link } from "react-router-dom";
import { getTrip } from "../../actions/tripActions";

class ChooseTripType extends Component {

    componentDidMount() {
        if (!this.props.security.validToken) {
            this.props.history.push("/")
        } else {
            this.props.getUsersLocation();

            const { id } = this.props.match.params;
            this.props.getTrip(id, this.props.history);
        }
        console.log(this.props)
    }

    render() {
        const { tripType } = this.props.tripType;
        return (
            <div>
                <div className="card-columns">
                    {tripType.map((triptype, index) => (
                        <TripSelectionCard key={index} triptype={triptype} props={this.props} />
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
    getUsersLocation: PropTypes.func.isRequired,
    trip: PropTypes.object.isRequired,
    getTrip: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    tripType: state.tripType,
    security: state.security,
    coords: state.coords,
    trip: state.trip
});

export default connect(
    mapStateToProps,
    { getTripTypes, getUsersLocation, getTrip }
)(ChooseTripType);