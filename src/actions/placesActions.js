//Redux
import { GET_PLACES_DATA_FROM_API } from "./types";

export function getPlacesFromAPI(id, latitude, longitude) {
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
}

/*export const getPlacesFromAPI = (id, latitude, longitude) => async dispatch => {
    //return dispatch => {
    const res =return await fetch(`https://places.sit.ls.hereapi.com/places/v1/discover/explore?apiKey=ty6GaIKaFnt0PLnQivodJThmvmIJ1twrSUI675NnebA&at=${latitude},${longitude}&cat=${id}`)
        .then(res => res.json())
        .then(json => {
            dispatch({
                type: GET_PLACES_DATA_FROM_API,
                payload: json
            });
            return json;
        })
    //};
}*/