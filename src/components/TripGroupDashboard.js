import React, { Component } from 'react'
import { connect } from "react-redux";
import { getTrips, getTripsByTripGroupIdentifier } from "../actions/tripActions";
import { getTripGroups } from "../actions/tripGroupActions";
import PropTypes from "prop-types";
import { getTripTypes } from "../actions/tripTypeActions";
import { getUsersLocation } from "../actions/locationActions";
import TripGroupDashboardItem from './TripGroupDashboardItem';
import { getUsersInfo } from "../actions/userActions";

//Expresses trip dashboard inside specific group
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true
        };
    }

    //async function to wait until all trips are loaded
    async getTripByGroupId() {
        await this.props.getTripsByTripGroupIdentifier(this.props.match.params.id, this.props.history);
        this.setState({ isLoading: false })
    }

    componentDidMount() {
        this.getTripByGroupId();
        this.props.getTripGroups();
        this.props.getUsersLocation();
        this.props.getUsersInfo();
    }

    render() {
        const { trips } = this.props.trip;
        const { id } = this.props.match.params;
        return (
            <div className="container">
                {!this.state.isLoading ? (
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">{id} trips dashboard</h1>
                            <hr />
                            {trips.map((trip, index) => (
                                <TripGroupDashboardItem key={index} trip={trip} props={this.props} />
                            ))}
                        </div>
                    </div>
                ) : (
                        <div>Loading...</div>
                    )}

            </div>
        );
    }
}

//Exports range of validators that can be used to make sure the recieved data is valid
Dashboard.propTypes = {
    trip: PropTypes.object.isRequired,
    getTrips: PropTypes.func.isRequired,
    getTripGroups: PropTypes.func.isRequired,
    getTripTypes: PropTypes.func.isRequired,
    coords: PropTypes.object.isRequired,
    getUsersLocation: PropTypes.func.isRequired,
    getTripsByTripGroupIdentifier: PropTypes.func.isRequired
};

//Necessary to connect function... selecting parts of the data from the store that this component needs
const mapStateToProps = state => ({
    trip: state.trip,
    tripGroup: state.tripGroup,
    coords: state.coords
});

export default connect(
    mapStateToProps,
    { getTrips, getTripGroups, getTripTypes, getUsersLocation, getTripsByTripGroupIdentifier, getUsersInfo }
)(Dashboard);