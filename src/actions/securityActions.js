import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import SetJWTToken from "../securityUtils/SetJWTToken";
import jwt_decode from "jwt-decode";
import { getUsersInfo } from './userActions';
import { getTripGroups } from './tripGroupActions';

//creates new user and send user to /confirmation page
export const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post("https://planapp-spring.herokuapp.com/register", newUser)
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

//sign in user
export const login = LoginRequest => async dispatch => {
  try {
    const res = await axios.post("https://planapp-spring.herokuapp.com/login", LoginRequest);
    //get token from res
    const { token } = res.data;
    //store the token in the localStorage
    localStorage.setItem("jwtToken", token);
    //set the token in header
    SetJWTToken(token);
    //decode token
    const decoded = jwt_decode(token);
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

//method to logout
export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken"); //remove jwtToken from localStorage
  SetJWTToken(false); //deletes the header setted in login method
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
}