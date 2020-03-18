import React from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";

export default () => {
  return (
    <Layout>
      <div className="is-dark-blue">
        <SEO />
        <div className="row container">
          <div className="col-xs-12">
            <h1>Brighton & Hove Mutual Aid Groups Map</h1>
            <div className="line" />
            <p>Clicking on a network will display their contact information.</p>
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1lF1G9stbUBahgaHMWkrMTTZYJEfpaqlB"
              width="100%"
              style={{ minHeight: "50vh" }}
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};
