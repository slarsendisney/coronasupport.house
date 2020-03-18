import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default function lost() {
  return (
    <Layout>
      <SEO />
      <div className="is-white is-deep-blue-bg">
        <div className="row container-small pad-20-t pad-20-b">
          <div className="col-xs-12 col-md-6 pad-10-l">
            <h1 className="is-hero-menu margin-0">Oops!</h1>
            <h4 className="is-hero-sub-text">
              You've found something you shouldn't have...
            </h4>
          </div>
        </div>
      </div>
    </Layout>
  );
}
