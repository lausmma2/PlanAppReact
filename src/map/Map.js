import React, { Component } from 'react';
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
            selectedMyLocationMarker: null,
            selectedPlace: null
        }
    }

    render() {
        const data = this.props.places.places.results.items;
        const { latitude } = this.props.props.coords.coords;
        return (
            <div>
                {latitude ? (
                    <GoogleMap
                        defaultZoom={14}
                        defaultCenter={{ lat: this.props.props.coords.coords.latitude, lng: this.props.props.coords.coords.longitude }}
                        defaultOptions={{
                            styles: exampleMapStyles,
                        }}
                    >
                        {data.map((place, index) => (
                            <Marker key={index} position={{
                                lat: place.position[0],
                                lng: place.position[1]
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
                                lat: this.state.selectedPlace.position[0],
                                lng: this.state.selectedPlace.position[1]
                            }}
                                onCloseClick={() => { this.setState({ selectedPlace: null }); }}
                            >
                                <div>
                                    <div>{this.state.selectedPlace.title}</div>
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
                    </GoogleMap>) : (
                        <div>
                            You have to enable Geo position in Chrome... Then refresh the page
                        </div>
                    )}
            </div>
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
