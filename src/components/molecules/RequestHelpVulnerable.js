import React, { useState } from "react";
import Layout from "../layout";
import { Link } from "gatsby";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { sendText } from "../../services/sendsms";
import Loader from "../Loader";

let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase");
}

export default ({ user, noLayout }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAddressChange = (address) => {
    setData({
      ...data,
      address,
    });
  };

  const handleAddressSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setData({
          ...data,
          address,
          latLng,
        });
      })
      .catch((error) => console.error("Error", error));
  };

  function handleChange(evt) {
    console.log(evt);
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value,
    });
  }
  const setComplete = () => {
    setSubmitted(true);
    setLoading(false);
  };
  function submitData() {
    setLoading(true);
    let payload = user
      ? {
          address: user.address,
          latlng: user.latLng,
          phone_number: user.phone_number,
          ...data,
          time: parseInt((new Date().getTime() / 1000).toFixed(0)),
        }
      : {
          ...data,
          time: parseInt((new Date().getTime() / 1000).toFixed(0)),
        };
    firebase
      .firestore()
      .collection("cases")
      .add(payload)
      .then(() => {
        sendText(data.name, setComplete);
      });
  }
  if (loading) {
    return (
      <div className="row container">
        <div className="col-xs-12 margin-5-b text-align-center">
          <Loader />
          <h2>Sending Request...</h2>
        </div>
      </div>
    );
  }
  return (
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
          {!user && (
            <>
              <div className="col-xs-12">
                <h2 className="margin-1-b">Your Name</h2>
                <input
                  className="input"
                  value={data.name}
                  name="name"
                  id="name-input"
                  key="name-input"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="col-xs-12">
                <h2 className="margin-1-b">Your Phone Number</h2>
                <input
                  className="input"
                  name="phone_number"
                  id="phone-input"
                  key="phone-input"
                  value={data.phone_number}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="col-xs-12">
                <h2>Your Address</h2>

                <PlacesAutocomplete
                  value={data.address}
                  onChange={handleAddressChange}
                  onSelect={handleAddressSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <input
                        {...getInputProps({
                          placeholder: "Search Places...",
                          className: "input",
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
                        {suggestions.map((suggestion) => {
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
                                style,
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
            </>
          )}

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
  );
};
