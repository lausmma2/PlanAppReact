import { GET_USER_INFO, GET_USERS_LOCATION } from "../actions/types";

const initialState = {
    userData: {}
    //coords: {}
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_USER_INFO:
            return {
                ...state,
                userData: { ...action.payload }
            };
        /*case GET_USERS_LOCATION:
            console.log(GET_USERS_LOCATION)
            return Object.assign({},
                state,
                {
                    coords: action.payload
                }
            )*/
        /*case GET_USERS_LOCATION:
            console.log(action.payload)
            return {
                ...state,
                coords: { ...action.payload }
            };*/
        default:
            return state;
    }
}