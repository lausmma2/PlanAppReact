import React, { Component } from 'react';
import { getPlacesFromAPI } from '../../actions/placesActions';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllPlacesAfterAdd } from '../../actions/placesDbActions';

//Component that expresses individual trip type items where it is necessary to set radius of nearby places from user's position
class TripSelectionCard extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            value: "",
            isDisabled: true
        })
    }

    componentDidMount() {
        this.setState({
            isDisabled: false
        })
    };

    //when clicking the button => check if the radius is filled 
    //=> if yes => returns all places from developer.here.api and returns all places already stored in db 
    //=> to check how many places are chosen
    onClick(tripTypeIdentifier) {
        if (this.state.value === "" || this.state.value == 0) {
            window.alert("Please fill the radius!")
        } else {
            this.props.getPlacesFromAPI(this.props.props.match.params.id, tripTypeIdentifier, this.props.props.coords.coords.latitude, this.props.props.coords.coords.longitude, this.state.value, this.props.props.history);
            this.props.getAllPlacesAfterAdd(this.props.trip.trip.tripIdentifier)
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
                    Choose radius (m)... <input type="number" min="300" value={this.state.value} onChange={this.handleChange.bind(this)} placeholder="300" required /><br /><br />
                    <button disabled={this.state.isDisabled} className="btn btn-primary" style={{ backgroundColor: "#003554" }} onClick={this.onClick.bind(this, triptype.tripTypeIdentifier)} >Show nearby places</button>
                </div>
            </ div>
        )
    }
}
//Exports range of validators that can be used to make sure the recieved data is valid
TripSelectionCard.propTypes = {
    places: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    trip: PropTypes.object.isRequired,
};

//Necessary to connect function... selecting parts of the data from the store that this component needs
const mapStateToProps = state => ({
    places: state.places,
    security: state.security,
    trip: state.trip
});

export default connect(
    mapStateToProps,
    { getPlacesFromAPI, getAllPlacesAfterAdd }
)(TripSelectionCard);