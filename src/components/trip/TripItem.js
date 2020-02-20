import React, { Component } from 'react';
import { connect } from "react-redux";

class TripItem extends Component {
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
                        </div>
                        <div className="col-md-4 d-none d-lg-block">
                            <ul className="list-group">
                                <a href="#">
                                    <li className="list-group-item board">
                                        <i className="fa fa-flag-checkered pr-1">Trip Board </i>
                                    </li>
                                </a>
                                <a href="#">
                                    <li className="list-group-item update">
                                        <i className="fa fa-edit pr-1">Update Trip Info</i>
                                    </li>
                                </a>
                                <a href="#">
                                    <li className="list-group-item delete">
                                        <i className="fa fa-minus-circle pr-1">Delete Trip</i>
                                    </li>
                                </a>
                                <a href="#">
                                    <li className="list-group-item">
                                        <i className="fa fa-edit pr-1">Add to group</i>
                                    </li>
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default TripItem;