import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddTrip from './components/trip/AddTrip';
import { Provider } from "react-redux";
import store from './store';
import Landing from './components/layout/Landing';
import Register from './components/userManagement/Register';
import Login from './components/userManagement/Login';
import AfterRegistrationPage from './components/layout/AfterRegistrationPage';
import jwt_decode from "jwt-decode";
import SetJWTToken from "./securityUtils/SetJWTToken";
import { SET_CURRENT_USER, GET_USER_INFO } from './actions/types';
import { logout } from "./actions/securityActions";
import UserInfo from './components/userManagement/UserInfo';
import Sidebar from './components/layout/Sidebar';
import UserLocation from "./UserLocation";
import AddTripGroup from './components/tripGroup/AddTripGroup';

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  SetJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    //handle logout
    store.dispatch(logout());
    window.location.href = "/";
    //window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          {
            //<UserLocation />
          }
          {
            //Public routes
          }
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          {
            //Private routes
          }
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addTrip" component={AddTrip} />
          <Route exact path="/confirmation" component={AfterRegistrationPage} />
          <Route exact path="/user-info" component={UserInfo} />
          <Route exact path="/add-trip-group" component={AddTripGroup} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
