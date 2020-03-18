import React from "react";
import PropTypes from "prop-types";

const Button = props => {
  const { variant, disabled, children, onClick } = props;

  let backgroundColor = "white";
  let color = "black";

  switch (variant) {
    case "primary":
      backgroundColor = "red";
      color = "white";
      break;
    case "secondary":
      backgroundColor = "green";
      color = "white";
      break;
    default:
      break;
  }

  const style = {
    backgroundColor,
    color,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1
  };

  return (
    <button onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  disabled: PropTypes.bool
};

export default Button;
