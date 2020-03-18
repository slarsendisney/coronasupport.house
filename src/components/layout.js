import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import CookieConsent from "react-cookie-consent";
import Header from "./header";
const Layout = ({ children }) => {
  return (
    <div>
      <CookieConsent
        location="bottom"
        buttonText="Got it"
        acceptOnScroll={true}
        cookieName="SLDConsentCookie"
        style={{ background: "#ea4e68" }}
        buttonStyle={{
          color: "#ea4e68",
          fontSize: "13px",
          background: "#fff",
          fontFamily: "lato",
          borderRadius: 3,
          padding: 10
        }}
      >
        <h4 className="margin-0">
          This website uses cookies{" "}
          <span role="img" aria-label="cookies">
            🍪
          </span>
          . Hope thats cool with you!
        </h4>
      </CookieConsent>
      <Header />
      <div className="pad-5">
        <main>{children}</main>
      </div>
      <footer class="is-white-bg is-grey pad-2 footer">
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by Sam Larsen-Disney
        <p class="legal">
          Privacy policy can be found <Link to="/privacy-notice">here</Link>
        </p>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
