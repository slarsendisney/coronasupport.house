import React, { useState, useEffect } from "react";
import { withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps";
import mapStyles from "./mapStyles.json";
// Configure Firebase.
let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase");
}

export default () => {
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
          cases.push({ data: subDoc.data(), id: subDoc.id });
        });
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
          cases.push({ data: subDoc.data(), id: subDoc.id });
        });
        // const formattedNames = cases.map(
        //   x =>
        //     `NAME - ${x.data.name}\nPHONE - ${x.data.phone_number}\nADDRESS - ${x.data.address}\n` +
        //     "-".repeat(25) +
        //     "\n"
        // );
        // console.log(formattedNames.join(""));
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
    updateDB();
  }, []);
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
        <h1>Volunteer Map:</h1>
      </div>
      <div className="col-xs-12 margin-5-b">
        <MyMapComponent
          isMarkerShown
          containerElement={<div style={{ height: `75vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
};
