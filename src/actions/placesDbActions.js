//Redux
import { GET_PLACES, DELETE_PLACE } from "./types";
import axios from "axios";

export const getAllPlaces = (tripIdentifier, history) => async dispatch => {
    const res = await axios.get(`https://planapp-spring.herokuapp.com/api/place/all/${tripIdentifier}`);
    dispatch({
        type: GET_PLACES,
        payload: res.data
    })
    history.push(`/tripDetail/${tripIdentifier}`)
}

export const getAllPlacesAfterAdd = (tripIdentifier) => async dispatch => {
    console.log(tripIdentifier)
    const res = await axios.get(`https://planapp-spring.herokuapp.com/api/place/all/${tripIdentifier}`);
    dispatch({
        type: GET_PLACES,
        payload: res.data
    })
}

export const deletePlace = (latitude, longitude, tripIdentifier) => async dispatch => {
    await axios.delete(`https://planapp-spring.herokuapp.com/api/place/delete/${latitude}/${longitude}/${tripIdentifier}`);
    dispatch({
        type: DELETE_PLACE,
        payload: latitude
    });
};

export const getAllPlacesByTripIdentifierAndTripGroupIdentifier = (tripIdentifier, tripGroupIdentifier, history) => async dispatch => {
    const res = await axios.get(`https://planapp-spring.herokuapp.com/api/place/all/${tripIdentifier}/${tripGroupIdentifier}`);
    dispatch({
        type: GET_PLACES,
        payload: res.data
    })
    history.push(`/tripDetail/${tripIdentifier}`)
}