import React, { Component } from 'react'
import TripItem from './trip/TripItem';
import CreateTripButton from './trip/CreateTripButton';
import { connect } from "react-redux";
import { getTrips, getTripsByTripGroupIdentifier } from "../actions/tripActions";
import { getTripGroups } from "../actions/tripGroupActions";
import PropTypes from "prop-types";
import { getTripTypes } from "../actions/tripTypeActions";
import { getUsersLocation } from "../actions/locationActions";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            //isLoading: true,
            data: []
        };
    }

    componentDidMount() {
        if (!this.props.security.validToken) {
            this.props.history.push("/")
        } else {
            this.props.getTrips();
            this.props.getTripGroups();
            this.props.getTripTypes();
            this.props.getUsersLocation();
            console.log(this.props)
            //this.props.getTripsByTripGroups();

            fetch('https://places.sit.ls.hereapi.com/places/v1/discover/explore?apiKey=ty6GaIKaFnt0PLnQivodJThmvmIJ1twrSUI675NnebA&at=50.034309,15.781199&cat=sights-museums')
                .then(response => response.json())
        }
        //.then(json => console.log(json))
        /*fetch('https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyDmo2q7z3voxlodY1OkKSeTTIAJ9vIMrQo')
            .then(response => response.json())
            .then(json => console.log(json))*
        console.log("test")*/
    }

    render() {
        const { trips } = this.props.trip;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Your Trip Dashboard</h1>
                        <br />
                        <CreateTripButton />
                        <br />
                        <hr />
                        {trips.map((trip, index) => (
                            <TripItem key={index} trip={trip} props={this.props} />
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
    coords: state.coords,
    security: state.security
});

export default connect(
    mapStateToProps,
    { getTrips, getTripGroups, getTripTypes, getUsersLocation, getTripsByTripGroupIdentifier }
)(Dashboard);