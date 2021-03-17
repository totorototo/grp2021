import React, { useEffect, useState, useRef } from "react";
import { formatDistance, format } from "date-fns";
import { TrendingUp } from "@styled-icons/feather/TrendingUp";
import { Watch } from "@styled-icons/feather/Watch";
import { Timer } from "@styled-icons/ionicons-outline/Timer";
import { MapPin } from "@styled-icons/feather/MapPin";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";

import styled from "./style";
import useIntersect from "../../hooks/useIntersect";
import Graph from "../graph/Graph";
import customStyled from "styled-components";

const Container = customStyled.div`  
  height: 100%;
  position: relative;
  scroll-snap-align: center; 
`;

const IntersectSection = ({
  root,
  setSelectedSectionIndex,
  selectedSectionIndex,
  current,
  id,
  peaks,
  section,
  currentLocationIndex,
  lineColor,
  backgroundColor,
  areaColor,
  sectionsColor,
  currentSectionColor,
  ...rest
}) => {
  const [ref, entry] = useIntersect({
    threshold: 0.8,
    root: root.current,
    rootMargin: "0px 50px 0px 50px",
  });

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
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
  }, [currentLocationIndex, section, setSelectedSectionIndex, id]);

  useEffect(() => {
    // console.log(id, entry.intersectionRatio);
    // if (entry.intersectionRatio > 0.8) setSection(id);
  }, [entry.intersectionRatio, setSelectedSectionIndex, id]);

  return (
    <Container
      onClick={() => {
        setSelectedSectionIndex(id);
      }}
      ref={ref}
    >
      <Graph
        displayPeaks
        peaks={peaks}
        markers={markers}
        displayLine
        displayArea
        lineColor={sectionsColor}
        areaColor={
          selectedSectionIndex === id ? currentSectionColor : sectionsColor
        }
        backgroundColor={backgroundColor}
        {...rest}
        offsetMax={500}
      />
    </Container>
  );
};

const Sections = ({
  className,
  sections,
  currentSectionIndex = 0,
  setCurrentSectionIndex,
  currentLocationIndex,
  setCurrentLocation,
  locations,
  domain,
  width,
  height,
  lineColor = "var(--color-text)",
  areaColor = "var(--color-background)",
  backgroundColor = "var(--color-background)",
  currentSectionColor,
  profileColor,
  sectionsColor,
  currentIndex,
  progressionColor,
}) => {
  const root = useRef(null);

  /*  const [selectedSectionIndex, setSelectedSectionIndex] = useState(
    currentSectionIndex
  );*/

  return (
    <div className={className}>
      <div className={"section-container"}>
        <div className="analytic">
          <div className="data">
            <div className="index">{currentSectionIndex + 1}</div>
            <div className="stats">
              <div className="title">
                {`${sections[currentSectionIndex].departureLocation} - ${sections[currentSectionIndex].arrivalLocation}`}
              </div>
              <div className="item">
                <ArrowRight size={"20"} />
                <div>{`${(
                  sections[currentSectionIndex].distance / 1000
                ).toFixed(2)}`}</div>
              </div>
              <div className={"item"}>
                <MapPin size={"20"} />
                <div>
                  {`${(sections[currentSectionIndex].toKm / 1000).toFixed(2)}`}
                </div>
              </div>
              <div className="item">
                <TrendingUp size={"20"} />
                <div>
                  {`${sections[currentSectionIndex].elevation.positive.toFixed(
                    0
                  )} / ${sections[
                    currentSectionIndex
                  ].elevation.negative.toFixed(0)}`}
                </div>
              </div>
              <div className="item">
                <Watch size={"20"} />
                <div>
                  {formatDistance(0, sections[currentSectionIndex].duration, {
                    includeSeconds: true,
                  })}
                </div>
              </div>
              <div className="item">
                <Timer size={"20"} />
                <div>
                  {format(
                    new Date(sections[currentSectionIndex].cutOffTime),
                    "dd-MM HH:mm"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile">
          <Graph
            currentIndex={currentIndex}
            width={width}
            height={300}
            locations={locations}
            areaColor={profileColor}
            currentLocationIndex={currentLocationIndex}
            domain={domain}
            offsetMin={3000}
            progressionColor={progressionColor}
          />
        </div>
        <div ref={root} className="section">
          {sections.map((section, index) => (
            <IntersectSection
              section={section}
              currentLocationIndex={currentLocationIndex}
              current={currentSectionIndex === index}
              setSelectedSectionIndex={setCurrentSectionIndex}
              selectedSectionIndex={currentSectionIndex}
              id={index}
              root={root}
              key={index}
              locations={section.coordinates}
              peaks={section.peaks}
              width={Math.trunc((width * section.distance) / 1000 / 40) || 200}
              height={200}
              domain={domain}
              displayLine={false}
              areaColor={areaColor}
              backgroundColor={"transparent"}
              sectionsColor={sectionsColor}
              currentSectionColor={currentSectionColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default styled(Sections);
