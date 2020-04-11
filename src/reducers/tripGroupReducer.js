import { GET_TRIP_GROUPS, DELETE_TRIP_GROUP, GET_TRIP_GROUP } from "../actions/types";

const initialState = {
    tripGroups: [],
    tripGroup: {}
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_TRIP_GROUPS:
            return {
                ...state,
                tripGroups: action.payload
            };

        case GET_TRIP_GROUP:
            return {
                ...state,
                tripGroup: action.payload
            };

        case DELETE_TRIP_GROUP:
            return {
                ...state,
                tripGroups: state.tripGroups.filter(
                    tripGroup => tripGroup.tripGroupIdentifier !== action.payload
                )
            };

        default:
            return state;
    }
}