import { GET_TRIP_GROUPS, DELETE_TRIP_GROUP } from "../actions/types";

const initialState = {
    tripGroups: []
    //trip: {}
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_TRIP_GROUPS:
            return {
                ...state,
                tripGroups: action.payload
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