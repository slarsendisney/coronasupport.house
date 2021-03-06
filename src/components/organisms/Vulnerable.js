import React from "react";
import { Router } from "@reach/router";
import Map from "../molecules/VolunteerMap";
import Request from "../molecules/RequestHelpVulnerable";
import Home from "../molecules/VulnerableHome";
import { Link } from "gatsby";

const NavToHomeWrapper = ({ children }) => (
  <>
    {typeof window !== undefined &&
    (window.location.pathname === "/community" ||
      window.location.pathname === "/community/") ? (
      <>{children} </>
    ) : (
      <>
        <div className="row">
          <div className="col-xs-12 margin-1-b">
            <Link to="/community">
              <h3 className="is-pink margin-0"> {`< Back`}</h3>
            </Link>
          </div>
        </div>
        {children}
      </>
    )}
  </>
);
const App = ({ user }) => {
  return (
    <NavToHomeWrapper>
      <Router>
        <Map path="map" wrapper={NavToHomeWrapper} noCases />
        <Request
          path="request"
          wrapper={NavToHomeWrapper}
          user={user}
          noLayout
        />
        <Home user={user} path="/" wrapper={NavToHomeWrapper} />
      </Router>
    </NavToHomeWrapper>
  );
};
export default App;
