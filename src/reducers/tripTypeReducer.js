import { GET_TRIP_TYPE, GET_TRIP_TYPES } from "../actions/types";

const initialState = {
    tripType: {}
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_TRIP_TYPES:
            return {
                ...state,
                tripType: action.payload
            };

        case GET_TRIP_TYPE:
            return {
                ...state,
                tripType: action.payload
            };

        default:
            return state;
    }
}