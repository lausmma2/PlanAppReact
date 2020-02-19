//Redux
import axios from "axios";
import { GET_USER_INFO, GET_ERRORS } from "./types";

/*export const getUserInfoByUsername = (username, history) => async dispatch => {
    try {
        const res = await axios.get("http://localhost:8081/api/user/user-info");
        dispatch({
            type: GET_USER_INFO,
            payload: res.data
        });
    } catch (error) {
        history.push("/dashboard");
    }
};*/

export const getUsersInfo = () => async dispatch => {
    const res = await axios.get("http://localhost:8081/api/user/user-info");
    dispatch({
        type: GET_USER_INFO,
        payload: res.data
    });
};

export const updateUser = (user, history) => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8081/api/user/user-info/update", user)
        history.push("/dashboard")
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}