import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import SetJWTToken from "../securityUtils/SetJWTToken";
import jwt_decode from "jwt-decode";
import { getUsersInfo } from './userActions';
import { getTripGroups } from './tripGroupActions';

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post("https://planapp-spring.herokuapp.com/register", newUser)
    //možná tady udělat nějakou boolean proměnnou?
    history.push("/confirmation");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

export const login = LoginRequest => async dispatch => {
  try {
    // post => Login Request
    const res = await axios.post("http://localhost:8081/login", LoginRequest);
    // extract token from res.data
    const { token } = res.data;
    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);
    // set our token in header ***
    SetJWTToken(token);
    // decode token on React
    const decoded = jwt_decode(token);
    // dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
    dispatch(getUsersInfo())
    dispatch(getTripGroups())
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken"); //remove jwtToken from localStorage
  //localStorage.removeItem("state");
  SetJWTToken(false); //deletes the axios header...
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
}