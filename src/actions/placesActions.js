//Redux
import { GET_PLACES_DATA_FROM_API, GET_ERRORS } from "./types";
import axios from "axios";

//return nearby places from developer.here.api
export const getPlacesFromAPI = (tripId, id, latitude, longitude, radius, history) => async dispatch => {
    return await fetch(`https://places.sit.ls.hereapi.com/places/v1/discover/explore?apiKey=ty6GaIKaFnt0PLnQivodJThmvmIJ1twrSUI675NnebA&in=${latitude},${longitude};r=${radius}&cat=${id}`)
        .then(res => res.json())
        .then(json => {
            dispatch({
                type: GET_PLACES_DATA_FROM_API,
                payload: json
            });
            history.push(`/choose-trip/${tripId}/${id}/${latitude}/${longitude}/${radius}`);
            return json;
        })
}

//saves place to a trip... called everytime place is chosen
export const savePlaceToTrip = (title, latitude, longitude, distance, tripIdentifier) => async dispatch => {
    try {
        const res = await axios.post(`https://planapp-spring.herokuapp.com/api/place/${title}/${latitude}/${longitude}/${distance}/${tripIdentifier}`)
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}