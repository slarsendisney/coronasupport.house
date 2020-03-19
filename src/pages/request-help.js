import React, { useState } from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";
import { setDate } from "date-fns/esm";

let firebase;

// if (typeof window !== "undefined") {
//   const config = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DB_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_SB,
//     messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID
//   };
firebase = require("firebase");
//   firebase.initializeApp(config);
// }

export default () => {
  const [data, setData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  function handleChange(evt) {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value
    });
  }
  function submitData() {
    const payload = {
      ...data,
      time: parseInt((new Date().getTime() / 1000).toFixed(0))
    };
    console.log({ payload });
    firebase
      .firestore()
      .collection("cases")
      .add(payload)
      .then(() => setSubmitted(true));
  }
  return (
    <Layout>
      <div className="row container">
        {submitted ? (
          <>
            <div className="col-xs-12">
              <h1>Request Submitted </h1>
            </div>
            <div className="col-xs-12 pad-5-lr pad-3-tb is-light-grey-bg border-radius">
              <h4>
                👍 We have recieved your request! One of our network volunteers
                will be in touch shortly. Please avoid submitting multiple
                tickets.
              </h4>
            </div>
            <div className="col-xs-12 text-align-center pad-5-t">
              <Link to="/">
                <button
                  className="bubble-button-secondary"
                  style={{ width: "100%", maxWidth: 300 }}
                >
                  Done
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="col-xs-12">
              <h1>Request Support </h1>
            </div>
            <div className="col-xs-12 pad-5-lr pad-3-tb is-light-grey-bg border-radius">
              <h4>
                💡 Before requesting help, please ensure you are located within
                the Sussex Square & Lewes Crescent Mutual Aid Network{" "}
                <Link to="/network-map" className="is-pink">
                  on this map
                </Link>
                .
              </h4>
            </div>
            <div className="col-xs-12">
              <h2 className="margin-1-b">Your Name</h2>
              <input
                className="input"
                value={data.name}
                name="name"
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-xs-12">
              <h2 className="margin-1-b">Your Phone Number</h2>
              <input
                className="input"
                name="phone_number"
                value={data.phone_number}
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-xs-12">
              <h2 className="margin-1-b">Your Street Address</h2>
              <input
                className="input"
                name="address"
                value={data.address}
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-xs-12">
              <h2 className="margin-1-b">Your Request</h2>
              <textarea
                className="input"
                name="request"
                style={{ minHeight: "30vh" }}
                value={data.request}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-xs-12">
              <button
                className="bubble-button"
                style={{ width: "100%", maxWidth: 300 }}
                onClick={submitData}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};
