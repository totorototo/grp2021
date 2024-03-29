import React from "react";
import style from "./style";

const Footer = ({ className }) => {
  return (
    <div className={className}>
      <div className={"conditions"}>
        <div className={"logo"}>trail-buddy.io © 2021 La Vallée</div>
      </div>
    </div>
  );
};

export default style(Footer);
