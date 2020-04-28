//Redux
import { GET_PLACES, DELETE_PLACE } from "./types";
import axios from "axios";

//returns all stored places in the database
export const getAllPlaces = (tripIdentifier, history) => async dispatch => {
    const res = await axios.get(`https://planapp-spring.herokuapp.com/api/place/all/${tripIdentifier}`);
    dispatch({
        type: GET_PLACES,
        payload: res.data
    })
    history.push(`/tripDetail/${tripIdentifier}`)
}

//returns all stored places in the database - to know how many places are there
export const getAllPlacesAfterAdd = (tripIdentifier) => async dispatch => {
    const res = await axios.get(`https://planapp-spring.herokuapp.com/api/place/all/${tripIdentifier}`);
    dispatch({
        type: GET_PLACES,
        payload: res.data
    })
}

//deletes the specific place stored in trip
export const deletePlace = (latitude, longitude, tripIdentifier) => async dispatch => {
    await axios.delete(`https://planapp-spring.herokuapp.com/api/place/delete/${latitude}/${longitude}/${tripIdentifier}`);
    dispatch({
        type: DELETE_PLACE,
        payload: latitude
    });
};

//returns all places based on tripId and GroupId - so we know what places are in group and trip in the group
export const getAllPlacesByTripIdentifierAndTripGroupIdentifier = (tripIdentifier, tripGroupIdentifier, history) => async dispatch => {
    const res = await axios.get(`https://planapp-spring.herokuapp.com/api/place/all/${tripIdentifier}/${tripGroupIdentifier}`);
    dispatch({
        type: GET_PLACES,
        payload: res.data
    })
    history.push(`/tripDetail/${tripIdentifier}`)
}