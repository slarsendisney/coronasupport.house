import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";

export default function lost() {
  return (
    <Layout>
      <SEO />
      <div className=" container pad-10-tb">
        <div className="row">
          <div className="col-xs-12 col-md-6 pad-10-l">
            <h1 className="is-hero-menu margin-0">Oops!</h1>
            <h4 className="is-hero-sub-text">
              You've found a dead page... Please let Sam know!
            </h4>
            <Link to="/">
              <button
                className="bubble-button margin-5-t"
                style={{ width: 250 }}
              >
                Go Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
