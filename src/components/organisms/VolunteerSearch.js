import React, { useState } from "react";
import FuzzySearch from "fuzzy-search";
import Loader from "../../components/Loader";
import { useCollection } from "react-firebase-hooks/firestore";

let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase");
}

export default () => {
  const [volunteers, volunteersLoading, volunteerError] = useCollection(
    firebase.firestore().collection(`volunteers`),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );
  const [searchTerm, setSearchTerm] = useState("");

  let volunteerList = [];
  if (!volunteersLoading) {
    volunteers.forEach(subDoc => {
      volunteerList.push(subDoc.data());
    });
  }
  const searcher = new FuzzySearch(
    volunteerList,
    ["name", "address", "phone_number", "uid"],
    {
      caseSensitive: false
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
        <h1>Volunteer Search</h1>
      </div>
      <div className="col-xs-12 margin-5-b pad-5-lr pad-3-tb is-light-grey-bg border-radius text-align-center">
        <p>
          Here you can search for contact information for our registered
          volunteers. Try searching by address or name. 😇
        </p>
      </div>
      <div className="col-xs-12">
        <input
          className="input"
          value={searchTerm}
          name="search"
          placeholder="Search volunteers..."
          onChange={e => setSearchTerm(e.target.value)}
        ></input>
      </div>
      {searchTerm.length <= 2 && (
        <div className="col-xs-12 text-align-center">
          <h4>Please enter at least 3 characters to see results.</h4>
        </div>
      )}
      {searchTerm.length > 2 &&
        result.map(item => (
          <div className="col-xs-12" key={item.name}>
            <h2>{item.name}</h2>
            <h4>{item.phone_number}</h4>
            <h4>{item.address}</h4>
          </div>
        ))}
    </div>
  );
};
