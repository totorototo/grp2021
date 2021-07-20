import React from "react";

import style from "./style";
import Stage from "./stage/Stage";

const Stages = ({
  className,
  stages,
  width,
  height,
  currentStageIndex = 0,
}) => {
  return (
    <div className={className} style={{ width, height }}>
      <div className={"stages-container"}>
        {stages &&
          stages.length > 0 &&
          stages.map((stage, index) => (
            <Stage
              currentStageIndex={currentStageIndex}
              key={index}
              stage={stage}
              id={index}
            />
          ))}
      </div>
    </div>
  );
};

export default style(Stages);
