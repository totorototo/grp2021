import React from "react";

import style from "./style";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { TrendingUp } from "@styled-icons/feather/TrendingUp";
import { AddRoad } from "@styled-icons/material-outlined/AddRoad";
import { Watch } from "@styled-icons/feather/Watch";
import { differenceInHours, formatDistanceToNow } from "date-fns";
import { Timer } from "@styled-icons/ionicons-outline/Timer";

const Preview = ({ className, distance, elevation, checkpoints, stages }) => {
  return (
    <div className={className}>
      <div className={"item"}>
        {/* <ArrowRight size={"20"} />*/}
        {`${(distance / 1000).toFixed(0)} km`}
      </div>
      <div className={"item"}>
        {/* <TrendingUp size="20" />*/}
        <div>
          {`${elevation.positive.toFixed(0)} D+  ${elevation.negative.toFixed(
            0
          )} D-`}
        </div>
      </div>
      <div className={"item"}>
        {/* <AddRoad size={"20"} />*/}
        <div> {`${stages.length} stages`}</div>
      </div>

      <div className={"item"}>
        {/* <AddRoad size={"20"} />*/}
        <div> {`${checkpoints.length} sections`}</div>
      </div>
      <div className={"item"}>
        {/* <Watch size="20" />*/}
        <div>
          {`${differenceInHours(
            new Date(checkpoints[checkpoints.length - 1].cutOffTime),
            new Date(checkpoints[0].cutOffTime)
          )} hours`}
        </div>
      </div>
      <div className={"item"}>
        {/*<Timer size="20" />*/}
        <div>
          {formatDistanceToNow(new Date(checkpoints[0].cutOffTime), {
            addSuffix: true,
          })}
        </div>
      </div>
    </div>
  );
};

export default style(Preview);
