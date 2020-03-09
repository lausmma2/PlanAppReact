import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPlacesFromAPI } from "../../actions/placesActions";
import WrappedMap from "../../map/Map";
import { Link } from "react-router-dom";
import TablePage from '../DataTablePage';
import { getUsersLocation } from "../../actions/locationActions";

class ChooseTripPage extends Component {

    componentDidMount() {
        if (!this.props.security.validToken) {
            this.props.history.push("/")
        }
        this.props.getUsersLocation();
        console.log(this.props)
        //this.props.getPlacesFromAPI("restaurant", this.props.coords.coords.latitude, this.props.coords.coords.longitude)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">

                        <Link to="/choose-trip-type" className="btn btn-lg btn-primary mr-2">Back</Link>
                        <WrappedMap
                            googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDmo2q7z3voxlodY1OkKSeTTIAJ9vIMrQo"}
                            loadingElement={<div style={{ height: "100%" }} />}
                            containerElement={<div style={{ height: "80%", width: "90%" }} />}
                            mapElement={<div style={{ height: "118%", width: "110%" }} />}
                            props={this.props}
                        />

                    </div>

                    <div className="col-sm-6" style={{ marginTop: "4%" }}>
                        <TablePage props={this.props} />
                    </div>
                </div>
            </div >
        )
    }
}

ChooseTripPage.propTypes = {
    places: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    coords: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    places: state.places,
    security: state.security,
    coords: state.coords
});

export default connect(
    mapStateToProps,
    { getPlacesFromAPI, getUsersLocation }
)(ChooseTripPage);