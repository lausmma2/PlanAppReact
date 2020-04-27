import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTrip } from "../../actions/tripActions";
import WrappedMapDetail from "../../map/MapDetail";
import DataTableDetail from "../DataTableDetail";
import { Row, Col } from "reactstrap";
import { getUsersLocation } from "../../actions/locationActions";
import { getUsersInfo } from "../../actions/userActions";

class TripDetail extends Component {

    componentDidMount() {
        if (!this.props.security.validToken) {
            this.props.history.push("/")
        } else {
            this.props.getUsersLocation();
            this.props.getUsersInfo();
        }
    }

    onClick() {
        this.props.history.push("/dashboard");
    }

    render() {
        return (
            <div className="container">
                <Row top="xs">
                    <Col md={6} xs={12}>
                        <button onClick={this.onClick.bind(this)} className="btn btn-lg btn-success mr-2">Back</button>
                        <WrappedMapDetail
                            googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDmo2q7z3voxlodY1OkKSeTTIAJ9vIMrQo"}
                            loadingElement={<div style={{ height: "100%" }} />}
                            containerElement={<div style={{ height: "80%", width: "90%" }} />}
                            mapElement={<div style={{ minHeight: "200px", height: "118%", width: "110%" }} />}
                            props={this.props}
                        />
                    </Col>

                    <Col md={6} xs={12}>
                        <DataTableDetail props={this.props} />
                    </Col>
                </Row>
            </div >
        )
    }
}

TripDetail.propTypes = {
    trip: PropTypes.object.isRequired,
    getTrip: PropTypes.func.isRequired,
    places: PropTypes.object.isRequired,
    coords: PropTypes.object.isRequired,
    placesFromDb: PropTypes.object.isRequired,
    getUsersLocation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    trip: state.trip,
    places: state.places,
    coords: state.coords,
    placesFromDb: state.placesFromDb,
    security: state.security
});

export default connect(
    mapStateToProps,
    { getTrip, getUsersLocation, getUsersInfo }
)(TripDetail);