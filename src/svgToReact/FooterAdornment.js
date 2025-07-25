import React from "react";

const FooterAdornment = (props) => {
  const svgStyles = {
    st0: {
      fill: "none",
    },
    st1: {
      fill: "#FFFFFF",
      fontFamily: "Raleway",
      fontSize: "0.85rem",
    },
  };
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 294.4 180"
      //receiving svg styles as className props
      //if no class is available then svg will fallback on viewBox;
      className={props.className}
      xmlSpace="preserve"
    >
      <path d="M294.4,0L168,227H0V0H294.4z" />
      <g id="Full_Box">
        <polyline points="168,227 294.4,227 294.4,-1" />
      </g>
      <path style={svgStyles.st0} d="M111-24v376" />
      <text
        id="_xA9__BeriDev.to"
        transform="matrix(1 0 0 1 5 175)"
        style={svgStyles.st1}
      >
        © dancahtechnology {new Date().getFullYear()}
      </text>
      <text
        transform="matrix(1 0 0 1 207.1765 175)"
        style={svgStyles.st1}
      >
        Nairobi, Kenya
      </text>
    </svg>
  );
};

export default FooterAdornment;
