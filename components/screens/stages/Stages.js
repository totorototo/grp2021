import React from "react";

import style from "./style";
import Stage from "./stage/Stage";

const Stages = ({ className, stages, width, height }) => {
  return (
    <div className={className} style={{ width, height }}>
      <div className={"stages-container"}>
        {stages &&
          stages.length > 0 &&
          stages.map((stage, index) => (
            <Stage key={index} stage={stage} id={index} />
          ))}
      </div>
    </div>
  );
};

export default style(Stages);
