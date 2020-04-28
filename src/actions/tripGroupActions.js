//Redux
import axios from "axios";
import { GET_ERRORS, GET_TRIP_GROUPS, DELETE_TRIP_GROUP, GET_TRIP_GROUP } from "./types";

//creates new group, then sends user to /groupDashboard page
export const createTripGroup = (tripGroup, history) => async dispatch => { //This is gonna allow us to redirect once we submit the form
    try {
        const res = await axios.post("https://planapp-spring.herokuapp.com/api/trip-group/create-trip-group", tripGroup)
        history.push("/groupDashboard")
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

//returns all groups based on user's username... controlled by principal.getName() on backend
export const getTripGroups = () => async dispatch => {
    const res = await axios.get("https://planapp-spring.herokuapp.com/api/trip-group/all")
    dispatch({
        type: GET_TRIP_GROUPS,
        payload: res.data
    });
};

//ask user to delete confirmation, then deletes the specific group by id
export const deleteTripGroup = id => async dispatch => {
    if (
        window.confirm(
            "Are you sure? This will delete the group and all the data related to it!"
        )
    ) {
        await axios.delete(`https://planapp-spring.herokuapp.com/api/trip-group/${id}`);
        dispatch({
            type: DELETE_TRIP_GROUP,
            payload: id
        });
    }
};

//returns specific group by its id
export const getTripGroup = (tripGroupIdentifier, history) => async dispatch => {
    try {
        const res = await axios.get(`https://planapp-spring.herokuapp.com/api/trip-group/${tripGroupIdentifier}`);
        dispatch({
            type: GET_TRIP_GROUP,
            payload: res.data
        });
        history.push(`/update-trip-group/${tripGroupIdentifier}`);
    } catch (error) {
        history.push("/groupDashboard");
    }
};

//send request to add user to group by groupId and username
export const addUserToTripGroup = (tripGroupIdentifier, username) => async dispatch => {
    try {
        const res = await axios.post(`https://planapp-spring.herokuapp.com/api/trip-group/${tripGroupIdentifier}/${username}`)
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}