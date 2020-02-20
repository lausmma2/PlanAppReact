//Redux
import axios from "axios";
import { GET_ERRORS, GET_TRIPS } from "./types";

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

export const deleteTrip = (trip, history) => async dispatch => {
    try {
        const res = await axios.post(`http://localhost:8081/api/trip/{tripId}`, trip)
        history.push("/dashboard")
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }

}