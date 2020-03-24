import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { useDocument } from "react-firebase-hooks/firestore";
import Loader from "../../components/Loader";
import { navigate } from "gatsby";
let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase");
}

export default ({ user }) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [userObject, userObjLoading, userObjError] = useDocument(
    firebase.firestore().doc("users/" + user.uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );
  const addDetails = type => {
    const { latLng, address, name, phone_number } = data;
    if (latLng && address && name && phone_number) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set(
          {
            ...data
          },
          { merge: true }
        );
      setEdit(false);
    } else {
      setError(
        "⚠️ Please make sure you have filled in all fields and selected your address!"
      );
      setEdit(false);
    }
  };
  useEffect(() => {
    if (userObject) {
      setData({ ...userObject.data() });
    }
  }, [userObject]);
  const switchToggle = (toggle, value) => {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set(
        {
          [toggle]: value
        },
        { merge: true }
      );
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

  if (userObjLoading) {
    return (
      <div className="row">
        <div className="row container">
          <div className="col-xs-12 margin-5-b text-align-center">
            <Loader />
            <h2>Loading profile...</h2>
          </div>
        </div>
      </div>
    );
  }
  if (!userObject.data()) {
    navigate("/");
    return <div />;
  }
  const {
    name,
    address,
    phone_number,
    text_opt_out,
    search_opt_out
  } = userObject.data();

  return (
    <div className="row is-grey">
      <div className="col-xs-12 margin-5-b">
        <h1>Settings</h1>
        <div className="line" />
      </div>
      <div className="col-xs-12 margin-5-b pad-5-lr pad-3-tb is-light-grey-bg border-radius text-align-center">
        <p>
          🔧 Here you can opt-out of services, change your information or delete
          your account.
        </p>
      </div>
      <div className="col-xs-12 ">
        <h2>Services</h2>
      </div>
      <div className="col-xs-12 flex align-horizontal">
        <Switch
          onChange={() => {
            switchToggle("text_opt_out", !text_opt_out);
          }}
          checked={!text_opt_out}
          className="react-switch"
        />
        <h3 className="margin-0 margin-2-l">Text Alerts</h3>
      </div>
      <div className="col-xs-12 pad-3-t">
        <p className="margin-0 margin-2-r is-medium-grey">
          When switched on, you will recieve text message alerts from the
          community when we think its appropriate.
        </p>
      </div>
      <div className="col-xs-12 pad-3-t flex align-horizontal">
        <Switch
          onChange={() => {
            switchToggle("search_opt_out", !search_opt_out);
          }}
          checked={!search_opt_out}
          className="react-switch"
        />
        <h3 className="margin-0 margin-2-l">Appear in Community Search</h3>
      </div>
      <div className="col-xs-12 pad-3-t">
        <p className="margin-0 margin-2-r is-medium-grey">
          When switched on, your name, address and phone number can be found on
          our community lists. These are only visible to registered volunteers.
        </p>
      </div>
      <div className="col-xs-12 pad-3-t">
        <h2>Your Information</h2>
      </div>
      {edit ? (
        <>
          <div className="col-xs-12">
            <p className="margin-1-b">Your Name</p>
            <input
              className="input"
              name="name"
              value={data.name}
              onChange={handleChange}
            ></input>
          </div>
          <div className="col-xs-12">
            <p className="margin-1-b">Your Phone Number</p>
            <input
              className="input"
              name="phone_number"
              value={data.phone_number}
              onChange={handleChange}
            ></input>
          </div>
          <div className="col-xs-12">
            <p>Your Address</p>
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
          <div className="col-xs-12">
            <button
              className="bubble-button margin-2-r"
              style={{ minWidth: 250 }}
              onClick={() => setEdit(false)}
            >
              Cancel
            </button>
            <button
              className="bubble-button-secondary"
              style={{ minWidth: 250 }}
              onClick={() => addDetails()}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="col-xs-12">
            <p className="margin-1-b">Your Name</p>
            <p className="is-pink">{name}</p>
          </div>
          <div className="col-xs-12">
            <p className="margin-1-b">Your Phone Number</p>
            <p className="is-pink">{phone_number}</p>
          </div>
          <div className="col-xs-12">
            <p>Your Address</p>
            <p className="is-pink">{address}</p>
          </div>
          <div className="col-xs-12">
            <button
              className="bubble-button-secondary"
              onClick={() => setEdit(true)}
              style={{ minWidth: 250 }}
            >
              Update Information
            </button>
          </div>
        </>
      )}

      <div className="col-xs-12 pad-3-t">
        <h2>Delete Account</h2>
        <p className="margin-0 margin-2-r is-medium-grey">
          Clicking the button below will delete your account. This is permenant.
          Make sure this is what you want to do!
        </p>
        <button className="bubble-button margin-5-t" style={{ minWidth: 250 }}>
          Delete Account
        </button>
      </div>
    </div>
  );
};
