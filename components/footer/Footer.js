import React from "react";
import style from "./style";

const Footer = ({ className }) => {
  return (
    <div className={className}>
      <div className={"conditions"}>
        <div className={"condition"}>legal</div>
        <div className={"condition"}>privacy</div>
        <div className={"logo"}>xxxx-buddy.io © 2021 La Vallée</div>
      </div>
    </div>
  );
};

export default style(Footer);
