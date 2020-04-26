import { GET_USERS_LOCATION } from "./types";

export function getUsersLocation() {
    return dispatch => {
        const geolocation = navigator.geolocation;
        geolocation.watchPosition((position) => {
            dispatch({
                type: GET_USERS_LOCATION,
                payload: position.coords
            });
        });
    };
}