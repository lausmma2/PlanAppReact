import React, { Component } from 'react';
import { deleteTripGroup } from "../../actions/tripGroupActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

class TripGroupItem extends Component {

    onDeleteClick = id => {
        this.props.deleteTripGroup(id);
    }

    render() {
        const { tripGroup } = this.props
        return (
            <div>
                <li>
                    <Row>
                        <Col md="2" xs="2">
                            <div className="avatar">
                                <img
                                    alt="..."
                                    className="img-circle img-no-padding img-responsive"
                                    src={require("../../images/cina.jpg")}
                                />
                            </div>
                        </Col>
                        <Col md="7" xs="7">
                            {tripGroup.name} <br />
                            <span className="text-muted">
                                <small>{tripGroup.tripGroupIdentifier}</small>
                            </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                            <Link to="/"
                                className="btn btn-circle btn-lg"
                                outline
                                size="sm"
                                title="Edit group"
                            >
                                <i className="far fa-edit" />
                            </Link>
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
            </div>
        )
    }
}

TripGroupItem.propTypes = {
    deleteTrip: PropTypes.func.isRequired
}

export default connect(null, { deleteTripGroup })(TripGroupItem);
