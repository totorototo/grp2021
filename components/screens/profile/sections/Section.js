import React, { useEffect } from "react";
import { formatDistance, format } from "date-fns";

import useIntersect from "../../../../hooks/useIntersect";
import Container from "../Container";
import style from "./style";

const msToTime = (milliseconds) => {
  let day, hour, minute, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  hour = Math.floor(minute / 60);
  minute = minute % 60;

  return minute !== 0 ? `${hour} hours ${minute} minutes` : `${hour} hours`;
};

const Section = ({
  className,
  root,
  setSelectedSectionIndex = () => {},
  id,
  section,
  highlightedSectionIndex,
  setHighlightedSectionIndex,
  currentSectionIndex,
}) => {
  const [ref, entry] = useIntersect({
    threshold: 0.8,
    root: root.current,
    rootMargin: "0px 50px 0px 50px",
  });

  /*  useEffect(() => {
      if (currentLocationIndex === -1) return;

      if (
        currentLocationIndex >= section.indices[0] &&
        currentLocationIndex < section.indices[1]
      ) {
        const index = currentLocationIndex - section.indices[0];
        const currentLocation = section.coordinates[index];
        const marker = { x: index, y: currentLocation[2] };

        setSelectedSectionIndex(id);

        setMarkers([marker]);
      } else {
        setMarkers([]);
      }
    }, [currentLocationIndex, section, setSelectedSectionIndex, id]);*/

  useEffect(() => {
    if (entry.intersectionRatio > 0.8) setHighlightedSectionIndex(id);
  }, [entry.intersectionRatio, setHighlightedSectionIndex, id]);

  return (
    <div
      className={className}
      onClick={() => {
        setSelectedSectionIndex(id);
      }}
      ref={ref}
    >
      <div className={`detail ${currentSectionIndex === id ? "current" : ""}`}>
        <div className={"section-index"}>{id + 1}</div>
        {/* <div className={"section-data"}>
          <div className={"item"}>{`${section.departureLocation}`}</div>
          <div className={"item"}>{`${section.arrivalLocation}`}</div>
          <div className={"item"}>{`${(section.distance / 1000).toFixed(
            1
          )}km`}</div>
          <div className={"item"}>
            {`${section.elevation.positive.toFixed(
              0
            )}D+ ${section.elevation.negative.toFixed(0)}D-`}
          </div>
          <div className={"item"}>
            {formatDistance(0, section.duration, {
              includeSeconds: true,
            })}
          </div>
          <div className={"item"}>
            {format(new Date(section.cutOffTime), "dd-MM HH:mm")}
          </div>
          <div className={"item"}>
            {msToTime(section.elapsedHoursFromStart)}
          </div>
        </div>*/}
        <p className={"section-data"}>
          <span>{`${section.departureLocation} - ${section.arrivalLocation}`}</span>
          <span className={"type"}>distance</span>
          <span>{`${(section.distance / 1000).toFixed(1)}km `}</span>

          <span className={"type"}>elevation</span>
          <span>
            {`${section.elevation.positive.toFixed(
              0
            )}D+ ${section.elevation.negative.toFixed(0)}D-`}
          </span>

          <span className={"type"}>duration</span>
          <span>
            {formatDistance(0, section.duration, {
              includeSeconds: true,
            })}
          </span>

          <span className={"type"}>time barrier</span>
          <span>{format(new Date(section.cutOffTime), "dd-MM HH:mm")}</span>
          <span className={"type"}>since start</span>
          <span>{msToTime(section.elapsedHoursFromStart)}</span>
          <span className={"type"}>min avg speed</span>
          <span>{`${section.avgSpeed.toFixed(2)} km/h`}</span>
        </p>
      </div>
    </div>
  );
};

export default style(Section);
