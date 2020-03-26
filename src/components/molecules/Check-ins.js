import React, { useState } from "react";
import Loader from "../Loader";
import { useCollection } from "react-firebase-hooks/firestore";
import addDays from "date-fns/addDays";
import fromUnixTime from "date-fns/fromUnixTime";
import format from "date-fns/format";
let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase");
}

const CheckInItem = ({
  name,
  phone_number,
  uid,
  check_in,
  cb,
  risk,
  noCheckIn
}) => {
  const [checkedIn, setCheckedIn] = useState(false);

  if (checkedIn) {
    return (
      <div className="col-xs-12 row is-light-grey-bg margin-5-tb pad-5">
        <div className="col-xs-12  text-align-center">
          <h3>How often should we check in with {name}?</h3>
        </div>

        <div className="col-xs-12 col-md-4 text-align-center">
          <button
            className="bubble-button-secondary margin-1"
            style={{ width: "100%" }}
            onClick={() => cb(uid, 1)}
          >
            Every Day
          </button>
        </div>
        <div className="col-xs-12 col-md-4 text-align-center">
          <button
            className="bubble-button-secondary margin-1"
            style={{ width: "100%" }}
            onClick={() => cb(uid, 2)}
          >
            Every Second Day
          </button>
        </div>
        <div className="col-xs-12 col-md-4 text-align-center">
          <button
            className="bubble-button-secondary margin-1"
            style={{ width: "100%" }}
            onClick={() => cb(uid, 3)}
          >
            Every Three Days
          </button>
        </div>
      </div>
    );
  }
  if (noCheckIn) {
    return (
      <>
        <div className="col-xs-12 ">
          <h3>{name}</h3>
          <h4>
            Last check-in was on{" "}
            {format(fromUnixTime(check_in.last.seconds), "dd/MM 'at' HH:mma")}{" "}
            with {check_in.volunteerName}.{" "}
            {risk
              ? `A volunteer suggested we should check in with this person every ${risk} day${
                  risk > 1 ? "s" : ""
                }.`
              : ""}
          </h4>
          <h4 className="is-pink">
            Next check-in will be due on{" "}
            {format(fromUnixTime(check_in.due.seconds), "dd/MM 'at' HH:mma")}
          </h4>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="col-xs-12 col-md-9">
        <h3>{name}</h3>
        <p>{phone_number}</p>
        {check_in ? (
          <h4 className="is-pink">
            Last check-in was on{" "}
            {format(fromUnixTime(check_in.last.seconds), "dd/MM 'at' HH:mma")}{" "}
            with {check_in.volunteerName}
          </h4>
        ) : (
          <h4 className="is-pink">This will be their first check-in!</h4>
        )}
      </div>
      <div className="col-xs-12 col-md-3 margin-3-b flex align-vertical">
        <button
          className={`bubble-button is-green-bg`}
          style={{ width: "100%" }}
          onClick={() => (!risk ? setCheckedIn(true) : cb(uid, risk))}
        >
          I Checked In
        </button>
      </div>
    </>
  );
};

export default ({ wrapper: Wrapper, user }) => {
  const [users, usersLoading, volunteerError] = useCollection(
    firebase.firestore().collection(`users`),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  const addCheckIn = (id, risk) => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .set(
        {
          risk: risk,
          check_in: {
            last: new Date(),
            due: addDays(new Date(), risk),
            volunteerName: user.name,
            phone_number: user.phone_number
          }
        },
        { merge: true }
      );
  };

  if (usersLoading) {
    return (
      <div className="row">
        <div className="row container">
          <div className="col-xs-12 margin-5-b text-align-center">
            <Loader />
            <h2>Loading community...</h2>
          </div>
        </div>
      </div>
    );
  }
  let vulnerable = [];

  if (!usersLoading) {
    users.forEach(subDoc => {
      if (
        subDoc.data().type === "vulnerable" &&
        !subDoc.data().check_in_opt_out
      ) {
        vulnerable.push(subDoc.data());
      }
    });
  }
  let due = vulnerable.filter(item => {
    if (!item.check_in) {
      return true;
    }

    if (item.check_in.due.seconds < new Date().getTime() / 1000) {
      return true;
    }
    return false;
  });
  let comingUp = vulnerable.filter(item => {
    if (!item.check_in) {
      return false;
    }
    if (item.check_in.due.seconds > new Date().getTime() / 1000) {
      return true;
    }
    return false;
  });
  return (
    <Wrapper>
      <div className="row">
        <div className="col-xs-12">
          <h1>Check-Ins</h1>
        </div>

        <div className="col-xs-12">
          <h2 className="margin-0">Due</h2>
        </div>
        {due.map(item => (
          <CheckInItem {...item} cb={addCheckIn} />
        ))}
        {due.length === 0 && (
          <div className="col-xs-12 margin-5-tb pad-5-lr pad-3-tb is-light-grey-bg border-radius text-align-center">
            <p>🚀 No check-ins are currently due!</p>
          </div>
        )}
        <div className="col-xs-12">
          <h2 className="margin-0">Coming up</h2>
        </div>
        {comingUp.map(item => (
          <CheckInItem {...item} cb={addCheckIn} noCheckIn />
        ))}
        {comingUp.length === 0 && (
          <div className="col-xs-12 margin-5-tb pad-5-lr pad-3-tb is-light-grey-bg border-radius text-align-center">
            <p>🚀 No check-ins are coming up!</p>
          </div>
        )}
      </div>
    </Wrapper>
  );
};
