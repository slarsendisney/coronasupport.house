import React, { useState, useEffect } from "react";
import { withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps";
import mapStyles from "./mapStyles.json";
// Configure Firebase.
let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase");
}

export default ({ wrapper: Wrapper, noCases }) => {
  const [casemarkers, setCaseMarkers] = useState([]);
  const [volunteermarkers, setVolunteerMarkers] = useState([]);
  const [vulnerablemarkers, setVulnerableMarkers] = useState([]);
  const defaultMapOptions = {
    styles: mapStyles
  };
  const updateDB = () => {
    if (!noCases) {
      firebase
        .firestore()
        .collection("cases")
        .onSnapshot(subCollectionSnapshot => {
          const cases = [];
          subCollectionSnapshot.forEach(subDoc => {
            cases.push({ data: subDoc.data(), id: subDoc.id });
          });
          console.log(cases);
          setCaseMarkers(
            cases.filter(item => item.data.latLng && !item.data.archived)
          );
        });
    }
    firebase
      .firestore()
      .collection("users")
      .onSnapshot(subCollectionSnapshot => {
        const volunteers = [];
        const vulnerable = [];
        let address = "";
        subCollectionSnapshot.forEach(subDoc => {
          if (subDoc.data().type === "volunteer") {
            volunteers.push({ data: subDoc.data(), id: subDoc.id });
          }
          if (subDoc.data().type === "vulnerable") {
            vulnerable.push({ data: subDoc.data(), id: subDoc.id });
          }
        });
        setVulnerableMarkers(vulnerable.filter(item => item.data.latLng));
        setVolunteerMarkers(volunteers.filter(item => item.data.latLng));
      });
  };

  const volunteerCircles = {
    strokeColor: "#FF0000",
    strokeOpacity: 1,
    strokeWeight: 0,
    fillColor: "blue",
    fillOpacity: 1,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 5,
    zIndex: 1
  };
  const vulnerableCircles = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 0,
    fillColor: "red",
    fillOpacity: 0.8,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 5,
    zIndex: 2
  };
  useEffect(() => {
    updateDB();
  }, []);

  const MyMapComponent = withGoogleMap(props => (
    <GoogleMap
      defaultZoom={17}
      defaultOptions={defaultMapOptions}
      defaultCenter={{ lat: 50.8161752, lng: -0.1111561 }}
    >
      {casemarkers.map(item => (
        <Marker position={item.data.latLng} />
      ))}
      {volunteermarkers.map(item => (
        <Circle center={item.data.latLng} options={volunteerCircles} />
      ))}
      {vulnerablemarkers.map(item => (
        <Circle center={item.data.latLng} options={vulnerableCircles} />
      ))}
    </GoogleMap>
  ));

  return (
    <Wrapper>
      <div className="row">
        <div className="col-xs-12 margin-1-tb">
          <p>
            Blue dots represent volunteers and pink dots represent vulnerable.
          </p>
        </div>
        <div className="col-xs-12 margin-3-t">
          <MyMapComponent
            isMarkerShown
            containerElement={<div style={{ height: `75vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    </Wrapper>
  );
};
