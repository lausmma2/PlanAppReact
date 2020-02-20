import { GET_TRIP_GROUPS } from "../actions/types";

const initialState = {
    tripGroups: []
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_TRIP_GROUPS:
            return {
                ...state,
                tripGroups: action.payload
            };

        default:
            return state;
    }
}