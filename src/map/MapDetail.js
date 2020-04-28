import React, { Component } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, DirectionsRenderer } from "react-google-maps";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPlacesFromAPI } from "../actions/placesActions";
import { getUsersLocation } from "../actions/locationActions";

//Expresses map in trip detail, with chosen places
class MapGoogle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMyLocationMarker: null,
            selectedPlace: null,
            places: props.placesFromDb.placesFromDb,
            directions: null,
            isClicked: false
        }
    }

    onClick() {
        this.setState({
            isClicked: true
        })
    }

    //Redrawing routes between places after one place delete
    //Check if stored places changed in db or not
    componentDidUpdate(prevProps) {
        if (prevProps.props.placesFromDb.placesFromDb.length !== this.props.placesFromDb.placesFromDb.length) {
            this.setState({
                places: prevProps.props.placesFromDb.placesFromDb
            })
            this.drawRoutesAfterDelete(this.props.placesFromDb.placesFromDb);
        }
    }

    //Redraw routes between places after one place delete
    drawRoutesAfterDelete(places) {
        const { placesFromDb } = this.props.placesFromDb;
        this.props.getUsersLocation();

        const directionsService = new window.google.maps.DirectionsService();
        var destination = null;
        var origin = null;

        if (placesFromDb.length - 1 >= 0) {
            destination = { lat: placesFromDb[0].latitude, lng: placesFromDb[0].longitude };
            origin = { lat: placesFromDb[placesFromDb.length - 1].latitude, lng: placesFromDb[placesFromDb.length - 1].longitude };
        } else if (this.props.props.coords.coords.latitude != null) {
            origin = { location: new window.google.maps.LatLng(this.props.props.coords.coords.latitude, this.props.props.coords.coords.longitude) }
            destination = { location: new window.google.maps.LatLng(this.props.props.coords.coords.latitude, this.props.props.coords.coords.longitude) }
        } else if (this.props.props.coords.coords.latitude == null) {
            origin = { location: new window.google.maps.LatLng(50.034309, 15.781199) }
            destination = { location: new window.google.maps.LatLng(50.034309, 15.781199) }
        }

        var waypoints = [];
        {
            places.map(place => (
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

    //Draw routes between first and last chosen place
    drawRoutes() {
        const { placesFromDb } = this.props.placesFromDb;
        this.props.getUsersLocation();

        const directionsService = new window.google.maps.DirectionsService();
        var destination = null;
        var origin = null;

        //To see user's trip routes and places I selected attitude, that if geo position is not enabled 
        //=> it will be set to 50.034309, 15.781199 so user can see his map with places and routes
        if (placesFromDb.length - 1 >= 0) {
            destination = { lat: placesFromDb[0].latitude, lng: placesFromDb[0].longitude };
            origin = { lat: placesFromDb[placesFromDb.length - 1].latitude, lng: placesFromDb[placesFromDb.length - 1].longitude };
        } else if (this.props.props.coords.coords.latitude != null) {
            origin = { location: new window.google.maps.LatLng(this.props.props.coords.coords.latitude, this.props.props.coords.coords.longitude) }
            destination = { location: new window.google.maps.LatLng(this.props.props.coords.coords.latitude, this.props.props.coords.coords.longitude) }
        } else if (this.props.props.coords.coords.latitude == null) {
            origin = { location: new window.google.maps.LatLng(50.034309, 15.781199) }
            destination = { location: new window.google.maps.LatLng(50.034309, 15.781199) }
        }

        //Setting waypoints (places between origin and destination)
        var waypoints = [];
        {
            this.state.places.map(place => (
                waypoints.push({ location: new window.google.maps.LatLng(place.latitude, place.longitude) })
            ))
        }

        //Setting routes info and draw routes
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

    //when component mounts, routes will be drawn
    componentDidMount() {
        this.drawRoutes();
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
                        {placesFromDb.map((place, index) => (
                            <Marker key={index} position={{
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

                        <DirectionsRenderer directions={this.state.directions} options={{ suppressMarkers: true, preserveViewport: true }} />

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
                            {placesFromDb.map((place, index) => (
                                <Marker key={index} position={{
                                    lat: place.latitude,
                                    lng: place.longitude
                                }}

                                    onClick={() => this.setState({ selectedPlace: place })}
                                />
                            ))}

                            <DirectionsRenderer directions={this.state.directions} options={{ suppressMarkers: true, preserveViewport: true }} />

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

//Exports range of validators that can be used to make sure the recieved data is valid
MapGoogle.propTypes = {
    places: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,
    placesFromDb: PropTypes.object.isRequired,
    coords: PropTypes.object.isRequired,
    getUsersLocation: PropTypes.func.isRequired
};

//Necessary to connect function... selecting parts of the data from the store that this component needs
const mapStateToProps = state => ({
    places: state.places,
    security: state.security,
    placesFromDb: state.placesFromDb,
    coords: state.coords
});

export default connect(
    mapStateToProps,
    { getPlacesFromAPI, getUsersLocation }
)(WrappedMapDetail = withScriptjs(withGoogleMap(MapGoogle)));
