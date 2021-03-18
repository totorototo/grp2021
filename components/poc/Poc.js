import React, { useEffect, useState, useRef } from "react";
import { LinearGradient } from "@vx/gradient";
import styled from "styled-components";

import style from "./style";
import {
  createXScale,
  createYScale,
  getArea,
  getLine,
  getLines,
} from "../../helpers/d3";
import Gradient from "../gradient/Gradient";
import useIntersect from "../../hooks/useIntersect";

const Container = styled.div`
  height: 100%;
  position: relative;
  scroll-snap-align: center;

  .detail {
    min-width: 100vw;
    width: 100vw;
    height: 100%;
    display: grid;
    place-items: center;
    font-weight: bolder;
    font-size: 10rem;
    opacity: 0.4;

    &.current {
      opacity: 1;
    }
  }
`;

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
        {id}
      </div>
    </Container>
  );
};

const MARKER_WIDTH = 30;

const Marker = ({ width, height, x, y }) => (
  <svg height={height} viewBox="0 0 512 512" width={width} x={x} y={y - height}>
    <g>
      <path
        fill="#E24E1B"
        d="M256,0C156.698,0,76,80.7,76,180c0,33.6,9.302,66.301,27.001,94.501l140.797,230.414
	c2.402,3.9,6.002,6.301,10.203,6.901c5.698,0.899,12.001-1.5,15.3-7.2l141.2-232.516C427.299,244.501,436,212.401,436,180
	C436,80.7,355.302,0,256,0z M256,270c-50.398,0-90-40.8-90-90c0-49.501,40.499-90,90-90s90,40.499,90,90
	C346,228.9,306.999,270,256,270z"
      />
      <path
        fill="#E24E1B"
        d="M256,0v90c49.501,0,90,40.499,90,90c0,48.9-39.001,90-90,90v241.991
	c5.119,0.119,10.383-2.335,13.3-7.375L410.5,272.1c16.799-27.599,25.5-59.699,25.5-92.1C436,80.7,355.302,0,256,0z"
      />
    </g>
  </svg>
);

