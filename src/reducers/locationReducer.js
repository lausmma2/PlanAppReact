import { GET_USERS_LOCATION } from "../actions/types";

const initialState = {
    coords: [],
    coord: {}
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_USERS_LOCATION:
            return {
                ...state,
                coords: action.payload
            };

        default:
            return state;
    }
}