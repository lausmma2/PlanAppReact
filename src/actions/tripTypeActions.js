//Redux
import axios from "axios";
import { GET_TRIP_TYPE, GET_TRIP_TYPES } from "./types";

export const getTripType = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`https://planapp-spring.herokuapp.com/api/trip/trip-type/${id}`);
        dispatch({
            type: GET_TRIP_TYPE,
            payload: res.data
        });
    } catch (error) {
        history.push("/dashboard");
    }
};

export const getTripTypes = () => async dispatch => {
    const res = await axios.get("https://planapp-spring.herokuapp.com/api/trip/trip-type/all");
    dispatch({
        type: GET_TRIP_TYPES,
        payload: res.data
    });
};