import React from "react";
import { Router } from "@reach/router";

import Map from "../molecules/VolunteerMap";
import Requests from "../molecules/VolunteerRequests";
import Home from "../molecules/VolunteerHome";
import Search from "../molecules/VolunteerSearch";
import Register from "../molecules/VolunteerRegister";
import { Link } from "gatsby";
import CheckIns from "../molecules/Check-ins";

const NavToHomeWrapper = ({ children }) => (
  <>
    {typeof window !== undefined &&
    (window.location.pathname !== "/community" ||
      window.location.pathname !== "/community/") ? (
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
    ) : (
      <>{children} </>
    )}
  </>
);
const App = ({ user }) => {
  return (
    <NavToHomeWrapper>
      <Router>
        <Map path="map" wrapper={NavToHomeWrapper} />
        <Requests path="requests" user={user} wrapper={NavToHomeWrapper} />
        <CheckIns path="check-in" user={user} wrapper={NavToHomeWrapper} />
        <Register path="register" user={user} wrapper={NavToHomeWrapper} />
        <Search path="search" wrapper={NavToHomeWrapper} />
        <Home user={user} path="/" wrapper={NavToHomeWrapper} />
      </Router>
    </NavToHomeWrapper>
  );
};
export default App;
