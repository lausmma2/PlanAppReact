import React, { Component } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, Polyline, DirectionsRenderer } from "react-google-maps";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPlacesFromAPI } from "../actions/placesActions";
import { getUsersLocation } from "../actions/locationActions";

class MapGoogle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMyLocationMarker: null,
            selectedPlace: null,
            directions: null
        }
    }

    componentDidMount() {
        //this.props.getUsersLocation();
        const { placesFromDb } = this.props.placesFromDb;

        const directionsService = new window.google.maps.DirectionsService();
        var destination = null;
        var origin = null;

        if (placesFromDb.length - 1 >= 0) {
            var destination = { lat: placesFromDb[0].latitude, lng: placesFromDb[0].longitude };
            var origin = { lat: placesFromDb[placesFromDb.length - 1].latitude, lng: placesFromDb[placesFromDb.length - 1].longitude };
        } else if (this.props.props.coords.coords.latitude != null) {
            origin = { location: new window.google.maps.LatLng(this.props.props.coords.coords.latitude, this.props.props.coords.coords.longitude) }
            destination = { location: new window.google.maps.LatLng(this.props.props.coords.coords.latitude, this.props.props.coords.coords.longitude) }
        } else if (this.props.props.coords.coords.latitude == null) {
            origin = { location: new window.google.maps.LatLng(50.034309, 15.781199) }
            destination = { location: new window.google.maps.LatLng(50.034309, 15.781199) }
        }
        console.log(this.props)

        var waypoints = [];

        {
            placesFromDb.map(place => (
                waypoints.push({ location: new window.google.maps.LatLng(place.latitude, place.longitude) })
            ))
        }
        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
                waypoints: waypoints
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        )
    }

    render() {
        const { placesFromDb } = this.props.placesFromDb;
        const { latitude } = this.props.props.coords.coords;
        return (
            <div>
                {latitude ? (
                    <GoogleMap
                        defaultZoom={14}
                        defaultCenter={{ lat: this.props.props.coords.coords.latitude, lng: this.props.props.coords.coords.longitude }}
                    >
                        {placesFromDb.map(place => (
                            <Marker key={place} position={{
                                lat: place.latitude,
                                lng: place.longitude
                            }}
                                icon={"http://maps.google.com/mapfiles/ms/icons/yellow.png"}
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

                        <DirectionsRenderer directions={this.state.directions} />

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
                ) : (
                        <GoogleMap
                            defaultZoom={14}
                            defaultCenter={{ lat: 50.034309, lng: 15.781199 }}
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
                                    lat: 50.034309,
                                    lng: 15.781199
                                }}
                                icon={"http://maps.google.com/mapfiles/ms/icons/yellow.png"}
                                onClick={() => this.setState({ selectedMyLocationMarker: "place" })}
                                style={{ size: "200px" }}
                            />

                            <DirectionsRenderer directions={this.state.directions} />

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
                        </GoogleMap>)}

            </div>
        );
    }
}

var WrappedMapDetail;
MapGoogle.propTypes = {
    places: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    placesFromDb: PropTypes.object.isRequired,
    coords: PropTypes.object.isRequired,
    getUsersLocation: PropTypes.func.isRequired
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
    { getPlacesFromAPI, getUsersLocation }
)(WrappedMapDetail = withScriptjs(withGoogleMap(MapGoogle)));
