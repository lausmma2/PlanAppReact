//Redux
import { GET_PLACES_DATA_FROM_API, GET_ERRORS } from "./types";
import axios from "axios";

/*export function getPlacesFromAPI(id, latitude, longitude) {
    return dispatch => {
        return fetch(`https://places.sit.ls.hereapi.com/places/v1/discover/explore?apiKey=ty6GaIKaFnt0PLnQivodJThmvmIJ1twrSUI675NnebA&at=${latitude},${longitude}&cat=${id}`)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: GET_PLACES_DATA_FROM_API,
                    payload: json
                });
                return json;
            })
    };
}*/

export const getPlacesFromAPI = (id, latitude, longitude) => async dispatch => {
    //return dispatch => {
    return await fetch(`https://places.sit.ls.hereapi.com/places/v1/discover/explore?apiKey=ty6GaIKaFnt0PLnQivodJThmvmIJ1twrSUI675NnebA&at=${latitude},${longitude}&cat=${id}`)
        .then(res => res.json())
        .then(json => {
            dispatch({
                type: GET_PLACES_DATA_FROM_API,
                payload: json
            });
            return json;
        })
    //};
}

export const savePlaceToTrip = (title, latitude, longitude, vicinity, distance, tripIdentifier) => async dispatch => {
    try {
        const res = await axios.post(`http://localhost:8081/api/place/${title}/${latitude}/${longitude}/${vicinity}/${distance}/${tripIdentifier}`)
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}