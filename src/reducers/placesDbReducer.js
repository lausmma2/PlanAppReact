import { GET_PLACES, DELETE_PLACE } from "../actions/types";

const initialState = {
    placesFromDb: []
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_PLACES:
            return {
                ...state,
                placesFromDb: action.payload
            };

        case DELETE_PLACE:
            return {
                ...state,
                placesFromDb: state.placesFromDb.filter(
                    placeFromDb => placeFromDb.latitude !== action.payload
                )
            };

        default:
            return state;
    }
}