import { GET_USERS_LOCATION } from "./types";

//returns user's location
export function getUsersLocation() {
    return dispatch => {
        const geolocation = navigator.geolocation;
        geolocation.getCurrentPosition((position) => {
            dispatch({
                type: GET_USERS_LOCATION,
                payload: position.coords
            });
        });
    };
}