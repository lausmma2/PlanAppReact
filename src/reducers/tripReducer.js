import { GET_TRIP, GET_TRIPS } from "../actions/types";

const initialState = {
    trips: [],
    trip: {}
};

export default function (state = initialState, action) { //The action is get trips...
    switch (action.type) {

        case GET_TRIPS:
            return {
                ...state,
                trips: action.payload
            };

        case GET_TRIP:
            return {
                ...state,
                trip: action.payload
            };

        default:
            return state;
    }
}