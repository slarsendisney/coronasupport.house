import React, { Component } from "react";
import { navigate } from "gatsby";

const PrivateRoute = ({ component: Component, location, auth, ...rest }) => {
  if (!auth) {
    navigate("/volunteers/login");
    return null;
  }
  return <Component {...rest} />;
};
export default PrivateRoute;
