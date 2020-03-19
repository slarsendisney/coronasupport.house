import React, { useState, useEffect } from "react";
import { format, fromUnixTime } from "date-fns";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Layout from "../../components/layout";
// Configure Firebase.
let firebase;
let uiConfig;
if (typeof window !== "undefined") {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_SB,
    messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };
  firebase = require("firebase");
  firebase.initializeApp(config);

  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };
}

const updateACase = (id, keyValues, cb) => {
  firebase
    .firestore()
    .collection("cases")
    .doc(id)
    .update({
      ...keyValues
    })
    .then(() => cb());
};
const Requests = () => {
  const [currentCases, setCases] = useState([]);
  const updateDB = () => {
    firebase
      .firestore()
      .collection("cases")
      .get()
      .then(subCollectionSnapshot => {
        const cases = [];
        subCollectionSnapshot.forEach(subDoc => {
          console.log(subDoc.data());
          cases.push({ data: subDoc.data(), id: subDoc.id });
        });
        setCases(cases);
      });
  };
  useEffect(() => {
    updateDB();
  }, []);
  const activeCases = currentCases.filter(item => !item.data.archived);
  const yourCases = activeCases.filter(
    item => item.data.claimedBy === firebase.auth().currentUser.uid
  );
  const openCases = activeCases.filter(item => !item.data.claimed);
  return (
    <div className="row">
      <div className="col-xs-12">
        <h1>Your Claimed Requests:</h1>
      </div>
      {yourCases.length > 0 ? (
        <>
          {yourCases.map(item => {
            const { name, phone_number, request, time } = item.data;
            return (
              <>
                <div className="col-xs-12 col-md-6" key={name + phone_number}>
                  <h3>
                    {name} - <span className="is-pink">{phone_number}</span>
                  </h3>
                  <p>{format(fromUnixTime(time), "MM/dd HH:mm")}</p>
                  <p>{request}</p>
                </div>
                <div className="col-xs-12 col-md-3 margin-3-b flex align-vertical">
                  <button
                    className="bubble-button is-green-bg"
                    style={{ width: "100%" }}
                    onClick={() =>
                      updateACase(item.id, { archived: true }, updateDB)
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
                        updateDB
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
      <div className="col-xs-12">
        <h1>Open Requests:</h1>
        {yourCases.length > 3 && (
          <h4>⚠️ You cannot have more than three opened claimed cases.</h4>
        )}
      </div>
      {openCases.length > 0 ? (
        <>
          {openCases.map(item => {
            const { name, phone_number, request, time } = item.data;
            return (
              <>
                <div className="col-xs-12 col-md-9" key={name + phone_number}>
                  <h3>
                    {name} - <span className="is-pink">{phone_number}</span>
                  </h3>
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
                        updateDB
                      )
                    }
                    disabled={yourCases.length > 3}
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
class Dashboard extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  route() {
    if (!this.state.isSignedIn) {
      return (
        <>
          <div className="col-xs-12 margin-5-b">
            <h1>Volunteer Login </h1>
            <div className="line" />
          </div>
          <div className="col-xs-12 text-align-center">
            <p className="margin-5-b">
              Please sign-in to access the volunteer page:
            </p>

            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase ? firebase.auth() : null}
            />
          </div>
        </>
      );
    }
    return (
      <>
        <div className="col-xs-12 margin-5-b">
          <h1> Welcome {firebase.auth().currentUser.displayName}!</h1>
          {console.log(firebase.auth().currentUser)}
          <div className="line" />
        </div>

        <div className="col-xs-12">
          <Requests />
        </div>
        <div className="col-xs-12">
          <div className="line margin-5-tb" />
          <button
            className="bubble-button-secondary"
            onClick={() => firebase.auth().signOut()}
          >
            Sign-out
          </button>
        </div>
      </>
    );
  }
  render() {
    return (
      <Layout>
        <div className="row container">{this.route()}</div>
      </Layout>
    );
  }
}

export default Dashboard;
