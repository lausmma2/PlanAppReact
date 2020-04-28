import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Securing individual routes
const SecuredRoute = ({ component: Component, security, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props =>
      security.validToken === true ? (
        <Component {...props} />
      ) : (
          <Redirect to="/login" />
        )
    }
  />
);

//Exports range of validators that can be used to make sure the recieved data is valid
SecuredRoute.propTypes = {
  security: PropTypes.object.isRequired
};

//Necessary to connect function... selecting parts of the data from the store that this component needs
const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps)(SecuredRoute);