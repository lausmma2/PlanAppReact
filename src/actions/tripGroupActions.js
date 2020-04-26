//Redux
import axios from "axios";
import { GET_ERRORS, GET_TRIP_GROUPS, DELETE_TRIP_GROUP, GET_TRIP_GROUP } from "./types";

export const createTripGroup = (tripGroup, history) => async dispatch => { //This is gonna allow us to redirect once we submit the form
    try {
        const res = await axios.post("https://planapp-spring.herokuapp.com/api/trip-group/create-trip-group", tripGroup)
        history.push("/groupDashboard")
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getTripGroups = () => async dispatch => {
    const res = await axios.get("https://planapp-spring.herokuapp.com/api/trip-group/all")
    dispatch({
        type: GET_TRIP_GROUPS,
        payload: res.data
    });
};

export const deleteTripGroup = id => async dispatch => {
    await axios.delete(`https://planapp-spring.herokuapp.com/api/trip-group/${id}`);
    dispatch({
        type: DELETE_TRIP_GROUP,
        payload: id
    });
};

export const getTripGroup = (tripGroupIdentifier, history) => async dispatch => {
    try {
        const res = await axios.get(`https://planapp-spring.herokuapp.com/api/trip-group/${tripGroupIdentifier}`);
        dispatch({
            type: GET_TRIP_GROUP,
            payload: res.data
        });
        history.push(`/update-trip-group/${tripGroupIdentifier}`);
    } catch (error) {
        console.log("error?")
        history.push("/groupDashboard");
    }
};

export const addUserToTripGroup = (tripGroupIdentifier, username, history) => async dispatch => {
    try {
        const res = await axios.post(`https://planapp-spring.herokuapp.com/api/trip-group/${tripGroupIdentifier}/${username}`)
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}