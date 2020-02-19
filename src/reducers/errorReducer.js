//Redux
import { GET_ERRORS } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_ERRORS:
            return action.payload; //This is going to be dispatched to the store

        default:
            return state;
    }
}