const Poc = ({
  className,
  width,
  height,
  coordinates,
  domain,
  offsetMin = 0,
  offsetMax = 0,
  peaks = [],
  sections,
  currentIndex,
  currentSectionIndex,
}) => {
  const [profileArea, setProfileArea] = useState();
  const [scales, setScales] = useState({});
  const [profilePath, setProfilePath] = useState();
  const [lines, setLines] = useState();
  const [highlightedSectionIndex, setHighlightedSectionIndex] = useState();
  const [progression, setProgression] = useState();
  const [markers, setMarkers] = useState();
  const [highlightedArea, setHighlightedArea] = useState();

  const root = useRef(null);

  useEffect(() => {
    if (
      !highlightedSectionIndex ||
      !scales.x ||
      !scales.y ||
      !sections ||
      sections.length === 0
    )
      return;

    const highlightedCoordinates = [
      ...new Array(coordinates.length),
    ].map(() => [0, 0, 0]);

    highlightedCoordinates.splice(
      sections[highlightedSectionIndex].indices[0],
      sections[highlightedSectionIndex].coordinates.length,
      ...sections[highlightedSectionIndex].coordinates
    );

    const area = getArea(
      highlightedCoordinates,
      scales.x,
      scales.y,
      domain.y.min - offsetMin
    );
    //console.log(area);
    setHighlightedArea(area);
  }, [
    highlightedSectionIndex,
    domain,
    coordinates,
    scales,
    offsetMin,
    sections,
  ]);

  useEffect(() => {
    if (currentIndex === -1 || !scales.x || !scales.y) return;
    const locationsVisited = coordinates.slice(0, currentIndex);
    const progress = getArea(
      locationsVisited,
      scales.x,
      scales.y,
      domain.y.min - offsetMin
    );
    setProgression(progress);

    const marker = {
      x: currentIndex,
      y:
        coordinates[currentIndex] && coordinates[currentIndex][2]
          ? coordinates[currentIndex][2]
          : 0,
    };
    setMarkers([marker]);
  }, [currentIndex, domain, coordinates, scales, offsetMin]);

  useEffect(() => {
    if (sections.length === 0 || !scales.x || !scales.y) return;

    const points = sections.map((section) => [
      { x: section.indices[1], y: 300 },
      {
        x: section.indices[1],
        y: coordinates[section.indices[1]][2],
      },
    ]);

    const delimiterLines = getLines(points, scales.x, scales.y);
    setLines(delimiterLines);
  }, [domain, coordinates, scales, offsetMin, sections]);

  useEffect(() => {
    if (!scales.x || !scales.y) return;
    const area = getArea(
      coordinates,
      scales.x,
      scales.y,
      domain.y.min - offsetMin
    );

    const line = getLine(coordinates, scales.x, scales.y);

    setProfileArea(area);
    setProfilePath(line);
  }, [scales, coordinates, domain, offsetMin]);

  useEffect(() => {
    if (!domain) return;
    const x = createXScale(
      {
        min: 0,
        max: coordinates.length - 1,
      },
      { min: 0, max: width * 2.5 }
    );

    const y = createYScale(
      { min: domain.y.min - offsetMin, max: domain.y.max + offsetMax },
      { min: 0, max: height / 2 }
    );

    setScales({ x, y });
  }, [width, height, coordinates, domain]);
  return (
    <div className={className} style={{ width, height }}>
      <div className={"sections-container"} ref={root}>
        {sections.map((section, index) => (
          <Section
            section={section}
            id={index}
            root={root}
            key={index}
            height={200}
            setHighlightedSectionIndex={setHighlightedSectionIndex}
            highlightedSectionIndex={highlightedSectionIndex}
            currentSectionIndex={currentSectionIndex}
          />
        ))}
      </div>
      <div className={"svg-container"} style={{ width, height: height / 2 }}>
        <svg
          height={height / 2}
          width={width * 2}
          viewBox={`0 0 ${width * 2.5} ${height / 2}`}
        >
          <Gradient
            from={"#ff0000"}
            to={"#ebebeb00"}
            toOffset={"100%"}
            id="gradient"
          />
          {profilePath && (
            <path
              d={profilePath.path}
              stroke={"#F4A301"}
              strokeWidth="1"
              fill={"transparent"}
            />
          )}
          {profileArea && (
            <path
              d={profileArea.path}
              stroke={"transparent"}
              strokeWidth="0"
              fill={"#F4A301"}
              opacity={0.1}
            />
          )}
          {highlightedArea && (
            <path
              d={highlightedArea.path}
              stroke={"transparent"}
              strokeWidth="0"
              fill={"#F4A301"}
              opacity={0.4}
            />
          )}
          {progression && <path d={progression.path} fill={"url(#gradient)"} />}
          {markers &&
            scales &&
            markers.length > 0 &&
            markers.map((marker, index) => (
              <Marker
                key={index}
                x={scales.x(marker.x) - MARKER_WIDTH / 2}
                y={scales.y(marker.y)}
                width={MARKER_WIDTH}
                height={MARKER_WIDTH}
              />
            ))}
          {lines &&
            lines.map((line, index) => (
              <path
                key={index}
                d={line.path}
                strokeWidth={"1"}
                stroke={"var(--color-text)"}
                strokeOpacity={0.3}
                strokeDasharray="4 4"
              />
            ))}
          {/*  {peaks &&
            scales.x &&
            scales.y &&
            peaks.length > 0 &&
            peaks.map((peak, index) => (
              <text
                x={scales.x(peak)}
                y={scales.y(coordinates[peak][2]) - 10}
                key={index}
              >
                {coordinates[peak][2].toFixed(0)}
              </text>
            ))}*/}

          {sections &&
            sections.length > 0 &&
            scales.x &&
            scales.y &&
            sections
              // .filter((_, index) => index < sections.length - 1)
              .reduce((accu, section, index, array) => {
                if (!array[index + 1]) return accu;
                if (array[index + 1].toKm !== section.toKm) {
                  return [...accu, section];
                } else return accu;
              }, [])
              .map((section, index) => (
                <g className={"cp"} key={index}>
                  <text
                    className={"km"}
                    x={scales.x(section.indices[1])}
                    y={scales.y(0)}
                    key={index}
                  >
                    {(section.toKm / 1000).toFixed(0)}
                  </text>
                  {/* <text
                    className={"location"}
                    x={scales.x(section.indices[1])}
                    y={scales.y(coordinates[section.indices[1]][2])}
                    key={index}
                    transform={`rotate(-90, ${scales.x(
                      section.indices[1]
                    )},${scales.y(coordinates[section.indices[1]][2])})`}
                  >
                    {section.arrivalLocation}
                  </text>*/}
                  <g>
                    <circle
                      className={"shadow"}
                      cx={scales.x(section.indices[1])}
                      cy={scales.y(coordinates[section.indices[1]][2])}
                      r="4"
                      fill={"#F4A301"}
                    />
                    <circle
                      onClick={() => console.log("bim")}
                      cx={scales.x(section.indices[1])}
                      cy={scales.y(coordinates[section.indices[1]][2])}
                      r="3"
                      fill={"white"}
                    >
                      <title>{section.arrivalLocation}</title>
                    </circle>
                  </g>
                </g>
              ))}
        </svg>
      </div>
    </div>
  );
};

export default style(Poc);
