import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import PrivateRoute from "../../components/utils/PrivateRoute";
import Layout from "../../components/layout";
import Loader from "../../components/Loader";
import Map from "../../components/organisms/VolunteerMap";
import Requests from "../../components/organisms/VolunteerRequests";
import Home from "../../components/organisms/VolunteerHome";
import Search from "../../components/organisms/VolunteerSearch";
import Login from "../../components/organisms/Login";
import { useAuth } from "../../components/utils/useAuth";
import { Link } from "gatsby";

const NavToHomeWrapper = ({ children }) => (
  <>
    <div className="row">
      <div className="col-xs-12 margin-1-b">
        <Link to="/volunteers">
          <h3 className="is-pink margin-0"> {`< Back`}</h3>
        </Link>
      </div>
    </div>
    {children}
  </>
);
const App = () => {
  const { initializing, user } = useAuth();
  if (initializing) {
    return (
      <Layout>
        <div className="row container">
          <div className="col-xs-12 margin-5-b text-align-center">
            <Loader />
            <h2>Loading site...</h2>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout loggedIn={user}>
        <div className="container">
          <Router basepath="/volunteers">
            <PrivateRoute
              path="/map"
              component={() => (
                <NavToHomeWrapper>
                  <Map />
                </NavToHomeWrapper>
              )}
              auth={user}
            />
            <PrivateRoute
              path="/requests"
              component={() => (
                <NavToHomeWrapper>
                  <Requests />
                </NavToHomeWrapper>
              )}
              auth={user}
            />
            <PrivateRoute
              path="/search"
              component={() => (
                <NavToHomeWrapper>
                  <Search />
                </NavToHomeWrapper>
              )}
              auth={user}
            />
            <Login path="login" />
            <PrivateRoute
              path="/"
              component={() => <Home user={user} />}
              auth={user}
            />
          </Router>
        </div>
      </Layout>
    );
  }
};
export default App;
