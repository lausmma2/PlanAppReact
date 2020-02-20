import React, { Component } from 'react'
import TripItem from './trip/TripItem';
import CreateTripButton from './trip/CreateTripButton';
import { connect } from "react-redux";
import { getTrips } from "../actions/tripActions";
import PropTypes from "prop-types";

class Dashboard extends Component {

    componentDidMount() {
        this.props.getTrips();
    }

    render() {
        const { trips } = this.props.trip;
        return (
            <div className="trips">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Your Trips</h1>
                            <br />
                            <CreateTripButton />
                            <br />
                            <hr />
                            {trips.map(trip => (
                                <TripItem key={trip.id} trip={trip} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    trip: PropTypes.object.isRequired,
    getTrips: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    trip: state.trip
});

export default connect(
    mapStateToProps,
    { getTrips }
)(Dashboard);