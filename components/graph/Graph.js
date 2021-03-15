import React, { useEffect, useState } from "react";
import { LinearGradient } from "@vx/gradient";

import styled from "./style";
import {
  createXScale,
  createYScale,
  getArea,
  getLine,
  getLines,
} from "../../helpers/d3";

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

const Gradient = ({
  from = "#F4A301",
  to = "#F4A301",
  toOffset = "10%",
  ...restProps
}) => {
  return (
    <LinearGradient from={from} to={to} toOffset={toOffset} {...restProps} />
  );
};

const Graph = ({
  className,
  width,
  height,
  locations = [],
  currentIndex = -1,
  domain,
  progressionColor = "#000000",
  lineColor = "#FFFFFF",
  areaColor = "#FFFFFF",
  setCurrentPosition = () => {},
  offsetMin = 0,
  offsetMax = 0,
  peaks = [],
  delimiterIndices = [],
  displayLine = false,
  displayArea = true,
}) => {
  const [profileArea, setProfileArea] = useState();
  const [profilePath, setProfilePath] = useState();
  const [progression, setProgression] = useState();
  const [scales, setScales] = useState({});
  const [markers, setMarkers] = useState();
  const [lines, setLines] = useState();

  const handleClick = (event) => {
    if (!scales.x) return;
    const index = Math.round(scales.x.invert(event.nativeEvent.offsetX));
    setCurrentPosition(locations[index]);
  };

  useEffect(() => {
    if (delimiterIndices.length === 0 || !scales.x || !scales.y) return;

    const points = delimiterIndices.map((delimiterIndex) => [
      { x: delimiterIndex, y: 0 },
      {
        x: delimiterIndex,
        y: locations[delimiterIndex][2],
      },
    ]);

    const delimiterLines = getLines(points, scales.x, scales.y);
    setLines(delimiterLines);
  }, [delimiterIndices, domain, locations, scales, offsetMin]);

  useEffect(() => {
    if (currentIndex === -1 || !scales.x || !scales.y) return;
    const locationsVisited = locations.slice(0, currentIndex);
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
        locations[currentIndex] && locations[currentIndex][2]
          ? locations[currentIndex][2]
          : 0,
    };
    setMarkers([marker]);
  }, [currentIndex, domain, locations, scales, offsetMin]);

  useEffect(() => {
    if (!scales.x || !scales.y) return;
    const area = getArea(
      locations,
      scales.x,
      scales.y,
      domain.y.min - offsetMin
    );

    const line = getLine(locations, scales.x, scales.y);

    setProfileArea(area);
    setProfilePath(line);
  }, [scales, locations, domain, offsetMin]);

  useEffect(() => {
    if (!domain) return;
    const x = createXScale(
      {
        min: 0,
        max: locations.length - 1,
      },
      { min: 0, max: width }
    );

    const y = createYScale(
      { min: domain.y.min - offsetMin, max: domain.y.max + offsetMax },
      { min: 0, max: height }
    );

    setScales({ x, y });
  }, [width, height, locations, domain, offsetMin, offsetMax]);

  return locations.length > 0 && profileArea && profilePath ? (
    <div className={className} style={{ width, height }}>
      <svg
        onClick={handleClick}
        height={height}
        width={width}
        viewBox={`0 0 ${width} ${height}`}
      >
        <Gradient
          from={"#ebebeb80"}
          to={"#ebebeb40"}
          toOffset={"100%"}
          id="gradient"
        />
        {displayLine && (
          <path
            d={profilePath.path}
            stroke={lineColor}
            strokeWidth="1"
            fill={"transparent"}
          />
        )}

        {displayArea && (
          <path
            d={profileArea.path}
            stroke={areaColor}
            strokeWidth="0"
            fill={areaColor}
          />
        )}

        {progression && <path d={progression.path} fill={"url(#gradient)"} />}
        {peaks &&
          scales &&
          peaks.length > 0 &&
          peaks.map((peak, index) => (
            <text
              x={scales.x(peak)}
              y={scales.y(locations[peak][2]) - 10}
              key={index}
            >
              {locations[peak][2].toFixed(0)}
            </text>
          ))}
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
              stroke="#121212"
              strokeWidth="1"
              strokeDasharray="2 2"
              strokeOpacity="0.4"
            />
          ))}
      </svg>
    </div>
  ) : null;
};

export default styled(Graph);
