import React, { Component, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteTrip, addTripToTripGroup, getTrip } from "../../actions/tripActions";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getTripGroups } from "../../actions/tripGroupActions";
import { Link } from "react-router-dom";
import { getAllPlaces } from "../../actions/placesDbActions";

class TripItem extends Component {

    onDeleteClick = id => {
        this.props.deleteTrip(id);
    };

    onDetailClick = id => {
        this.props.getTrip(id);
        this.props.getAllPlaces(id, this.props.props.history);
    }

    render() {
        const { trip } = this.props;
        //console.log(this.props)
        return (
            <div className="container">
                <div className="card card-body bg-light mb-4">
                    <div className="row">
                        <div className="col-sm-2">
                            <span className="card-subtitle mb-2 text-muted">{trip.tripIdentifier}</span>
                        </div>
                        <div className="col-lg-6 col-md-4 col-sm-2">
                            <h3 style={{ fontFamily: "Times New Roman" }}>{trip.name}</h3>
                            <p style={{ fontFamily: "Times New Roman" }}>{trip.description}</p>
                            <p style={{ fontFamily: "Times New Roman" }}>This trip belongs to group with ID: {trip.tripGroup ? "'" + trip.tripGroup.tripGroupIdentifier + "'" : ""}</p>
                        </div>
                        <div className="col-md-4 col-sm-8 col-lg-4 d-lg-block" >
                            <ul className="list-group">
                                <a>
                                    <li className="list-group-item board" onClick={this.onDetailClick.bind(this, trip.tripIdentifier)}>
                                        <span className="fas fa-info-circle" style={{ color: "#1C7C54" }}><span style={{ fontFamily: "Times New Roman" }}> Trip Detail</span></span>
                                    </li>
                                </a>
                                <Link to={`/choose-trip-type/${trip.tripIdentifier}`}>
                                    <li className="list-group-item update">
                                        <span className="fas fa-map-marked-alt" style={{ color: "#324A5F" }} title="Choose places"><span style={{ fontFamily: "Times New Roman" }}> Choose places</span></span>
                                    </li>
                                </Link>
                                <Link to={`/update-trip/${trip.tripIdentifier}`}>
                                    <li className="list-group-item update">
                                        <span className="fas fa-edit" style={{ color: "#0582CA" }} title="Update Trip"><span style={{ fontFamily: "Times New Roman" }}> Edit Trip Info</span></span>
                                    </li>
                                </Link>
                                <li className="list-group-item delete" onClick={this.onDeleteClick.bind(this, trip.tripIdentifier)}>
                                    <span className="fa fa-trash-alt" style={{ color: "red" }} title="Delete Trip"><span style={{ fontFamily: "Times New Roman" }}> Delete Trip</span></span>
                                </li>
                                <a>
                                    <span className="list-group-item update">
                                        <DropdownList props={this.props} />
                                    </span>
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
const DropdownList = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const tripGroups = props.props.tripGroup;
    const trip = props.props;

    const onClick = (tripGroupIdentifier) => {
        props.props.addTripToTripGroup(props.props.trip.tripIdentifier, tripGroupIdentifier);
    }

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                Add Trip to Group
        </DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Select Trip Group</DropdownItem>
                {tripGroups.tripGroups.map((tripGroup, index) => (
                    <DropdownItem key={index} onClick={e => onClick(tripGroup.tripGroupIdentifier)}>{tripGroup.tripGroupIdentifier}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}

TripItem.propTypes = {
    deleteTrip: PropTypes.func.isRequired,
    tripGroup: PropTypes.object.isRequired,
    getTripGroups: PropTypes.func.isRequired,
    addTripToTripGroup: PropTypes.func.isRequired,
    getTrip: PropTypes.func.isRequired,
    placesFromDb: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    tripGroup: state.tripGroups,
    placesFromDb: state.placesFromDb
});

export default connect(mapStateToProps, { deleteTrip, getTripGroups, addTripToTripGroup, getTrip, getAllPlaces })(TripItem);