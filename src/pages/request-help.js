import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";

// Configure Firebase.

export default () => (
  <Layout>
    <div className="row container">
      <div className="col-xs-12">
        <h1>Request Support </h1>
      </div>
      <div className="col-xs-12 pad-5-lr pad-3-tb is-light-grey-bg border-radius">
        <h4>
          💡 Before requesting help, please ensure you are located within the
          Sussex Square & Lewes Crescent Mutual Aid Network{" "}
          <Link to="/network-map" className="is-pink">
            on this map
          </Link>
          .
        </h4>
      </div>
      <div className="col-xs-12">
        <h2 className="margin-1-b">Your Name</h2>
        <input className="input"></input>
      </div>
      <div className="col-xs-12">
        <h2 className="margin-1-b">Your Phone Number</h2>
        <input className="input"></input>
      </div>
      <div className="col-xs-12">
        <h2 className="margin-1-b">Your Street Address</h2>
        <input className="input"></input>
      </div>
      <div className="col-xs-12">
        <h2 className="margin-1-b">Your Request</h2>
        <textarea className="input" style={{ minHeight: "30vh" }}></textarea>
      </div>
      <div className="col-xs-12">
        <button
          className="bubble-button"
          style={{ width: "100%", maxWidth: 300 }}
        >
          Submit
        </button>
      </div>
    </div>
  </Layout>
);
