import React, { useState, useEffect } from "react";
import { format, fromUnixTime } from "date-fns";

import { useCollection } from "react-firebase-hooks/firestore";
import Loader from "../../components/Loader";

let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase");
}

const updateACase = (id, keyValues, cb) => {
  firebase
    .firestore()
    .collection("cases")
    .doc(id)
    .update({
      ...keyValues
    });
};

export default () => {
  const [showArchive, setShowArchive] = useState(false);
  const [cases, loading, error] = useCollection(
    firebase.firestore().collection("cases"),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );
  const currentCases = [];
  if (!loading) {
    cases.forEach(subDoc => {
      currentCases.push({ data: subDoc.data(), id: subDoc.id });
    });
  }

  const activeCases = currentCases.filter(item => !item.data.archived);
  const archivedCases = currentCases.filter(
    item =>
      item.data.archived &&
      item.data.claimedBy === firebase.auth().currentUser.uid
  );
  const yourCases = activeCases.filter(
    item => item.data.claimedBy === firebase.auth().currentUser.uid
  );
  const openCases = activeCases.filter(item => !item.data.claimed);
  if (loading) {
    return (
      <div className="row">
        <div className="row container">
          <div className="col-xs-12 margin-5-b text-align-center">
            <Loader />
            <h2>Loading cases...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-xs-12">
        <h1>Your Claimed Requests:</h1>
      </div>
      {yourCases.length > 0 ? (
        <>
          {yourCases.map(item => {
            const { name, phone_number, request, time, address } = item.data;
            return (
              <>
                <div className="col-xs-12 col-md-6" key={name + phone_number}>
                  <h3>
                    {name} - <span className="is-pink">{phone_number}</span>
                  </h3>
                  <p>{address}</p>
                  <p>{format(fromUnixTime(time), "MM/dd HH:mm")}</p>
                  <p>{request}</p>
                </div>
                <div className="col-xs-12 col-md-3 margin-3-b flex align-vertical">
                  <button
                    className="bubble-button is-green-bg"
                    style={{ width: "100%" }}
                    onClick={() =>
                      updateACase(item.id, { archived: true }, () => {})
                    }
                  >
                    Mark as resolved
                  </button>
                </div>
                <div className="col-xs-12 col-md-3 margin-3-b flex align-vertical">
                  <button
                    className="bubble-button"
                    style={{ width: "100%" }}
                    onClick={() =>
                      updateACase(
                        item.id,
                        { claimed: false, claimedBy: "" },
                        () => {}
                      )
                    }
                  >
                    Move back to open
                  </button>
                </div>
                <div
                  className="col-xs-12 is-light-grey-bg margin-3-tb"
                  style={{ height: 2 }}
                />
              </>
            );
          })}
        </>
      ) : (
        <div className="col-xs-12 pad-5-lr pad-3-tb is-light-grey-bg border-radius text-align-center">
          <p>You have not claimed any requests 🚀</p>
        </div>
      )}

      {archivedCases.length > 0 && (
        <>
          {showArchive ? (
            <>
              <div className="col-xs-12 text-align-center">
                <button role="button" onClick={() => setShowArchive(false)}>
                  <h4 className="is-dark-blue">Hide Archive</h4>
                </button>
              </div>

              {archivedCases.map(item => {
                const {
                  name,
                  phone_number,
                  request,
                  time,
                  address
                } = item.data;
                return (
                  <>
                    <div className="col-xs-12" key={name + phone_number}>
                      <h3>
                        {name} - <span className="is-pink">{phone_number}</span>
                      </h3>
                      <p>{address}</p>
                      <p>{format(fromUnixTime(time), "MM/dd HH:mm")}</p>
                      <p>{request}</p>
                    </div>

                    <div
                      className="col-xs-12 is-light-grey-bg margin-3-tb"
                      style={{ height: 2 }}
                    />
                  </>
                );
              })}
            </>
          ) : (
            <div className="col-xs-12 text-align-center">
              <button role="button" onClick={() => setShowArchive(true)}>
                <h4 className="is-dark-blue">View Your Archived Cases</h4>
              </button>
            </div>
          )}
        </>
      )}

      <div className="col-xs-12 pad-5-b">
        <h1>Open Requests:</h1>
        {yourCases.length > 2 && (
          <h4>⚠️ You cannot have more than three opened claimed cases.</h4>
        )}
      </div>
      {openCases.length > 0 ? (
        <>
          {openCases.map(item => {
            const { name, phone_number, request, time, address } = item.data;
            return (
              <>
                <div className="col-xs-12 col-md-9" key={name + phone_number}>
                  <h3>
                    {name} - <span className="is-pink">{phone_number}</span>
                  </h3>
                  <p>{address}</p>
                  <p>{format(fromUnixTime(time), "MM/dd HH:mm")}</p>
                  <p>{request}</p>
                </div>
                <div className="col-xs-12 col-md-3 margin-3-b flex align-vertical">
                  <button
                    className={`bubble-button is-green-bg`}
                    style={{ width: "100%" }}
                    onClick={() =>
                      updateACase(
                        item.id,
                        {
                          claimed: true,
                          claimedBy: firebase.auth().currentUser.uid
                        },
                        () => {}
                      )
                    }
                    disabled={yourCases.length > 2}
                  >
                    Claim
                  </button>
                </div>
                <div
                  className="col-xs-12 is-light-grey-bg margin-3-tb"
                  style={{ height: 2 }}
                />
              </>
            );
          })}
        </>
      ) : (
        <div className="col-xs-12 pad-5-lr pad-3-tb is-light-grey-bg border-radius text-align-center">
          <p>No open requests 😄</p>
        </div>
      )}
    </div>
  );
};
