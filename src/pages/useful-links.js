import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";
export default () => (
  <Layout>
    <div className="row container">
      <div className="col-xs-12">
        <h1>Useful Links </h1>
        <div className="line" />
      </div>
      <div className="col-xs-12 ">
        <Link to="/network-map" className="is-pink">
          <h2>Network Map</h2>
        </Link>
      </div>
    </div>
  </Layout>
);
