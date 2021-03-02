import React from "react";
import style from "./style";

const Footer = ({ className, items = {} }) => {
  return (
    <div className={className}>
      <div className={"menu"}>
        <div className={"logo"}>logo</div>
        {Object.entries(items).map(([title, value], key) => (
          <div key={key} className={"category"}>
            <div className={"title"}>{title}</div>
            {Object.entries(value).map(([designation, link], key) => (
              <div className={"item"} key={key}>
                {designation}
              </div>
            ))}
          </div>
        ))}
        <div className={"awards"}>awards</div>
      </div>
      <div className={"conditions"}>
        <div className={"condition"}>legal</div>
        <div className={"condition"}>privacy</div>
        <div className={"logo"}>xxxx-buddy.io © 2021 La Vallée</div>
      </div>
    </div>
  );
};

export default style(Footer);
