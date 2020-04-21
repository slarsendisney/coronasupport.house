import React, { useState } from "react";
import FuzzySearch from "fuzzy-search";
import Loader from "../Loader";
import { useCollection } from "react-firebase-hooks/firestore";

let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase");
}

export default ({ wrapper: Wrapper }) => {
  const [volunteers, volunteersLoading, volunteerError] = useCollection(
    firebase.firestore().collection(`users`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [searchTerm, setSearchTerm] = useState("");

  let users = [];
  if (!volunteersLoading) {
    volunteers.forEach((subDoc) => {
      if (!subDoc.data().search_opt_out) {
        users.push(subDoc.data());
      }
    });
  }
  const searcher = new FuzzySearch(
    users,
    ["name", "address", "phone_number", "uid"],
    {
      caseSensitive: false,
    }
  );
  const result = searcher.search(searchTerm);

  if (volunteersLoading) {
    return (
      <div className="row">
        <div className="row container">
          <div className="col-xs-12 margin-5-b text-align-center">
            <Loader />
            <h2>Loading volunteers...</h2>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-xs-12">
        <h1>Community Search</h1>
      </div>
      <div className="col-xs-12 margin-5-b pad-5-lr pad-3-tb is-light-grey-bg border-radius text-align-center">
        <p>
          Here you can search for contact information for our registered
          volunteers and vulnerable. Try searching by address or name. 😇
        </p>
      </div>
      <div className="col-xs-12">
        <input
          className="input"
          value={searchTerm}
          name="search"
          placeholder="Search volunteers..."
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
      </div>
      {searchTerm.length <= 2 && (
        <div className="col-xs-12 text-align-center">
          <h4>Please enter at least 3 characters to see results.</h4>
        </div>
      )}
      {searchTerm.length > 2 &&
        result.map((item) => (
          <>
            <div className="col-xs-12" key={item.name}>
              <h2>{item.name}</h2>
              <p className="is-pink">{item.type.toUpperCase()}</p>
              <h4>{item.phone_number}</h4>
              <h4>{item.address}</h4>
            </div>
          </>
        ))}
    </div>
  );
};
