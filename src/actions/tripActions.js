//Redux
import axios from "axios";
import { GET_ERRORS, GET_TRIPS, DELETE_TRIP, ADD_TRIP_TO_TRIPGROUP, GET_TRIP, GET_TRIPS_BY_TRIPGROUP, GET_TRIP_BY_TRIPGROUP } from "./types";

//creates a trip and send user to /dashboard page
export const createTrip = (trip, history) => async dispatch => {
    try {
        const res = await axios.post("https://planapp-spring.herokuapp.com/api/trip/create-trip", trip)
        history.push("/dashboard")
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

//get all trips based on user's username... controlled by principal.getName() on backend
export const getTrips = () => async dispatch => {
    const res = await axios.get("https://planapp-spring.herokuapp.com/api/trip/all");
    dispatch({
        type: GET_TRIPS,
        payload: res.data
    });
};

//ask user to delete confirmation, then deletes the specific trip by id
export const deleteTrip = id => async dispatch => {
    if (
        window.confirm(
            "Are you sure? This will delete the trip and all the data related to it!"
        )
    ) {
        await axios.delete(`https://planapp-spring.herokuapp.com/api/trip/${id}`);
        dispatch({
            type: DELETE_TRIP,
            payload: id
        });
    }
};

//ask user to add trip to group, then add trip to group by tripId and groupId
export const addTripToTripGroup = (tripIdentifier, tripGroupIdentifier) => async dispatch => {
    if (
        window.confirm(
            "Are you sure? This will add trip to the trip group..."
        )
    ) {
        const res = await axios.post(`https://planapp-spring.herokuapp.com/api/trip-group/add-trip-to-group/${tripIdentifier}/${tripGroupIdentifier}`);
        dispatch({
            type: ADD_TRIP_TO_TRIPGROUP,
            payload: res.data
        });
        dispatch(getTrips());
    }
}

//get the specific trip by its id
export const getTrip = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`https://planapp-spring.herokuapp.com/api/trip/${id}`);
        dispatch({
            type: GET_TRIP,
            payload: res.data
        });
    } catch (error) {
        history.push("/dashboard");
    }
};

//returns all trips connected to some specific group
export const getTripsByTripGroupIdentifier = (tripGroupIdentifier, history) => async dispatch => {
    const res = await axios.get(`https://planapp-spring.herokuapp.com/api/trip/group/${tripGroupIdentifier}`);
    dispatch({
        type: GET_TRIPS_BY_TRIPGROUP,
        payload: res.data
    });
    history.push(`/trip-group/dashboard/${tripGroupIdentifier}`)
};

//returns specific trip by tripId and groupId
export const getTripByTripIdentifierAndTripGroupIdentifier = (tripIdentifier, tripGroupIdentifier) => async dispatch => {
    const res = await axios.get(`https://planapp-spring.herokuapp.com/api/trip/${tripIdentifier}/${tripGroupIdentifier}`);
    dispatch({
        type: GET_TRIP_BY_TRIPGROUP,
        payload: res.data
    });
};