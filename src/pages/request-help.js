import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";
export default () => (
  <Layout>
    <div className="row container">
      <div className="col-xs-12">
        <h1>Request Support </h1>
      </div>
      <div className="col-xs-12 pad-5-lr pad-3-tb is-light-grey-bg border-radius">
        <h4>
          💡 Before requesting help, please ensure you are located within the
          Sussex Square & Lewes Crescent Mutual Aid Network{" "}
          <Link to="/network-map" className="is-pink">
            on this map
          </Link>
          .
        </h4>
      </div>
    </div>
  </Layout>
);
