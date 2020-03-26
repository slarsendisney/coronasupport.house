/* eslint-disable jsx-a11y/heading-has-content*/
import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import { slide as Menu } from "react-burger-menu";
import Logo from "../images/Logo-Blue.svg";
import { useAuth } from "./utils/useAuth";

let firebase;
if (typeof window !== "undefined") {
  firebase = require("firebase");
}

export default () => {
  const { initializing, user } = useAuth();
  const [type, setType] = useState("");

  if (!initializing && user) {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        if (doc.data()) {
          setType(doc.data().type);
        }
      });
  }
  const volunteer = type === "volunteer" || type === "admin";
  const vulnerable = type === "vulnerable" || type === "admin";

  return (
    <>
      <Menu right>
        <Link
          id="about"
          className=""
          to="/request-help"
          style={{ fontSize: 16 }}
        >
          <button className="bubble-button" style={{ width: "100%" }}>
            Request Support
          </button>
        </Link>
        <Link id="home" className="menu-item margin-10-t" to="/">
          Home
        </Link>
        <Link id="contact" className="menu-item" to="/useful-links">
          Useful Links
        </Link>
        <Link id="contact" className="menu-item" to="/community">
          Volunteers
        </Link>
        <Link id="contact" className="menu-item" to="/community">
          Vulnerable
        </Link>

        {!initializing && volunteer && user && (
          <div className="line is-dark-dark-blue-border margin-5-t margin-3-b"></div>
        )}
        {!initializing && volunteer && user && (
          <Link id="contact" className="menu-item" to="/community/requests">
            Open Requests
          </Link>
        )}
        {!initializing && volunteer && user && (
          <Link id="contact" className="menu-item" to="/community/map">
            Volunteer Map
          </Link>
        )}
        {!initializing && volunteer && user && (
          <div className="line is-dark-dark-blue-border margin-5-t margin-3-b"></div>
        )}
        {!initializing && user && (
          <Link id="contact" className="menu-item" to="/settings">
            Settings
          </Link>
        )}
        {!initializing && user && (
          <button
            id="contact"
            className="menu-item is-dark-blue grow"
            onClick={() => {
              firebase
                .auth()
                .signOut()
                .then(function() {
                  navigate("/logout");
                })
                .catch(function(error) {
                  // An error happened
                });
            }}
          >
            Logout
          </button>
        )}
      </Menu>

      <div className="container">
        <div className="is-white-bg is-dark-blue ">
          <div className="row flex padding-0-tb ">
            <div className="col-xs-10 flex">
              <Link to="/">
                <div
                  className="margin-1-t margin-1-l flex is-dark-blue grow"
                  style={{ alignItems: "center" }}
                >
                  <img src={Logo} style={{ height: 30, marginRight: 10 }}></img>
                  <h4>Sussex Square & Lewes Crescent Mutual Aid Network</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
