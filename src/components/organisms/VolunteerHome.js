import React from "react";
import Loader from "../../components/Loader";
import VolunteerAddressAdd from "./VolunteersAddressAdd";
import { useCollection } from "react-firebase-hooks/firestore";
import { Link } from "gatsby";

let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase");
}

export default ({ user }) => {
  const [users, usersLoading, volunteerError] = useCollection(
    firebase.firestore().collection(`users`),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  const [cases, casesLoading, casesError] = useCollection(
    firebase.firestore().collection(`cases`),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  let addressPresent = false;
  let volunteercount = 0;
  let activeCases = 0;
  let openCases = 0;
  let closedCases = 0;
  let userType = "";
  if (!usersLoading && !casesLoading) {
    users.forEach(subDoc => {
      if (subDoc.data().type === "volunteer") {
        volunteercount++;
        if (subDoc.data().uid === user.uid) {
          userType = subDoc.data().type;
        }
        if (subDoc.data().address && subDoc.data().uid === user.uid) {
          addressPresent = true;
        }
      }
    });
    cases.forEach(subDoc => {
      const { archived, claimed } = subDoc.data();
      if (archived) {
        closedCases++;
      } else if (claimed) {
        activeCases++;
      } else {
        openCases++;
      }
    });
  }
  if (usersLoading || casesLoading) {
    return (
      <div className="row">
        <div className="row container">
          <div className="col-xs-12 margin-5-b text-align-center">
            <Loader />
            <h2>Loading profile...</h2>
          </div>
        </div>
      </div>
    );
  }
  if (!addressPresent) {
    return <VolunteerAddressAdd />;
  }
  if (userType !== "volunteer") {
    return (
      <div className="row">
        <div className="row container">
          <div className="col-xs-12 margin-5-b text-align-center">
            <h2>Only registered volunteers can access this page.</h2>
          </div>
          <div className="col-xs-12 margin-5-b text-align-center">
            <Link to="/">
              <button className="bubble-button">Return Home</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-xs-12 margin-5-b">
        <h1> Welcome {user.displayName}!</h1>
        <div className="line " />
      </div>
      <div className="col-xs-12 margin-5-b pad-5-lr pad-3-tb is-light-grey-bg border-radius text-align-center">
        <p>
          🎉 Thanks for signing up as a volunteer - come back regularly to make
          sure we handle any open requests.
        </p>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <Link to="/volunteers/requests">
          <button className="bubble-button margin-1" style={{ width: "100%" }}>
            See Requests
          </button>
        </Link>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <Link to="/volunteers/map">
          <button
            className="bubble-button-secondary margin-1"
            style={{ width: "100%" }}
          >
            Volunteer Map
          </button>
        </Link>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <Link to="/volunteers/search">
          <button
            className="bubble-button-secondary margin-1"
            style={{ width: "100%" }}
          >
            Search Volunteers
          </button>
        </Link>
      </div>
      <div className="col-xs-12 margin-5-tb">
        <h2>Overview</h2>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <Link to="/volunteers/requests">
          <h1 className={`${openCases > 0 ? "is-pink" : "is-dark-blue"}`}>
            <span className={`${openCases > 0 ? "pulse pad-1" : ""}`}>
              {openCases}
            </span>
          </h1>
          <h4 className="is-dark-blue">Open Cases</h4>
        </Link>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <h1>{activeCases}</h1>
        <h4>Active Cases</h4>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <h1>{closedCases}</h1>
        <h4>Closed Cases</h4>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <h1>{volunteercount}</h1>
        <h4>Volunteers Signed Up</h4>
      </div>
      <div className="col-xs-12 margin-5-tb">
        <h2>Volunteer Guidelines</h2>
        <Link to="/volunteer-guidelines">
          <h2 className="is-pink">Click here to view volunteer guidlines.</h2>
        </Link>
      </div>
    </div>
  );
};
