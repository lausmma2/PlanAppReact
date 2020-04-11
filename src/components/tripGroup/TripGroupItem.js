import React, { Component } from 'react';
import { deleteTripGroup, getTripGroup } from "../../actions/tripGroupActions";
import { getTripsByTripGroupIdentifier } from "../../actions/tripActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

class TripGroupItem extends Component {

    onDeleteClick = id => {
        this.props.deleteTripGroup(id);
    }

    onEditClick = id => {
        this.props.getTripGroup(id, this.props.props.history);
    }

    onDetailClick = id => {
        this.props.getTripsByTripGroupIdentifier(id, this.props.props.history);
    }

    render() {
        const { tripGroup } = this.props
        return (
            <div>
                <li>
                    <Row>
                        <Col md="2" xs="3">
                            <div className="avatar">
                                <img
                                    alt="..."
                                    className="img-circle img-no-padding img-responsive"
                                    src={require("../../images/cina.jpg")}
                                />
                            </div>
                        </Col>
                        <Col md="5" xs="3">
                            {tripGroup.name} <br />
                            <span className="text-muted">
                                <small>{tripGroup.tripGroupIdentifier}</small>
                            </span>
                        </Col>
                        <Col xs="6" sm="5">
                            <a
                                className="btn btn-circle btn-lg"
                                outline
                                size="md"
                                title="Show trips"
                                onClick={this.onDetailClick.bind(this, tripGroup.tripGroupIdentifier)}

                            >
                                <i className="fas fa-directions" />
                            </a>
                            <a
                                className="btn btn-circle btn-lg"
                                outline
                                size="sm"
                                title="Edit group"
                                onClick={this.onEditClick.bind(this, tripGroup.tripGroupIdentifier)}
                            >
                                <i className="far fa-edit" />
                            </a>
                            <Button
                                className="btn btn-danger btn-circle btn-lg"
                                color="white"
                                outline
                                size="sm"
                                title="Delete group"
                                onClick={this.onDeleteClick.bind(this, tripGroup.tripGroupIdentifier)}
                            >
                                <i className="fa fa-times" />
                            </Button>
                        </Col>
                    </Row>
                </li>
            </div >
        )
    }
}

TripGroupItem.propTypes = {
    security: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    deleteTrip: PropTypes.func.isRequired,
    getTripGroup: PropTypes.func.isRequired,
    getTripsByTripGroupIdentifier: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
})

export default connect(mapStateToProps,
    { deleteTripGroup, getTripGroup, getTripsByTripGroupIdentifier }
)(TripGroupItem);
