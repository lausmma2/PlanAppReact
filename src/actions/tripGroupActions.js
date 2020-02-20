//Redux
import axios from "axios";
import { GET_ERRORS, GET_TRIP_GROUPS } from "./types";

export const createTripGroup = (tripGroup, history) => async dispatch => { //This is gonna allow us to redirect once we submit the form
    try {
        const res = await axios.post("http://localhost:8081/api/trip-group/create-trip-group", tripGroup)
        history.push("/user-info")
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getTripGroups = () => async dispatch => {
    const res = await axios.get("http://localhost:8081/api/trip-group/all")
    dispatch({
        type: GET_TRIP_GROUPS,
        payload: res.data
    });
};