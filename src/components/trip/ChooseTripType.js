import React, { Component } from 'react';
import TripSelectionCard from "../trip/TripSelectionCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTripTypes } from "../../actions/tripTypeActions";
import { getUsersLocation } from "../../actions/locationActions";
import { Link } from "react-router-dom";
import { getTrip } from "../../actions/tripActions";
import { getUsersInfo } from "../../actions/userActions";

class ChooseTripType extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isGeoLocationEnabled: false
        })
    }

    componentDidMount() {
        if (!this.props.security.validToken) {
            this.props.history.push("/")
        } else {
            this.props.getUsersLocation();
            this.props.getTripTypes();
            this.props.getUsersInfo();

            const { id } = this.props.match.params;
            this.props.getTrip(id, this.props.history);

            if (this.props.coords.coords !== null) {
                this.setState({
                    isGeoLocationEnabled: true
                })
            } else {
                this.setState({
                    isGeoLocationEnabled: false
                })
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.coords.coords !== this.props.coords.coords) {
            this.setState({
                isGeoLocationEnabled: !this.state.isGeoLocationEnabled
            })
        }
    }

    render() {
        const { tripTypes } = this.props.tripType;
        return (
            <div>
                {!this.state.isGeoLocationEnabled ? (
                    <div>
                        <div className="card-columns">
                            {tripTypes.map((triptype, index) => (
                                <TripSelectionCard key={index} triptype={triptype} props={this.props} />
                            ))}
                        </div>
                        <Link to="/dashboard" className="btn btn-lg btn-success" style={{ width: "31.7%", marginLeft: "0.5%", marginBottom: "0.7%" }}>Back to Dashboard</Link>
                    </div>
                ) : (
                        <div className="container">Please enable your Geo position in browser! <a href="https://nordvpn.com/blog/change-location-google-chrome/">See a Guide for CHROME here</a></div>
                    )}

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
    getTrip: PropTypes.func.isRequired,
    getTripTypes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    tripType: state.tripType,
    security: state.security,
    coords: state.coords,
    trip: state.trip
});

export default connect(
    mapStateToProps,
    { getTripTypes, getUsersLocation, getTrip, getUsersInfo }
)(ChooseTripType);