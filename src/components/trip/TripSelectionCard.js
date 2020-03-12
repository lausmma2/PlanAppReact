import React, { Component } from 'react';
import { getPlacesFromAPI } from '../../actions/placesActions';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class TripSelectionCard extends Component {
    onClick(tripTypeIdentifier) {
        console.log("before")
        this.props.getPlacesFromAPI(tripTypeIdentifier, this.props.props.coords.coords.latitude, this.props.props.coords.coords.longitude);
        console.log("after")
    }

    render() {
        const { triptype } = this.props;
        return (
            <div className="card" style={{ width: "14,5rem" }}>
                <img className="card-img-top" src={require("../../images/cina.jpg")} alt="Cina"></img>
                <div className="card-body">
                    <h5 className="card-title">{triptype.name}</h5>
                    <p className="card-text">{triptype.description}</p>
                    <Link to="/choose-trip" className="btn btn-primary" onClick={this.onClick.bind(this, triptype.tripTypeIdentifier)}>Show nearby places</Link>
                </div>
            </ div>
        )
    }
}

TripSelectionCard.propTypes = {
    places: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    places: state.tripType,
    security: state.security
});

export default connect(
    mapStateToProps,
    { getPlacesFromAPI }
)(TripSelectionCard);