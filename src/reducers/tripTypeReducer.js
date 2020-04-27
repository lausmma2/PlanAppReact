import { GET_TRIP_TYPE, GET_TRIP_TYPES } from "../actions/types";

const initialState = {
    tripTypes: [],
    tripType: {}
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_TRIP_TYPES:
            return {
                ...state,
                tripTypes: action.payload
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