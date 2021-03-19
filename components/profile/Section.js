import React, { useEffect } from "react";
import { formatDistance, format } from "date-fns";

import useIntersect from "../../hooks/useIntersect";
import Container from "./Container";

const msToTime = (milliseconds) => {
  let day, hour, minute, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  hour = Math.floor(minute / 60);
  minute = minute % 60;

  return minute !== 0 ? `${hour} hours ${minute} minutes` : `${hour} hours`;
};

const Section = ({
  root,
  setSelectedSectionIndex,
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
    <Container
      onClick={() => {
        setSelectedSectionIndex(id);
      }}
      ref={ref}
    >
      <div className={`detail ${currentSectionIndex === id ? "current" : ""}`}>
        <div className={"section-index"}>{id + 1}</div>
        <p className={"section-data"}>
          <span>{`${section.departureLocation} - ${section.arrivalLocation}`}</span>
          <span>{`${(section.distance / 1000).toFixed(1)}km `}</span>
          <span className={"type"}>distance</span>
          <span>
            {`${section.elevation.positive.toFixed(
              0
            )}D+ ${section.elevation.negative.toFixed(0)}D-`}
          </span>
          <span className={"type"}>elevation</span>
          <span>
            {formatDistance(0, section.duration, {
              includeSeconds: true,
            })}
          </span>
          <span className={"type"}>duration</span>
          <span>{format(new Date(section.cutOffTime), "dd-MM HH:mm")}</span>
          <span className={"type"}>time barrier</span>
          <span>{msToTime(section.elapsedHoursFromStart)}</span>
          <span className={"type"}>since start</span>
        </p>
      </div>
    </Container>
  );
};

export default Section;
