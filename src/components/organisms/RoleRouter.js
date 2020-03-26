import React from "react";
import Volunteers from "./Volunteers";
import Vulnerable from "./Vulnerable";
import VulnerableHome from "../molecules/VulnerableHome";

export default ({ user }) => {
  const { type } = user;
  if (type === "volunteer") {
    return <Volunteers user={user} />;
  }
  if (type === "vulnerable") {
    return <Vulnerable user={user} />;
  } else {
    return <h1>Unknown user type</h1>;
  }
};
