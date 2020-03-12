import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTrip } from "../../actions/tripActions";

class TripDetail extends Component {

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        const { trip } = this.props.trip;
        return (
            <div style={{ marginLeft: "14%" }}>
                <h1>{trip.name}</h1>
                <h2>{trip.tripIdentifier}</h2>
            </div>
        )
    }
}

TripDetail.propTypes = {
    trip: PropTypes.object.isRequired,
    getTrip: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    trip: state.trip
});

export default connect(
    mapStateToProps,
    { getTrip }
)(TripDetail);