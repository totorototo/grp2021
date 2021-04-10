import React, { useEffect, useRef, useState } from "react";

import style from "./style";
import {
  createXScale,
  createYScale,
  getArea,
  getLine,
  getLines,
} from "../../helpers/d3";
import Gradient from "../gradient/Gradient";
import Marker from "../marker/Marker";
import Section from "./sections/Section";

const MARKER_WIDTH = 30;

const Profile = ({
  className,
  width,
  height,
  coordinates,
  domain,
  offsetMin = 0,
  offsetMax = 0,
  peaks = [],
  sections,
  currentIndex = -1,
  currentSectionIndex = 0,
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
      highlightedSectionIndex === undefined ||
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

  // compute current runner position
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

  // compute cp lines
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

  // compute profile path and area
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

  // compute scales
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
          width={width * 2.5}
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
              opacity={0.2}
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
          {peaks &&
            scales.x &&
            scales.y &&
            peaks.length > 0 &&
            peaks.map((peak, index) => (
              <text
                x={scales.x(peak)}
                y={scales.y(coordinates[peak][2]) - 10}
                key={index}
                fill={"var(--color-text)"}
              >
                {coordinates[peak][2].toFixed(0)}
              </text>
            ))}

          {sections &&
            sections.length > 0 &&
            scales.x &&
            scales.y &&
            sections
              // .filter((_, index) => index < sections.length - 1)
              /*.reduce((accu, section, index, array) => {
                if (!array[index + 1]) return accu;
                if (array[index + 1].toKm !== section.toKm) {
                  return [...accu, section];
                } else return accu;
              }, [])*/
              .map((section, index) => (
                <g className={"cp"} key={index}>
                  <text
                    className={"km"}
                    x={scales.x(section.indices[1])}
                    y={scales.y(0)}
                    key={index}
                    fill={"var(--color-text)"}
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
                      fill={"#007DA3"}
                    />
                    <circle
                      onClick={() => console.log("bim")}
                      cx={scales.x(section.indices[1])}
                      cy={scales.y(coordinates[section.indices[1]][2])}
                      r="3"
                      fill={"var(--color-background)"}
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

export default style(Profile);
