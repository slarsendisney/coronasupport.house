import React from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";

export default () => {
  return (
    <Layout>
      <div className="is-dark-blue">
        <SEO />
        <div className="row container pad-10-t pad-5">
          <div className="col-xs-12">
            <h1>Sussex Square & Lewes Crescent Mutual Aid Network</h1>
            <div className="line" />
            <div className="text-align-center pad-10-t">
              <button className="bubble-button margin-1">
                Request Support
              </button>
              <button className="bubble-button-secondary margin-1">
                Volunteer
              </button>
            </div>
          </div>
          <div className="col-xs-12"></div>
        </div>
      </div>
    </Layout>
  );
};
