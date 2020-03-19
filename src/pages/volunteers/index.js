import React, { useState, useEffect } from "react";
import { format, fromUnixTime } from "date-fns";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps";
import CoolTabs from "react-cool-tabs";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import Layout from "../../components/layout";
import Loader from "../../components/Loader";
import mapStyles from "./mapStyles.json";
// Configure Firebase.
let firebase;
let uiConfig;
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
    });
};

const Map = () => {
  const [casemarkers, setCaseMarkers] = useState([]);
  const [volunteermarkers, setVolunteerMarkers] = useState([]);
  const defaultMapOptions = {
    styles: mapStyles
  };
  const updateDB = () => {
    firebase
      .firestore()
      .collection("cases")
      .onSnapshot(subCollectionSnapshot => {
        const cases = [];
        subCollectionSnapshot.forEach(subDoc => {
          console.log(subDoc.data());
          cases.push({ data: subDoc.data(), id: subDoc.id });
        });
        // console.log(cases);
        setCaseMarkers(
          cases.filter(item => item.data.latLng && !item.data.archived)
        );
      });
    firebase
      .firestore()
      .collection("volunteers")
      .onSnapshot(subCollectionSnapshot => {
        const cases = [];
        subCollectionSnapshot.forEach(subDoc => {
          console.log(subDoc.data());
          cases.push({ data: subDoc.data(), id: subDoc.id });
        });
        // console.log(cases);
        setVolunteerMarkers(cases.filter(item => item.data.latLng));
      });
  };

  const circleOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 1,
    strokeWeight: 0,
    fillColor: "blue",
    fillOpacity: 1,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 6,
    zIndex: 1
  };
  useEffect(() => {
    console.log("mounting");
    updateDB();
  }, []);
  // console.log({ casemarkers });
  const MyMapComponent = withGoogleMap(props => (
    <GoogleMap
      defaultZoom={16}
      defaultOptions={defaultMapOptions}
      defaultCenter={{ lat: 50.8161752, lng: -0.1111561 }}
    >
      {casemarkers.map(item => (
        <Marker position={item.data.latLng} />
      ))}
      {volunteermarkers.map(item => (
        <Circle center={item.data.latLng} options={circleOptions} />
      ))}
    </GoogleMap>
  ));

  return (
    <div className="row">
      <div className="col-xs-12">
        <h1>Network Map:</h1>
      </div>
      <div className="col-xs-12 margin-5-b">
        <MyMapComponent
          isMarkerShown
          containerElement={<div style={{ height: `40vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
};

const Requests = () => {
  const [currentCases, setCases] = useState([]);
  const [showArchive, setShowArchive] = useState(false);

  const updateDB = () => {
    firebase
      .firestore()
      .collection("cases")
      .onSnapshot(subCollectionSnapshot => {
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
  const archivedCases = currentCases.filter(
    item =>
      item.data.archived &&
      item.data.claimedBy === firebase.auth().currentUser.uid
  );
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

      <div className="col-xs-12">
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
                        updateDB
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
class Dashboard extends React.Component {
  // The component's Local state.

  constructor() {
    super();
    this.state = {
      loading: true,
      isSignedIn: false, // Local signed-in state.
      addressObtained: false,
      address: "",
      data: {},
      error: undefined,
      view: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // Configure FirebaseUI.
  checkForAddress = () => {
    firebase
      .firestore()
      .collection("volunteers")
      .onSnapshot(subCollectionSnapshot => {
        var addressPresent = false;
        subCollectionSnapshot.forEach(subDoc => {
          if (
            subDoc.data().address &&
            subDoc.data().uid === firebase.auth().currentUser.uid
          ) {
            addressPresent = true;
          }
        });
        this.setState({
          addressObtained: addressPresent,
          data: { name: firebase.auth().currentUser.displayName },
          loading: false
        });
      });
  };

  addVolunteerDetails = () => {
    const { latLng, address, name, phone_number } = this.state.data;
    if (latLng && address && name && phone_number) {
      firebase
        .firestore()
        .collection("volunteers")
        .doc(firebase.auth().currentUser.uid)
        .set({
          ...this.state.data,
          uid: firebase.auth().currentUser.uid
        });
    } else {
      this.setState({
        error:
          "⚠️ Please make sure you have filled in all fields and selected your address!"
      });
    }
  };
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      if (!!user) {
        this.checkForAddress();
      } else {
        this.setState({ loading: false });
      }
    });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  handleAddressChange = address => {
    this.setState({
      data: {
        ...this.state.data,
        address
      },
      error: false
    });
  };

  handleAddressSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          data: {
            ...this.state.data,
            address,
            latLng
          },
          error: false
        });
      })
      .catch(error => console.error("Error", error));
  };

  handleChange(evt) {
    const value = evt.target.value;
    console.log(this.state.data);
    this.setState({
      data: {
        ...this.state.data,
        [evt.target.name]: value
      },
      error: false
    });
  }

  route() {
    if (this.state.loading) {
      return (
        <>
          <div className="col-xs-12 margin-5-b text-align-center">
            <Loader />
          </div>
        </>
      );
    }
    if (!this.state.isSignedIn) {
      return (
        <>
          <div className="col-xs-12 margin-5-b">
            <h1>Volunteer Login </h1>
            <div className="line" />
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
        </>
      );
    }
    if (!this.state.addressObtained) {
      return (
        <>
          <div className="col-xs-12 margin-5-b">
            <h1>One Last Thing...</h1>
            <div className="line" />
          </div>
          <div className="col-xs-12 ">
            <p className="margin-5-b">
              We're trying to map volunteers in our support network so that we
              can identify areas we need to focus on.Please provide us with your
              name, street address and phone number. This will be accessible to
              those that have identified themselves as vulnerable.
            </p>
            {this.state.error && (
              <div className="col-xs-12 pad-3-lr pad-1-tb is-pink-bg border-radius">
                <h4>{this.state.error}</h4>{" "}
              </div>
            )}
            <div className="col-xs-12">
              <h2 className="margin-1-b">Your Name</h2>
              <input
                className="input"
                value={this.state.data.name}
                name="name"
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="col-xs-12">
              <h2 className="margin-1-b">Your Phone Number</h2>
              <input
                className="input"
                name="phone_number"
                value={this.state.data.phone_number}
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="col-xs-12">
              <h2>Your Address</h2>
              <PlacesAutocomplete
                value={this.state.data.address}
                onChange={this.handleAddressChange.bind(this)}
                onSelect={this.handleAddressSelect.bind(this)}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: "Search Places...",
                        className: "input"
                      })}
                    />
                    <div className="autocomplete-dropdown-container results row">
                      {loading && (
                        <div className="col-xs-12">
                          <h4>Loading...</h4>
                        </div>
                      )}
                      {!loading && suggestions.length > 0 && (
                        <div className="col-xs-12">
                          <h4 className="is-pink">
                            Please select your address from below:
                          </h4>
                        </div>
                      )}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? "suggestion-item--active col-xs-12 is-pink is-light-grey-bg"
                          : "suggestion-item col-xs-12 is-dark-blue";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { cursor: "pointer" }
                          : { cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <h4>{suggestion.description}</h4>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
            <div className="col-xs-12 margin-5-t">
              <button
                className="bubble-button-secondary"
                style={{ minWidth: 250 }}
                onClick={() => this.addVolunteerDetails()}
              >
                Done
              </button>
            </div>
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

        <div
          className={` col-xs-6 ${
            this.state.view === 0 ? "tab-active" : "tab"
          }`}
        >
          <a onClick={() => this.setState({ view: 0 })}>
            <h2 className="margin-2-tb">Requests</h2>
          </a>
        </div>
        <div
          className={` col-xs-6 ${
            this.state.view === 1 ? "tab-active" : "tab"
          }`}
        >
          <a onClick={() => this.setState({ view: 1 })}>
            <h2 className="margin-2-tb">Map</h2>
          </a>
        </div>
        <div className="col-xs-12 tab-content">
          {this.state.view === 0 ? <Requests /> : <Map />}
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
