/* eslint-disable jsx-a11y/heading-has-content*/
import React from "react";
import { Link } from "gatsby";
import Logo from "../images/Logo-Blue.svg";
export default props => {
  return (
    <div className="is-white-bg is-dark-blue pad-5-lr pad-3-tb">
      <div className="row flex padding-0-tb container">
        <div className="col-xs-6 flex grow">
          <Link to="/">
            <div className="flex is-dark-blue" style={{ alignItems: "center" }}>
              <img src={Logo} style={{ height: 30, marginRight: 10 }}></img>
              <h4>Sussex Square & Lewes Crescent Mutual Aid Network</h4>
            </div>
          </Link>
        </div>

        <div
          className="col-xs-6 flex text-align-right"
          style={{ justifyContent: "flex-end", alignItems: "center" }}
        >
          <Link to="/request-help">
            <button type="button" className="bubble-button">
              Request Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
