import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Switch from "react-switch";
import { Link } from "gatsby";
let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase");
}

export default ({ user, wrapper: Wrapper }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [complete, setComplete] = useState(false);
  const [check_in_opt_out, setCheckInOptOut] = useState(false);
  const addVolunteerDetails = () => {
    const { latLng, address, name, phone_number } = data;
    if (latLng && address && name && phone_number) {
      firebase
        .firestore()
        .collection("users")
        .add({
          ...data,
          type: "vulnerable",
          check_in_opt_out,
          created_by: user.uid,
        });
      setComplete(true);
    } else {
      setError(
        "⚠️ Please make sure you have filled in all fields and selected the address from the list!"
      );
    }
  };

  const handleAddressChange = (address) => {
    setData({ ...data, address });
  };

  const handleAddressSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setData({ ...data, address, latLng });
      })
      .catch((error) => console.error("Error", error));
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setData({
      ...data,
      [evt.target.name]: value,
    });
  };

  return (
    <div className="row">
      <div className="col-xs-12 margin-5-b">
        <h1>Vulnerable Registration</h1>
        <div className="line" />
      </div>
      {complete ? (
        <>
          <div className="col-xs-12 margin-5-b pad-5-lr pad-3-tb is-light-grey-bg border-radius text-align-center">
            <h2>✅ Registration Complete</h2>
            <p>{data.name} has been registered successfully.</p>
            <Link to="/community">
              <button
                className="bubble-button-secondary"
                style={{ minWidth: 250 }}
              >
                Go Home
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="col-xs-12 margin-5-b pad-5-lr pad-3-tb is-light-grey-bg border-radius text-align-center">
            <p>
              ⚠️ Please ensure you have the person's permission before
              registering them as vulnerable. Also ensure they have not
              registered themselves - if they have, you will be able to find
              them in the community search.
            </p>
          </div>
          <div className="col-xs-12 ">
            {error && (
              <div className="col-xs-12 pad-3-lr pad-1-tb is-pink-bg border-radius">
                <h4>{error}</h4>{" "}
              </div>
            )}
            <div className="col-xs-12">
              <h2 className="margin-1-b">Name</h2>
              <input
                className="input"
                value={data.name}
                name="name"
                onChange={handleChange}
                placeholder="Name"
              ></input>
            </div>
            <div className="col-xs-12">
              <h2 className="margin-1-b">Phone Number</h2>
              <input
                className="input"
                name="phone_number"
                value={data.phone_number}
                onChange={handleChange}
                placeholder="Number"
              ></input>
            </div>
            <div className="col-xs-12">
              <h2>Address</h2>
              <p>
                You must select the address from the list that is generated when
                you start typing. If your address is not present in the list,
                try ommiting your flat number.
              </p>
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
            <div className="col-xs-12 flex align-horizontal margin-2-t">
              <Switch
                onChange={() => {
                  setCheckInOptOut(!check_in_opt_out);
                }}
                checked={!check_in_opt_out}
                className="react-switch"
              />
              <h3 className="margin-0 margin-2-l">Check In With This Person</h3>
            </div>
            <div className="col-xs-12 margin-5-t">
              <p className="margin-0 margin-2-r is-medium-grey">
                When switched on, we'll make sure that one of our volunteer
                checks in with this person by phone or text every few days.
              </p>
            </div>
            <div className="col-xs-12 margin-5-t">
              <button
                className="bubble-button-secondary"
                style={{ minWidth: 250 }}
                onClick={() => addVolunteerDetails()}
              >
                Register
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
