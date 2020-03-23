import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";
export default () => (
  <Layout>
    <div className="row container text-align-center">
      <div className="col-xs-12 margin-10-t">
        <h1>You've successfully logged out! </h1>
        <div className="line margin-10-b margin-auto-l margin-auto-r" />
      </div>
      <div className="col-xs-12">
        <Link to="/">
          <button className="bubble-button">Return Home</button>
        </Link>
      </div>
    </div>
  </Layout>
);
