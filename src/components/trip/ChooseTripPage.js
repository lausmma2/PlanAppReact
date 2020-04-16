import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPlacesFromAPI } from "../../actions/placesActions";
import WrappedMap from "../../map/Map";
import TablePage from '../DataTablePage';
import { getUsersLocation } from "../../actions/locationActions";

class ChooseTripPage extends Component {

    componentDidMount() {
        if (!this.props.security.validToken) {
            this.props.history.push("/")
        }
        this.props.getUsersLocation();

        if (this.props.places.places.status === 400) {
            console.log("píp")
            //setTimeout(() => {
            this.props.history.goBack();
            //}, 7000)
        }
    }

    onClick() {
        this.props.history.goBack();
    }

    render() {
        console.log(this.props)
        const { latitude } = this.props.coords.coords;
        return (
            <div className="container">
                {latitude ? (
                    <div className="row">
                        <div className="col-sm-6">
                            <button onClick={this.onClick.bind(this)} className="btn btn-lg btn-success mr-2">Back</button>
                            <WrappedMap
                                googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDmo2q7z3voxlodY1OkKSeTTIAJ9vIMrQo"}
                                loadingElement={<div style={{ height: "100%" }} />}
                                containerElement={<div style={{ height: "80%", width: "90%" }} />}
                                mapElement={<div style={{ height: "118%", width: "110%" }} />}
                                props={this.props}
                            />
                        </div>

                        <div className="col-sm-6">
                            <TablePage props={this.props} />
                        </div>
                    </div>
                ) : (
                        <div>Please enable your Geo position in browser! <a href="https://nordvpn.com/blog/change-location-google-chrome/">See a Guide for CHROME here</a></div>
                    )}

            </div >
        )
    }
}

ChooseTripPage.propTypes = {
    places: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    coords: PropTypes.object.isRequired,
    getUsersLocation: PropTypes.func.isRequired,
    getPlacesFromAPI: PropTypes.func.isRequired,
    trip: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    places: state.places,
    security: state.security,
    coords: state.coords,
    trip: state.trip
});

export default connect(
    mapStateToProps,
    { getPlacesFromAPI, getUsersLocation }
)(ChooseTripPage);