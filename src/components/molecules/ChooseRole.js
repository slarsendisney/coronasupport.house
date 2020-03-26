import React from "react";
import { useState } from "react";
let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase");
}

export default ({ user }) => {
  const [selected, setSelected] = useState();

  const confirmRole = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set(
        {
          type: selected
        },
        { merge: true }
      );
  };

  return (
    <div className="row container">
      <div className="col-xs-12">
        <h1> Hi {user.displayName}!</h1>
        <div className="line " />
      </div>
      <div className=" margin-5-t col-xs-12 text-align-center">
        <h3>
          Please start by telling us are you a volunteer or a member of our
          community who might need support.
        </h3>
      </div>

      <div
        className="col-xs-12 flex pad-10-t"
        style={{ justifyContent: "center" }}
      >
        <button
          className="bubble-button-secondary margin-10-r"
          style={{
            height: 100,
            width: 200,
            opacity: selected === "volunteer" ? 0.6 : 1,
            transform: `scale(${selected === "vulnerable" ? 1.2 : 1})`
          }}
          onClick={() => setSelected("vulnerable")}
        >
          I might need support.
        </button>
        <button
          className="bubble-button-secondary"
          style={{
            height: 100,
            width: 200,
            opacity: selected === "vulnerable" ? 0.6 : 1,
            transform: `scale(${selected === "volunteer" ? 1.2 : 1})`
          }}
          onClick={() => setSelected("volunteer")}
        >
          I am a volunteer.
        </button>
      </div>
      {selected && (
        <div className="col-xs-12 text-align-center margin-5-t">
          <h4> Sure?</h4>
          <button
            className="bubble-button"
            style={{
              width: 200
            }}
            onClick={confirmRole}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};
