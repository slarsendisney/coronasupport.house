/* eslint-disable jsx-a11y/heading-has-content*/
import React from "react";
import { Link } from "gatsby";
export default props => {
  return (
    <div className="is-white-bg is-dark-blue pad-5-lr pad-3-tb">
      <div className="row flex padding-0-tb container">
        <div className="col-xs-6 flex">
          <Link
            href="https://sld.codes/"
            title="home"
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>Sussex Square & Lewes Crescent Mutual Aid Network</h4>
          </Link>
        </div>

        <div
          className="col-xs-6 flex text-align-right"
          style={{ justifyContent: "flex-end", alignItems: "center" }}
        >
          <Link to="/requesthelp">
            <button type="button" className="bubble-button">
              Request Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
