import React, { Component, useState } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteTrip, addTripToTripGroup } from "../../actions/tripActions";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getTripGroups } from "../../actions/tripGroupActions";

class TripItem extends Component {

    onDeleteClick = id => {
        this.props.deleteTrip(id);
    };

    render() {
        const { trip } = this.props;
        return (
            <div className="container">
                <div className="card card-body bg-light mb-3">
                    <div className="row">
                        <div className="col-2">
                            <span className="mx-auto">{trip.tripIdentifier}</span>
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                            <h3>{trip.name}</h3>
                            <p>{trip.description}</p>
                            <p>This trip belongs to group with ID: {trip.tripGroup ? trip.tripGroup.tripGroupIdentifier : ""}</p>
                        </div>
                        <div className="col-md-4 d-none d-lg-block">
                            <ul className="list-group">
                                <a href="#">
                                    <li className="list-group-item board">
                                        <i className="fa fa-flag-checkered pr-1">Trip Detail? </i>
                                    </li>
                                </a>
                                <a href="#">
                                    <li className="list-group-item update">
                                        <i className="fa fa-edit pr-1" title="Update Trip">Update Trip Info</i>
                                    </li>
                                </a>
                                <li className="list-group-item delete" onClick={this.onDeleteClick.bind(this, trip.tripIdentifier)}>
                                    <i className="fa fa-minus-circle pr-1" title="Delete Trip">Delete Trip</i>
                                </li>
                                <a>
                                    <li className="list-group-item update">
                                        <DropdownList props={this.props} />
                                    </li>
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
    const trips = props.props;

    const onClick = (tripGroupIdentifier) => {
        console.log(trips.trip.tripIdentifier + " " + tripGroupIdentifier)
        props.props.addTripToTripGroup(trips.trip.tripIdentifier, tripGroupIdentifier);
    }

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                Add Trip to Group
        </DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Select Trip Group</DropdownItem>
                {tripGroups.tripGroups.map(tripGroup => (
                    <DropdownItem onClick={e => onClick(tripGroup.tripGroupIdentifier)}>{tripGroup.tripGroupIdentifier}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}

TripItem.propTypes = {
    deleteTrip: PropTypes.func.isRequired,
    tripGroup: PropTypes.object.isRequired,
    getTripGroups: PropTypes.func.isRequired,
    addTripToTripGroup: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    tripGroup: state.tripGroups
});

export default connect(mapStateToProps, { deleteTrip, getTripGroups, addTripToTripGroup })(TripItem);