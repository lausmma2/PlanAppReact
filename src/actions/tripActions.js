//Redux
import axios from "axios";
import { GET_ERRORS, GET_TRIPS, DELETE_TRIP, ADD_TRIP_TO_TRIPGROUP, GET_TRIP, GET_TRIPS_BY_TRIPGROUP, GET_TRIP_BY_TRIPGROUP } from "./types";

export const createTrip = (trip, history) => async dispatch => { //This is gonna allow us to redirect once we submit the form
    try {
        const res = await axios.post("http://localhost:8081/api/trip/create-trip", trip)
        history.push("/dashboard")
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getTrips = () => async dispatch => {
    const res = await axios.get("http://localhost:8081/api/trip/all");
    dispatch({
        type: GET_TRIPS,
        payload: res.data
    });
};

export const deleteTrip = id => async dispatch => {
    if (
        window.confirm(
            "Are you sure? This will delete the trip and all the data related to it"
        )
    ) {
        await axios.delete(`http://localhost:8081/api/trip/${id}`);
        dispatch({
            type: DELETE_TRIP,
            payload: id
        });
    }
};

export const addTripToTripGroup = (tripIdentifier, tripGroupIdentifier) => async dispatch => {
    if (
        window.confirm(
            "Are you sure? This add trip to the trip group..."
        )
    ) {
        const res = await axios.post(`http://localhost:8081/api/trip-group/add-trip-to-group/${tripIdentifier}/${tripGroupIdentifier}`);
        dispatch({
            type: ADD_TRIP_TO_TRIPGROUP,
            payload: res.data
        });
        dispatch(getTrips());
    }
}

export const getTrip = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8081/api/trip/${id}`);
        dispatch({
            type: GET_TRIP,
            payload: res.data
        });
    } catch (error) {
        history.push("/dashboard");
    }
};

export const getTripsByTripGroupIdentifier = (tripGroupIdentifier, history) => async dispatch => {
    const res = await axios.get(`http://localhost:8081/api/trip/group/${tripGroupIdentifier}`);
    dispatch({
        type: GET_TRIPS_BY_TRIPGROUP,
        payload: res.data
    });
    history.push(`/trip-group/dashboard/${tripGroupIdentifier}`)
};

export const getTripByTripIdentifierAndTripGroupIdentifier = (tripIdentifier, tripGroupIdentifier) => async dispatch => {
    const res = await axios.get(`http://localhost:8081/api/trip/${tripIdentifier}/${tripGroupIdentifier}`);
    dispatch({
        type: GET_TRIP_BY_TRIPGROUP,
        payload: res.data
    });
};