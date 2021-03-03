import React from "react";
import style from "./style";

const Chrome = ({
  className,
  renderHeader,
  renderFooter,
  renderLeftSide,
  renderRightSide,
  renderMain,
}) => {
  return (
    <div className={className}>
      <header>{renderHeader()}</header>
      <aside className="left ">{renderLeftSide()}</aside>
      <main>{renderMain()}</main>
      <aside className="right">{renderRightSide()}</aside>
      <footer>{renderFooter()}</footer>
    </div>
  );
};

export default style(Chrome);
