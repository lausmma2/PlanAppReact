import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import GroupDashboard from './components/GroupDashboard';
import Header from './components/layout/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddTrip from './components/trip/AddTrip';
import { Provider } from "react-redux";
import store from './store';
import Landing from './components/layout/Landing';
import Register from './components/userManagement/Register';
import Login from './components/userManagement/Login';
import AfterRegistrationPage from './components/layout/AfterRegistrationPage';
import jwt_decode from "jwt-decode";
import SetJWTToken from "./securityUtils/SetJWTToken";
import { SET_CURRENT_USER } from './actions/types';
import { logout } from "./actions/securityActions";
import UserInfo from './components/userManagement/UserInfo';
import AddTripGroup from './components/tripGroup/AddTripGroup';
import ChooseTripType from './components/trip/ChooseTripType';
import ChooseTripPage from './components/trip/ChooseTripPage';
import UpdateTripGroup from './components/tripGroup/UpdateTripGroup';
import TripDetail from './components/trip/TripDetail';
import TripUpdate from './components/trip/TripUpdate';
import TripGroupDashboard from './components/TripGroupDashboard';
import SecuredRoute from "./securityUtils/SecureRoute";

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
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {
              //Public routes
            }
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {
              //Private routes
            }
            <Switch>
              <SecuredRoute exact path="/dashboard" component={Dashboard} />
              <SecuredRoute exact path="/groupDashboard" component={GroupDashboard} />
              <SecuredRoute exact path="/addTrip" component={AddTrip} />
              <SecuredRoute exact path="/confirmation" component={AfterRegistrationPage} />
              <SecuredRoute exact path="/user-info" component={UserInfo} />
              <SecuredRoute exact path="/add-trip-group" component={AddTripGroup} />
              <SecuredRoute exact path="/choose-trip-type/:id" component={ChooseTripType} />
              <SecuredRoute exact path="/choose-trip" component={ChooseTripPage} />
              <SecuredRoute exact path="/update-trip-group/:id" component={UpdateTripGroup} />
              <SecuredRoute exact path="/tripDetail/:id" component={TripDetail} />
              <SecuredRoute exact path="/update-trip/:id" component={TripUpdate} />
              <SecuredRoute exact path="/trip-group/dashboard/:id" component={TripGroupDashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
