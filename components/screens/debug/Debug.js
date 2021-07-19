import React, { useEffect, useState } from "react";
import { format, isWithinInterval } from "date-fns";
import { Trash } from "@styled-icons/feather/Trash";

import style from "./style";

const Debug = ({
  className,
  positions,
  delta,
  projectedLocation,
  savedPositions,
  analytics,
  progression,
  sections,
  flushPositions,
}) => {
  const [interval, setInterval] = useState();
  const [sortedPositions, setSortedPositions] = useState();

  useEffect(() => {
    if (!positions) return;
    const sorted = positions.sort((a, b) => a.timestamp - b.timestamp);
    setSortedPositions(sorted);
  }, [positions]);

  useEffect(() => {
    if (!sections || sections.length === 0) return;
    const start = new Date(sections[0].cutOffTime.replace(/-/g, "/"));
    const end = new Date(
      sections[sections.length - 1].cutOffTime.replace(/-/g, "/")
    );
    setInterval({ start, end });
  }, [sections]);

  return (
    <div className={className}>
      <p>
        <span className={"category"}>runner position</span>
        {sortedPositions && sortedPositions.length > 0 && (
          <span className={"position"}>
            <span>last tracked position:</span>
            <span>{`latitude: ${sortedPositions[
              sortedPositions.length - 1
            ].coords[1].toFixed(5)} - longitude: ${sortedPositions[
              sortedPositions.length - 1
            ].coords[0].toFixed(5)} -  ${format(
              new Date(sortedPositions[sortedPositions.length - 1].timestamp),
              "dd-MM-yy HH:mm"
            )}`}</span>
          </span>
        )}
        {projectedLocation && (
          <span className={"projected-position"}>
            <span>projected position on track:</span>
            <span>{`latitude:${projectedLocation[1]} - longitude:${projectedLocation[0]}`}</span>
          </span>
        )}

        {delta > 0 && (
          <span
            className={`delta ${(delta / 1000).toFixed() > 5 ? "warning" : ""}`}
          >
            <span>delta:</span>
            <span>{`${(delta / 1000).toFixed()}km`}</span>
          </span>
        )}
      </p>
      <p>
        <span className={"category"}>runner stats</span>
        {analytics && (
          <span className={"analytics"}>
            <span>{`distance: ${(analytics[0] / 1000).toFixed()}km`}</span>
            <span>{`elevation gain: ${analytics[1].toFixed()}m`}</span>
            <span>{`elevation loss: ${analytics[2].toFixed()}m`}</span>
          </span>
        )}
        {progression && progression.length > 0 && (
          <span className={"progress"}>
            {progression.map((item, index) => (
              <span key={index}>{`${item.label}: ${item.percent}%`}</span>
            ))}
          </span>
        )}
      </p>
      <p>
        <span className={"category"}>
          <span>saved positions</span>
          <Trash
            className={`${
              sortedPositions && sortedPositions.length > 0
                ? "enable"
                : "disable"
            }`}
            size={20}
            onClick={() => flushPositions()}
          >
            flush
          </Trash>
        </span>
        {sections && interval && sortedPositions && sortedPositions.length > 0 && (
          <span className={"positions"}>
            {sortedPositions.map((position, index) => {
              const withinInterval = isWithinInterval(
                new Date(position.timestamp),
                interval
              );

              return (
                <span
                  className={`${index} ${withinInterval ? "" : "warning"}`}
                  key={index}
                >
                  {`latitude: ${position.coords[1].toFixed(
                    5
                  )} - longitude: ${position.coords[0].toFixed(5)} - ${format(
                    new Date(position.timestamp),
                    "dd-MM-yy HH:mm"
                  )}`}
                </span>
              );
            })}
          </span>
        )}
      </p>
    </div>
  );
};

export default style(Debug);
