import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import Layout from "../components/layout";
import Loader from "../components/Loader";
import PrivateRoute from "../components/utils/PrivateRoute";
import Login from "../components/molecules/Login";

import { useAuth } from "../components/utils/useAuth";
import RoleRouter from "../components/organisms/RoleRouter";

const App = () => {
  const { initializing, user } = useAuth();

  if (initializing) {
    return (
      <Layout>
        <div className="row container">
          <div className="col-xs-12 margin-5-b text-align-center">
            <Loader />
            <h2>Loading info...</h2>
          </div>
        </div>
      </Layout>
    );
  } else {
    const basePath = "/community";
    return (
      <Router basepath={basePath}>
        <Login path="login" redirectURL={basePath} />
        <PrivateRoute
          path="/*"
          component={RoleRouter}
          basepath={basePath}
          auth={user}
        />
      </Router>
    );
  }
};
export default App;
