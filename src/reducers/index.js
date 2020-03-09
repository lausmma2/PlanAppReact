//Redux
import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import tripReducer from "./tripReducer";
import userReducer from "./userReducer";
import tripGroupReducer from "./tripGroupReducer";
import tripTypeReducer from "./tripTypeReducer";
import placesReducer from "./placesReducer";
import locationReducer from "./locationReducer";

export default combineReducers({
    errors: errorReducer,
    security: securityReducer,
    trip: tripReducer,
    userData: userReducer,
    tripGroups: tripGroupReducer,
    tripType: tripTypeReducer,
    places: placesReducer,
    coords: locationReducer
});