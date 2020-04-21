//Redux
import axios from "axios";
import { GET_USER_INFO, GET_ERRORS } from "./types";

export const getUsersInfo = () => async dispatch => {
    const res = await axios.get("https://planapp-spring.herokuapp.com/user-info");
    dispatch({
        type: GET_USER_INFO,
        payload: res.data
    });
};

export const updateUser = (user, history) => async dispatch => {
    try {
        const res = await axios.post("https://planapp-spring.herokuapp.com/api/user/user-info/update", user)
        dispatch({ type: GET_USER_INFO, payload: res.data })
        history.push("/user-info")
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}