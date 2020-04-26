import React, { Component } from 'react'
import { connect } from "react-redux";
import { getTrips, getTripsByTripGroupIdentifier } from "../actions/tripActions";
import { getTripGroups } from "../actions/tripGroupActions";
import PropTypes from "prop-types";
import { getTripTypes } from "../actions/tripTypeActions";
import { getUsersLocation } from "../actions/locationActions";
import TripGroupDashboardItem from './TripGroupDashboardItem';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            data: []
        };
    }

    componentDidMount() {
        this.props.getTripGroups();
        this.props.getUsersLocation();
        fetch('https://places.sit.ls.hereapi.com/places/v1/discover/explore?apiKey=ty6GaIKaFnt0PLnQivodJThmvmIJ1twrSUI675NnebA&at=50.034309,15.781199&cat=sights-museums')
            .then(response => response.json())
    }

    render() {
        const { trips } = this.props.trip;
        const { id } = this.props.match.params;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">{id} trips dashboard</h1>
                        <hr />
                        {trips.map((trip, index) => (
                            <TripGroupDashboardItem key={index} trip={trip} props={this.props} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    trip: PropTypes.object.isRequired,
    getTrips: PropTypes.func.isRequired,
    getTripGroups: PropTypes.func.isRequired,
    getTripTypes: PropTypes.func.isRequired,
    coords: PropTypes.object.isRequired,
    getUsersLocation: PropTypes.func.isRequired,
    getTripsByTripGroupIdentifier: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    trip: state.trip,
    tripGroup: state.tripGroup,
    coords: state.coords
});

export default connect(
    mapStateToProps,
    { getTrips, getTripGroups, getTripTypes, getUsersLocation, getTripsByTripGroupIdentifier }
)(Dashboard);