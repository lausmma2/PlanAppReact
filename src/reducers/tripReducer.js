//Redux
import { GET_TRIP, GET_TRIPS, DELETE_TRIP, ADD_TRIP_TO_TRIPGROUP, GET_TRIPS_BY_TRIPGROUP, GET_TRIP_BY_TRIPGROUP } from "../actions/types";

const initialState = {
    trips: [],
    trip: {},
    tripsByTripGroup: []
};

export default function (state = initialState, action) {
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

        case ADD_TRIP_TO_TRIPGROUP:
            return {
                ...state,
                trip: action.payload
            };

        case DELETE_TRIP:
            return {
                ...state,
                trips: state.trips.filter(
                    trip => trip.tripIdentifier !== action.payload
                )
            };

        case GET_TRIPS_BY_TRIPGROUP:
            return {
                ...state,
                trips: action.payload
            };

        case GET_TRIP_BY_TRIPGROUP:
            return {
                ...state,
                trip: action.payload
            };

        default:
            return state;
    }
}