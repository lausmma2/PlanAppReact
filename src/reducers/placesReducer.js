import { GET_PLACES_DATA_FROM_API } from "../actions/types";

const initialState = {
    places: []
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_PLACES_DATA_FROM_API:
            return {
                ...state,
                places: action.payload
            };

        default:
            return state;
    }
}