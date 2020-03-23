import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import CookieConsent from "react-cookie-consent";
import Header from "./header";
import SEO from "./seo";
const Layout = ({ children, loggedIn = false }) => {
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
      <SEO />
      <Header loggedIn={loggedIn} />
      <div className="pad-5 is-white-bg">
        <main>{children}</main>
      </div>
      <footer className="is-white-bg is-grey pad-2 footer">
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by{" "}
        <a href="https://sld.codes/" className="is-pink">
          Sam Larsen-Disney
        </a>
        <p className="legal">
          <Link to="/privacy-notice">Privacy policy can be found here.</Link>
        </p>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
