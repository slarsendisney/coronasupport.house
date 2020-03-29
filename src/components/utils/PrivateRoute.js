import React, { Component } from "react";
import { navigate } from "gatsby";
import { useDocument } from "react-firebase-hooks/firestore";
import Layout from "../layout";
import Loader from "../Loader";
import ChooseRole from "../molecules/ChooseRole";
import AddressAdd from "../molecules/AddressAdd";

let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase");
}

const PrivateRoute = ({
  component: Component,
  location,
  auth,
  basepath,
  ...rest
}) => {
  const [user, userLoading, volunteerError] = useDocument(
    firebase.firestore().doc(`users/${auth ? auth.uid : "1"}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );
  if (!auth) {
    navigate(basepath + "/login");
    return null;
  }
  if (userLoading) {
    return (
      <div className="row container">
        <div className="col-xs-12 margin-5-b text-align-center">
          <Loader />
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }
  const userObj = { ...auth, ...user.data() };
  console.log(userObj);
  if (!userObj.type) {
    return (
      <Layout loggedIn={user}>
        <div className="container">
          <ChooseRole user={userObj} />
        </div>
      </Layout>
    );
  }
  const { type, address } = userObj;
  if (!address) {
    return (
      <Layout loggedIn={user}>
        <div className="container">
          <AddressAdd user={userObj} />
        </div>
      </Layout>
    );
  }
  return (
    <Layout loggedIn={user} uid={userObj.uid}>
      <div className="container">
        <Component {...rest} user={userObj} />
      </div>
    </Layout>
  );
};
export default PrivateRoute;
