import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteTrip, addTripToTripGroup, getTrip, getTripByTripIdentifierAndTripGroupIdentifier } from "../actions/tripActions";
import { getTripGroups } from "../actions/tripGroupActions";
import { getAllPlaces, getAllPlacesByTripIdentifierAndTripGroupIdentifier } from "../actions/placesDbActions";
import { getUsersInfo } from "../actions/userActions";

//Expresses individual trip items in specific group
class TripGroupDashboardItem extends Component {

    constructor() {
        super();
        this.state = ({
            isTripCreator: null
        })
    }

    //Check if the user's username is equal to creator's trip username
    componentDidMount() {
        this.props.getUsersInfo();
        if (this.props.userData.userData.username === this.props.trip.tripCreator) {
            this.setState({
                isTripCreator: true
            })
        } else {
            this.setState({
                isTripCreator: false
            })
        }
    }

    //Clicking on delete button will delete the whole trip
    onDeleteClick = id => {
        this.props.deleteTrip(id);
    };

    //Clicking on detail will display places and map in the specific trip in the group
    onDetailClick = (tripIdentifier, tripGroupIdentifier) => {
        this.props.getTripByTripIdentifierAndTripGroupIdentifier(tripIdentifier, tripGroupIdentifier);
        this.props.getAllPlacesByTripIdentifierAndTripGroupIdentifier(tripIdentifier, tripGroupIdentifier, this.props.props.history);
    }

    render() {
        const { trip } = this.props;
        const { id } = this.props.props.match.params;
        return (
            <div className="container">
                {this.state.isTripCreator ? (
                    <div className="card card-body bg-light mb-4">
                        <div className="row">
                            <div className="col-sm-2">
                                <span className="mx-auto">{trip.tripIdentifier}</span>
                            </div>
                            <div className="col-lg-6 col-md-4 col-sm-2">
                                <h3>{trip.name}</h3>
                                <p>{trip.description}</p>
                                <p>This trip belongs to group with ID: {trip.tripGroup ? "'" + trip.tripGroup.tripGroupIdentifier + "'" : ""}</p>
                            </div>
                            <div className="col-md-4 col-sm-8 col-lg-4 d-lg-block">
                                <ul className="list-group">
                                    <a>
                                        <li className="list-group-item board" onClick={this.onDetailClick.bind(this, trip.tripIdentifier, id)}>
                                            <i className="fas fa-info-circle" style={{ color: "#1C7C54" }}> Trip Detail</i>
                                        </li>
                                    </a>
                                    <li className="list-group-item delete" onClick={this.onDeleteClick.bind(this, trip.tripIdentifier)}>
                                        <span className="fa fa-trash-alt" style={{ color: "red" }} title="Delete Trip"><span style={{ fontFamily: "Times New Roman" }}> Delete Trip</span></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                        <div className="card card-body bg-light mb-4">
                            <div className="row">
                                <div className="col-sm-2">
                                    <span className="mx-auto">{trip.tripIdentifier}</span>
                                </div>
                                <div className="col-lg-6 col-md-4 col-sm-2">
                                    <h3>{trip.name}</h3>
                                    <p>{trip.description}</p>
                                    <p>This trip belongs to group with ID: {trip.tripGroup ? "'" + trip.tripGroup.tripGroupIdentifier + "'" : ""}</p>
                                </div>
                                <div className="col-md-4 col-sm-8 col-lg-4 d-lg-block">
                                    <ul className="list-group">
                                        <a>
                                            <li className="list-group-item board" onClick={this.onDetailClick.bind(this, trip.tripIdentifier, id)}>
                                                <i className="fas fa-info-circle" style={{ color: "#1C7C54" }}> Trip Detail</i>
                                            </li>
                                        </a>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
            </div >
        )
    }
}

//Exports range of validators that can be used to make sure the recieved data is valid
TripGroupDashboardItem.propTypes = {
    security: PropTypes.object.isRequired,
    deleteTrip: PropTypes.func.isRequired,
    tripGroup: PropTypes.object.isRequired,
    getTripGroups: PropTypes.func.isRequired,
    addTripToTripGroup: PropTypes.func.isRequired,
    getTrip: PropTypes.func.isRequired,
    placesFromDb: PropTypes.object.isRequired,
    getTripByTripIdentifierAndTripGroupIdentifier: PropTypes.func.isRequired,
    getAllPlacesByTripIdentifierAndTripGroupIdentifier: PropTypes.func.isRequired
}

//Necessary to connect function... selecting parts of the data from the store that this component needs
const mapStateToProps = state => ({
    security: state.security,
    tripGroup: state.tripGroups,
    placesFromDb: state.placesFromDb,
    userData: state.userData
});

export default connect(mapStateToProps, {
    deleteTrip, getTripGroups, addTripToTripGroup, getTrip, getAllPlaces,
    getTripByTripIdentifierAndTripGroupIdentifier, getAllPlacesByTripIdentifierAndTripGroupIdentifier, getUsersInfo
})(TripGroupDashboardItem);