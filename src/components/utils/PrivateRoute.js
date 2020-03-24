import React, { Component } from "react";
import { navigate } from "gatsby";

const PrivateRoute = ({
  component: Component,
  location,
  auth,
  basepath,
  ...rest
}) => {
  if (!auth) {
    navigate(basepath + "/login");
    return null;
  }
  return <Component {...rest} />;
};
export default PrivateRoute;
