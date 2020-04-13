import React, { Component } from 'react';
import { getPlacesFromAPI } from '../../actions/placesActions';
import { connect } from "react-redux";
import PropTypes from "prop-types";

class TripSelectionCard extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            value: ""
        })
    }

    onClick(tripTypeIdentifier) {
        if (this.state.value === "") {
            window.alert("Please fill the radius!")
        } else {
            this.props.getPlacesFromAPI(tripTypeIdentifier, this.props.props.coords.coords.latitude, this.props.props.coords.coords.longitude, this.state.value, this.props.props.history);
        }
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    render() {
        const { triptype } = this.props;
        return (
            <div className="card" style={{ width: "14,5rem" }}>
                <img className="card-img-top" src={require("../../images/cina.jpg")} alt="Cina"></img>
                <div className="card-body">
                    <h5 className="card-title">{triptype.name}</h5>
                    <p className="card-text">{triptype.description}</p>
                    Choose radius... <input type="number" min="300" value={this.state.value} onChange={this.handleChange.bind(this)} placeholder="300" required /><br /><br />
                    <button className="btn btn-primary" style={{backgroundColor: "#003554"}} onClick={this.onClick.bind(this, triptype.tripTypeIdentifier)} >Show nearby places</button>
                </div>
            </ div>
        )
    }
}

TripSelectionCard.propTypes = {
    places: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    trip: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    places: state.tripType,
    security: state.security,
    trip: state.trip
});

export default connect(
    mapStateToProps,
    { getPlacesFromAPI }
)(TripSelectionCard);