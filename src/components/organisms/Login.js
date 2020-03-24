import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

let firebase;
let uiConfig;

export default ({ redirectURL, role }) => {
  if (typeof window !== "undefined") {
    // const config = {
    //   apiKey: process.env.FIREBASE_API_KEY,
    //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    //   databaseURL: process.env.FIREBASE_DB_URL,
    //   projectId: process.env.FIREBASE_PROJECT_ID,
    //   storageBucket: process.env.FIREBASE_SB,
    //   messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
    //   appId: process.env.FIREBASE_APP_ID
    // };
    firebase = require("firebase");
    // firebase.initializeApp(config);

    uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: "popup",
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: redirectURL
    };
  }
  return (
    <div className="row">
      <div className="col-xs-12 margin-5-b text-align-center pad-10-t">
        <h1>{role} Login </h1>
        <div className="line margin-3-b margin-auto-l margin-auto-r" />
      </div>
      <div className="col-xs-12 text-align-center">
        <p className="margin-5-b">
          Click the buttons below to sign-in/register:
        </p>

        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase ? firebase.auth() : null}
        />
      </div>
    </div>
  );
};
