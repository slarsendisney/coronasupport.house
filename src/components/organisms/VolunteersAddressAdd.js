import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase");
}

export default () => {
  const [data, setData] = useState({});
  const [error, setError] = useState();

  const addVolunteerDetails = () => {
    const { latLng, address, name, phone_number } = data;
    if (latLng && address && name && phone_number) {
      firebase
        .firestore()
        .collection("volunteers")
        .doc(firebase.auth().currentUser.uid)
        .set({
          ...data,
          uid: firebase.auth().currentUser.uid
        });
    } else {
      setError(
        "⚠️ Please make sure you have filled in all fields and selected your address!"
      );
    }
  };

  const handleAddressChange = address => {
    setData({ ...data, address });
  };

  const handleAddressSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setData({ ...data, address, latLng });
      })
      .catch(error => console.error("Error", error));
  };

  const handleChange = evt => {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value
    });
  };

  return (
    <div className="row">
      <div className="col-xs-12 margin-5-b">
        <h1>One Last Thing...</h1>
        <div className="line" />
      </div>
      <div className="col-xs-12 ">
        <p className="margin-5-b">
          We're trying to map volunteers in our support network so that we can
          identify areas we need to focus on.Please provide us with your name,
          street address and phone number. This will be accessible to those that
          have identified themselves as vulnerable.
        </p>
        {error && (
          <div className="col-xs-12 pad-3-lr pad-1-tb is-pink-bg border-radius">
            <h4>{error}</h4>{" "}
          </div>
        )}
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
            onClick={() => addVolunteerDetails()}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
