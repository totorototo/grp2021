import React from "react";

import style from "./style";

const Stage = ({ className, stage, id, currentStageIndex }) => {
  return (
    <div className={className}>
      <div className={`detail ${currentStageIndex === id ? "current" : ""}`}>
        <div className={"stage-index"}>{id + 1}</div>
        <p className={"stage-data"}>
          <span>{`${stage.departure} - ${stage.arrival}`}</span>
          <span className={"type"}>distance</span>
          <span>{`${(stage.distance / 1000).toFixed(1)}km `}</span>
          <span className={"type"}>elevation</span>
          <span>
            {`${stage.elevation.gain.toFixed(
              0
            )}D+ ${stage.elevation.loss.toFixed(0)}D-`}
          </span>

          <span className={"type"}>duration</span>
          <span>{stage.duration}</span>
        </p>
      </div>
    </div>
  );
};

export default style(Stage);
