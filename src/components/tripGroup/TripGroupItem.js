import React, { Component } from 'react';
import {
    Button,
    Row,
    Col
} from "reactstrap";

class TripGroupItem extends Component {
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
                            <Button
                                className="btn-round btn-icon"
                                color="success"
                                outline
                                size="sm"
                            >
                                <i className="fa fa-envelope" />
                            </Button>
                        </Col>
                    </Row>
                </li>
            </div>
        )
    }
}

export default TripGroupItem;
