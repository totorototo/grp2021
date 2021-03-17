import React, { useEffect, useState } from "react";
import { LinearGradient } from "@vx/gradient";

import style from "./style";
import {
  createXScale,
  createYScale,
  getArea,
  getLine,
  getLines,
} from "../../helpers/d3";
import Gradient from "../gradient/Gradient";

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

  useEffect(() => {
    if (sections.length === 0 || !scales.x || !scales.y) return;

    const points = sections.map((section) => [
      { x: section.indices[1], y: 200 },
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
              stroke={"black"}
              strokeWidth="1"
              fill={"transparent"}
            />
          )}
          {profileArea && (
            <path
              d={profileArea.path}
              stroke={"transparent"}
              strokeWidth="0"
              fill={"url(#gradient)"}
            />
          )}
          {lines &&
            lines.map((line, index) => (
              <path
                key={index}
                d={line.path}
                stroke="var(--color-text)"
                strokeWidth="1"
                strokeDasharray="2 2"
                //strokeOpacity="0.4"
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
                  <text
                    className={"location"}
                    x={scales.x(section.indices[1])}
                    y={scales.y(coordinates[section.indices[1]][2])}
                    key={index}
                    /*  transform={`rotate(-90, ${scales.x(
                      section.indices[1]
                    )},${scales.y(coordinates[section.indices[1]][2])})`}*/
                  >
                    {section.arrivalLocation}
                  </text>
                  <g>
                    <circle
                      className={"shadow"}
                      cx={scales.x(section.indices[1])}
                      cy={scales.y(coordinates[section.indices[1]][2])}
                      r="4"
                      fill={"black"}
                    />
                    <circle
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
