import React from "react";
import { Link } from "gatsby";
import Switch from "react-switch";
import latLonDistance from "../utils/LatLonDistance";
import fromUnixTime from "date-fns/fromUnixTime";
import format from "date-fns/format";

import Loader from "../Loader";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase");
}
export default ({ user }) => {
  const [users, usersLoading, volunteerError] = useCollectionOnce(
    firebase.firestore().collection(`users`),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );
  const switchToggle = (toggle, value) => {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set(
        {
          [toggle]: value
        },
        { merge: true }
      );
  };

  const { check_in_opt_out, risk, check_in } = user;
  console.log(user);
  if (usersLoading) {
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
  let volunteerList = [];
  if (!usersLoading) {
    users.forEach(subDoc => {
      if (
        subDoc.data().type === "volunteer" &&
        !subDoc.data().search_opt_out &&
        subDoc.data().name
      ) {
        volunteerList.push(subDoc.data());
      }
    });
  }

  const closestVolunteer = volunteerList.reduce((acc, cur) => {
    const dist = latLonDistance(
      cur.latLng.lat,
      cur.latLng.lng,
      user.latLng.lat,
      user.latLng.lng
    );
    if (!acc.dist || acc.dist > dist) {
      return { dist, ...cur };
    }
    return acc;
  }, {});
  console.log(closestVolunteer);
  return (
    <div className="row">
      <div className="col-xs-12 margin-5-b">
        <h1> Welcome {user.name}!</h1>
        <div className="line " />
      </div>
      <div className="col-xs-12 margin-5-b pad-5-lr pad-3-tb is-light-grey-bg border-radius text-align-center">
        <p>
          ❤️ Thanks for registering yourself as vulnerable - by doing so we will
          take extra care to ensure you are safe during this difficult time.
        </p>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <Link to="community/request">
          <button className="bubble-button margin-1" style={{ width: "100%" }}>
            Request Help
          </button>
        </Link>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <Link to="community/map">
          <button
            className="bubble-button-secondary margin-1"
            style={{ width: "100%" }}
          >
            See community Map
          </button>
        </Link>
      </div>
      <div className="col-xs-12 col-md-4 text-align-center">
        <Link to="/settings">
          <button
            className="bubble-button-secondary margin-1"
            style={{ width: "100%" }}
          >
            Change Settings
          </button>
        </Link>
      </div>
      <div className="col-xs-12 margin-5-t">
        <h3>Check-in Service</h3>
      </div>
      <div className="col-xs-12 flex align-horizontal margin-2-t">
        <Switch
          onChange={() => {
            switchToggle("check_in_opt_out", !check_in_opt_out);
          }}
          checked={!check_in_opt_out}
          className="react-switch"
        />
        <h3 className="margin-0 margin-2-l">Check In With Me</h3>
      </div>
      <div className="col-xs-12 margin-5-t">
        <p className="margin-0 margin-2-r is-medium-grey">
          When switched on, we'll make sure that one of our volunteer checks in
          with you by phone or text every few days.
        </p>
      </div>
      {risk && (
        <div className="col-xs-12 margin-5-tb pad-5-lr pad-3-tb is-light-grey-bg border-radius text-align-center">
          <p>
            Your last check-in was with {check_in.volunteerName}, you can reach
            them on {check_in.phone_number}. We'll reach out again on{" "}
            {format(fromUnixTime(check_in.due.seconds), "dd MMMM")} .
          </p>
        </div>
      )}
      <div className="col-xs-12 margin-10-t ">
        <h3 className="margin-0">Your Closest Volunteer</h3>
      </div>
      <div className="col-xs-12  ">
        <h3>{closestVolunteer.name}</h3>
        <p>{closestVolunteer.address}</p>
        <p>{closestVolunteer.phone_number}</p>
      </div>
    </div>
  );
};
