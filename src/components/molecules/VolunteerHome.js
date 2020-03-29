import React from "react";
import Loader from "../Loader";
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

  let volunteercount = 0;
  let vulnerablecount = 0;
  let activeCases = 0;
  let openCases = 0;
  let closedCases = 0;
  let checkInsDue = 0;
  if (!usersLoading && !casesLoading) {
    users.forEach(subDoc => {
      const { type, name } = subDoc.data();
      if (name) {
        if (type === "volunteer") {
          volunteercount++;
        }
        if (type === "vulnerable") {
          vulnerablecount++;
          if (!subDoc.data().check_in_opt_out) {
            if (!subDoc.data().check_in) {
              checkInsDue++;
            } else if (
              subDoc.data().check_in.due.seconds <
              new Date().getTime() / 1000
            ) {
              checkInsDue++;
            }
          }
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

  return (
    <div className="row">
      <div className="col-xs-12 margin-5-b">
        <h1> Welcome {user.name}!</h1>
        <div className="line " />
      </div>
      <div className="col-xs-12 margin-5-b pad-5-lr pad-3-tb is-light-grey-bg border-radius text-align-center">
        <p>
          🎉 Thanks for signing up as a volunteer - come back regularly to make
          sure we handle any open requests.
        </p>
      </div>
      <div className="col-xs-12 col-md-6 text-align-center">
        <Link to="/community/requests">
          <button className="bubble-button margin-1" style={{ width: "100%" }}>
            Requests
          </button>
        </Link>
      </div>
      <div className="col-xs-12 col-md-6 text-align-center">
        <Link to="/community/check-in">
          <button className="bubble-button margin-1" style={{ width: "100%" }}>
            Check-Ins
          </button>
        </Link>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <Link to="/volunteer-guidelines">
          <button
            className="bubble-button-secondary margin-1"
            style={{ width: "100%" }}
          >
            Volunteer Guidelines
          </button>
        </Link>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <Link to="/community/map">
          <button
            className="bubble-button-secondary margin-1"
            style={{ width: "100%" }}
          >
            Volunteer Map
          </button>
        </Link>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <Link to="/community/search">
          <button
            className="bubble-button-secondary margin-1"
            style={{ width: "100%" }}
          >
            Search Community
          </button>
        </Link>
      </div>
      <div className="col-xs-12 margin-5-tb">
        <h2>Overview</h2>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <Link to="/community/requests">
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
        <Link to="/community/check-in">
          <h1 className={`${checkInsDue > 0 ? "is-pink" : "is-dark-blue"}`}>
            <span className={`${checkInsDue > 0 ? "pulse pad-1" : ""}`}>
              {checkInsDue}
            </span>
          </h1>
          <h4 className="is-dark-blue">Check-Ins Due</h4>
        </Link>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <h1>{volunteercount}</h1>
        <h4>Volunteers Signed Up</h4>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <h1>{vulnerablecount}</h1>
        <h4>Vulnerable Signed Up</h4>
      </div>
    </div>
  );
};
