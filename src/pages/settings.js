import React from "react";
import { Router } from "@reach/router";
import PrivateRoute from "../components/utils/PrivateRoute";
import Layout from "../components/layout";
import Loader from "../components/Loader";
import Settings from "../components/molecules/SettingsPage";
import Login from "../components/molecules/Login";
import { useAuth } from "../components/utils/useAuth";

const App = () => {
  const { initializing, user } = useAuth();
  if (initializing) {
    return (
      <Layout>
        <div className="row container">
          <div className="col-xs-12 margin-5-b text-align-center">
            <Loader />
            <h2>Loading your info...</h2>
          </div>
        </div>
      </Layout>
    );
  } else {
    const basePath = "/settings";
    return (
      <Router basepath={basePath}>
        <Login path="login" redirectURL="/settings" role="" />
        <PrivateRoute
          path="/"
          basepath={basePath}
          component={() => <Settings user={user} />}
          auth={user}
          redirect="/"
        />
      </Router>
    );
  }
};
export default App;
