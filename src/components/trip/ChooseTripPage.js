import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPlacesFromAPI } from "../../actions/placesActions";
import WrappedMap from "../../map/Map";
import TablePage from '../DataTablePage';
import { getUsersLocation } from "../../actions/locationActions";
import { Row, Col } from "reactstrap";
import { getUsersInfo } from "../../actions/userActions";

//Page where is the map and table - user can choose places here
class ChooseTripPage extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isLoading: true
        })
    }

    //if token is not valid... push user to "/" page
    componentDidMount() {
        if (!this.props.security.validToken) {
            this.props.history.push("/")
        }
        this.props.getUsersLocation();
        this.props.getUsersInfo();
        this.getPlaces();
    }

    //async method to get places from developer.here.api
    async getPlaces() {
        await this.props.getPlacesFromAPI(this.props.match.params.tripId, this.props.match.params.id, this.props.match.params.lat, this.props.match.params.lng, this.props.match.params.rad, this.props.history);
        this.setState({ isLoading: false })
    }

    onClick(tripIdentifier) {
        this.props.history.push(`/choose-trip-type/${tripIdentifier}`);
    }

    render() {
        const { latitude } = this.props.coords.coords;
        return (
            <div className="container">
                {latitude && !this.state.isLoading ? (
                    <Row top="xs">
                        <Col md={6} xs={12}>
                            <button onClick={this.onClick.bind(this, this.props.match.params.tripId)} className="btn btn-lg btn-success mr-2">Back</button>
                            <WrappedMap
                                googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDmo2q7z3voxlodY1OkKSeTTIAJ9vIMrQo"}
                                loadingElement={<div style={{ height: "100%" }} />}
                                containerElement={<div style={{ height: "80%", width: "90%" }} />}
                                mapElement={<div style={{ minHeight: "200px", height: "118%", width: "110%" }} />}
                                props={this.props}
                            />
                        </Col>

                        <Col md={6} xs={12}>
                            <TablePage props={this.props} />
                        </Col>
                    </Row>
                ) : (
                        <div>Please enable your Geo position in browser! <a href="https://nordvpn.com/blog/change-location-google-chrome/">See a Guide for CHROME here</a></div>
                    )}

            </div >
        )
    }
}

//Exports range of validators that can be used to make sure the recieved data is valid
ChooseTripPage.propTypes = {
    places: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    coords: PropTypes.object.isRequired,
    getUsersLocation: PropTypes.func.isRequired,
    getPlacesFromAPI: PropTypes.func.isRequired,
    trip: PropTypes.object.isRequired
};

//Necessary to connect function... selecting parts of the data from the store that this component needs
const mapStateToProps = state => ({
    places: state.places,
    security: state.security,
    coords: state.coords,
    trip: state.trip
});

export default connect(
    mapStateToProps,
    { getPlacesFromAPI, getUsersLocation, getUsersInfo }
)(ChooseTripPage);