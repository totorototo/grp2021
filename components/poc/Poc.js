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
  }
`;

const Section = ({
  root,
  setSelectedSectionIndex,
  id,
  section,
  highlightedSectionIndex,
  setHighlightedSectionIndex,
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
      <div className={"detail"}>{id}</div>
    </Container>
  );
};

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
}) => {
  const [profileArea, setProfileArea] = useState();
  const [scales, setScales] = useState({});
  const [profilePath, setProfilePath] = useState();
  const [lines, setLines] = useState();
  const [highlightedSectionIndex, setHighlightedSectionIndex] = useState();

  const root = useRef(null);

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
