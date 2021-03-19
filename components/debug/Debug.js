import React from "react";
import { format } from "date-fns";

import style from "./style";

const Debug = ({
  className,
  position,
  delta,
  projectedLocation,
  savedPositions,
  analytics,
  progression,
}) => {
  return (
    <div className={className}>
      {position && (
        <>
          <div>last tracked position</div>
          <div>{`latitude:${position.coords[1]} - longitude:${position.coords[0]}`}</div>
          <div>{format(new Date(position.timestamp), "dd-MM-yy HH:mm")}</div>
        </>
      )}
      {projectedLocation && (
        <>
          <div>projected position on track</div>
          <div>{`latitude:${projectedLocation[1]} - longitude:${projectedLocation[0]}`}</div>
        </>
      )}

      {delta > 0 && (
        <>
          <div>delta</div>
          <div>{`${(delta / 1000).toFixed()}km`}</div>
        </>
      )}
      {analytics && (
        <div>
          <div>{`${(analytics[0] / 1000).toFixed()}km`}</div>
          <div>{`${analytics[1].toFixed()}D+`}</div>
          <div>{`${analytics[2].toFixed()}D-`}</div>
        </div>
      )}
      {progression && progression.length > 0 && (
        <div>
          {progression.map((item, index) => (
            <div key={index}>{`${item.label}: ${item.percent}%`}</div>
          ))}
        </div>
      )}
      {savedPositions && savedPositions.length > 0 && (
        <div>
          {savedPositions.map((position, index) => (
            <div key={index}>
              <div>{`latitude:${position.location[1]} - longitude:${
                position.location[0]
              } - ${format(
                new Date(position.timestamp),
                "dd-MM-yy HH:mm"
              )}`}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default style(Debug);
