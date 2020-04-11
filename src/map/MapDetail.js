import React, { Component, useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPlacesFromAPI } from "../actions/placesActions";

const exampleMapStyles = [
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#eeeeee",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
];

class MapGoogle extends Component {

    constructor(props) {
        super(props);
        //console.log(props)
        this.state = {
            selectedMyLocationMarker: null,
            selectedPlace: null
        }
    }

    render() {
        const { placesFromDb } = this.props.placesFromDb;
        return (
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{ lat: this.props.props.coords.coords.latitude, lng: this.props.props.coords.coords.longitude }}
            >
                {placesFromDb.map(place => (
                    <Marker key={place} position={{
                        lat: place.latitude,
                        lng: place.longitude
                    }}
                        onClick={() => this.setState({ selectedPlace: place })}
                    />
                ))}

                <Marker
                    position={{
                        lat: this.props.props.coords.coords.latitude,
                        lng: this.props.props.coords.coords.longitude
                    }}
                    icon={"http://maps.google.com/mapfiles/ms/icons/green.png"}
                    onClick={() => this.setState({ selectedMyLocationMarker: "place" })}
                    style={{ size: "200px" }}
                />

                {this.state.selectedPlace && (
                    <InfoWindow position={{
                        lat: this.state.selectedPlace.latitude,
                        lng: this.state.selectedPlace.longitude
                    }}
                        onCloseClick={() => { this.setState({ selectedPlace: null }); }}
                    >
                        <div>
                            <div>{this.state.selectedPlace.title}</div>
                            <div>{this.state.selectedPlace.vicinity}</div>
                            <div>{this.state.selectedPlace.distance}m from your position</div>
                        </div>
                    </InfoWindow>
                )}

                {this.state.selectedMyLocationMarker && (
                    <InfoWindow position={{
                        lat: this.props.props.coords.coords.latitude,
                        lng: this.props.props.coords.coords.longitude
                    }}
                        onCloseClick={() => { this.setState({ selectedMyLocationMarker: null }); }}
                    >
                        <div>
                            <div>Your location</div>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        );
    }
}

var WrappedMapDetail;
MapGoogle.propTypes = {
    places: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    placesFromDb: PropTypes.object.isRequired,
    coords: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    places: state.places,
    security: state.security,
    placesFromDb: state.placesFromDb,
    coords: state.coords
});

//export default WrappedMap = withScriptjs(withGoogleMap(Map))
export default connect(
    mapStateToProps,
    { getPlacesFromAPI }
)(WrappedMapDetail = withScriptjs(withGoogleMap(MapGoogle)));
