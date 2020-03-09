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
        this.state = {
            selectedPlace: null
        }
    }

    render() {
        console.log(this.props)
        const data = this.props.places.places.results.items;
        return (
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{ lat: this.props.props.coords.coords.latitude, lng: this.props.props.coords.coords.longitude }}
                defaultOptions={{
                    styles: exampleMapStyles,
                }}
            >
                {data.map(place => (
                    <Marker key={place} position={{
                        lat: place.position[0],
                        lng: place.position[1]
                    }}
                        onClick={() => this.setState({ selectedPlace: place })}
                    />
                ))}

                {this.state.selectedPlace && (
                    <InfoWindow position={{
                        lat: this.state.selectedPlace.position[0],
                        lng: this.state.selectedPlace.position[1]
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
            </GoogleMap>
        );
    }
}

var WrappedMap;
MapGoogle.propTypes = {
    places: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    places: state.places,
    security: state.security
});

//export default WrappedMap = withScriptjs(withGoogleMap(Map))
export default connect(
    mapStateToProps,
    { getPlacesFromAPI }
)(WrappedMap = withScriptjs(withGoogleMap(MapGoogle)));
