import React, { Fragment, useEffect, useState } from "react";
import {
  eachDayOfInterval,
  differenceInMilliseconds,
  addMilliseconds,
  addHours,
  differenceInHours,
  isBefore,
  isAfter,
  format,
} from "date-fns";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as d3Array from "d3-array";

import styled from "./style";

const d3 = {
  scale,
  shape,
  d3Array,
};

const OFFSET_Y = 30;
const OFFSET_X = 30;

const createXScale = (start, end, rangeMin, rangeMax) => {
  return d3.scale.scaleTime().domain([start, end]).range([rangeMin, rangeMax]);
};

const createYScale = (start, end, rangeMin, rangeMax) => {
  return d3.scale
    .scaleLinear()
    .domain([start, end])
    .range([rangeMin, rangeMax]);
};

const Live = ({
  className,
  checkpoints,
  positions,
  width,
  height,
  color,
  bgColor = "var(--color-background)",
}) => {
  const [scales, setScales] = useState();
  const [shifts, setShifts] = useState();
  const [enhancedCheckpoints, setEnhancedCheckpoints] = useState();
  const [timeSpansArea, setTimeSpansArea] = useState();
  const [livePath, setLivePath] = useState();
  const [verticalTicks, setVerticalTicks] = useState([]);
  const [horizontalTicks, setHorizontalTicks] = useState([]);
  const [xAxisLine, setXAxisLine] = useState();
  const [yAxisLine, setYAxisLine] = useState();
  const [slowLine, setSlowLine] = useState();
  const [fastLine, setFastLine] = useState();

  // horizontal ticks
  useEffect(() => {
    const tickPeriod = 4;
    let date = new Date(checkpoints[0].cutOffTime);

    const markers = [];

    while (
      differenceInMilliseconds(
        date,
        new Date(checkpoints[checkpoints.length - 1].cutOffTime)
      ) < 0
    ) {
      markers.push(date);
      date = addHours(date, tickPeriod);
    }

    setHorizontalTicks(markers);
  }, [checkpoints]);

  // vertical ticks
  useEffect(() => {
    const tickPeriod = 20;
    const distance = checkpoints[checkpoints.length - 1].km;
    const times = (distance - (distance % tickPeriod)) / tickPeriod;

    const markers = [];
    for (let i = 0; i <= times; i++) {
      markers.push(i * tickPeriod);
    }
    setVerticalTicks(markers);
  }, [checkpoints]);

  // compute scales
  useEffect(() => {
    if (!height && !width) return;
    if (!checkpoints || checkpoints.length <= 0) return;

    const x = createXScale(
      new Date(checkpoints[0].cutOffTime),
      new Date(checkpoints[checkpoints.length - 1].cutOffTime),
      OFFSET_X,
      width - 10
    );

    const y = createYScale(
      checkpoints[checkpoints.length - 1].km,
      0,
      10,
      height - OFFSET_Y
    );
    setScales({ x, y });
  }, [width, height, checkpoints]);

  // compute shifts (days)
  useEffect(() => {
    if (!checkpoints) return;

    const days = eachDayOfInterval({
      start: new Date(checkpoints[0].cutOffTime),
      end: new Date(checkpoints[checkpoints.length - 1].cutOffTime),
    });

    // remove first item -> 00-AM to start date
    days.shift();
    // add race start time -> start date to 00-PM
    days.unshift(new Date(checkpoints[0].cutOffTime));
    //add race finish time -> OO-AM to finish date
    days.push(new Date(checkpoints[checkpoints.length - 1].cutOffTime));

    const shifts = days.reduce((shifts, day, index, array) => {
      if (index < array.length - 1) {
        return [...shifts, { start: day, end: array[index + 1] }];
      }
      return shifts;
    }, []);
    setShifts(shifts);
  }, [checkpoints]);

  // compute time spans area
  useEffect(() => {
    if (!scales || !enhancedCheckpoints) return;

    const sh = d3.shape
      .area()
      .x0((d) => scales.x(new Date(d.fast)))
      .x1((d) => scales.x(new Date(d.slow)))
      .y((d) => scales.y(d.distance))
      .curve(d3.shape.curveLinear);
    const path = sh(enhancedCheckpoints);
    setTimeSpansArea(path);
  }, [scales, enhancedCheckpoints]);

  // compute time span extremes (slow -fast)
  useEffect(() => {
    if (!checkpoints) return;

    const start = new Date(checkpoints[0].cutOffTime);

    const enhancedCheckpoints = checkpoints.reduce(
      (enhancedCheckpoints, checkpoint) => {
        const slow = new Date(checkpoint.cutOffTime);
        const duration = differenceInMilliseconds(slow, start);
        const fast = addMilliseconds(start, duration / 2);
        const name = checkpoint["\ufeffsite"];

        const distance = checkpoint.km;
        return [...enhancedCheckpoints, { fast, slow, distance, name }];
      },
      []
    );

    setEnhancedCheckpoints(enhancedCheckpoints);
  }, [checkpoints]);

  // time span and lines (slow - fast)
  useEffect(() => {
    if (!scales || !checkpoints) return;

    const getLine = d3.shape
      .line()
      .x((d) => scales.x(new Date(d[1])))
      .y((d) => scales.y(d[0]))
      .defined((d) => !d.fake);

    const xOrigin = [0, checkpoints[0].cutOffTime];
    const xDestination = [0, checkpoints[checkpoints.length - 1].cutOffTime];
    const xAxisData = [xOrigin, xDestination];
    const xAxis = getLine(xAxisData);

    const yOrigin = [0, checkpoints[0].cutOffTime];
    const yDestination = [
      checkpoints[checkpoints.length - 1].km,
      checkpoints[0].cutOffTime,
    ];
    const yAxisData = [yOrigin, yDestination];
    const yAxis = getLine(yAxisData);

    setXAxisLine(xAxis);
    setYAxisLine(yAxis);

    const slowLineData = enhancedCheckpoints.map((enhancedCheckpoint) => [
      enhancedCheckpoint.distance,
      enhancedCheckpoint.slow,
    ]);

    const fastLineData = enhancedCheckpoints.map((enhancedCheckpoint) => [
      enhancedCheckpoint.distance,
      enhancedCheckpoint.fast,
    ]);

    const fastLine = getLine(fastLineData);
    const slowLine = getLine(slowLineData);

    setFastLine(fastLine);
    setSlowLine(slowLine);
  }, [scales, checkpoints]);

  // runner positions and path line
  useEffect(() => {
    if (!scales || !positions || positions.length <= 0 || !checkpoints) return;

    const start = new Date(checkpoints[0].cutOffTime);
    const end = new Date(checkpoints[checkpoints.length - 1].cutOffTime);
    const raceDistance = checkpoints[checkpoints.length - 1].km;

    const positions = positions
      .filter((location) => {
        const current = new Date(location.timestamp);
        return (
          isAfter(current, start) &&
          isBefore(current, end) &&
          location.distance <= raceDistance
        );
      })
      .map((location) => [location.km / 1000, new Date(location.timestamp)]);

    const getLine = d3.shape
      .line()
      .x((d) => scales.x(new Date(d[1])))
      .y((d) => scales.y(d[0]))
      .defined((d) => !d.fake);

    const path = getLine(positions);
    setLivePath(path);
  }, [positions, scales, checkpoints]);

  return scales ? (
    <div className={className} style={{ width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g className="shifts">
          <g className="group-area">
            {shifts &&
              shifts.map((interval, index) => {
                return (
                  <line
                    key={index}
                    x1={scales.x(new Date(interval.start))}
                    x2={scales.x(new Date(interval.start))}
                    y1={"0"}
                    y2={height - OFFSET_Y}
                    strokeWidth={"1"}
                    stroke={"var(--color-text)"}
                    strokeOpacity={0.3}
                    strokeDasharray="4 4"
                  />
                );
              })}
          </g>
        </g>
        <g className="horizontal-ticks">
          {horizontalTicks.map((tick, index) => (
            <g key={`${index}-group`}>
              <text
                writingMode="tb"
                key={`${index}-text`}
                fontSize="12"
                fill="var(--color-text)"
                x={scales.x(new Date(tick))}
                y={height - 20}
              >
                {differenceInHours(
                  new Date(tick),
                  new Date(checkpoints[0].cutOffTime)
                )}
              </text>
              <line
                stroke="var(--color-text)"
                key={`${index}-tick`}
                x1={scales.x(new Date(tick))}
                x2={scales.x(new Date(tick))}
                y2={height - OFFSET_Y + 5}
                y1={height - OFFSET_Y}
              />
            </g>
          ))}
        </g>
        <g className={"axis"}>
          {xAxisLine && yAxisLine}&&(
          <path
            d={xAxisLine}
            fill="none"
            stroke="var(--color-text)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <path
            d={yAxisLine}
            fill="none"
            stroke="var(--color-text)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          )
        </g>
        <g className="vertical-ticks">
          {verticalTicks.map((tick, index) => (
            <g key={`${index}-group`}>
              <text
                key={`${index}-text`}
                fontSize="12"
                fill="var(--color-text)"
                x={0}
                y={scales.y(tick) + 5}
              >
                {tick}
              </text>
              <line
                stroke="var(color-text)"
                key={`${index}-tick`}
                x1={OFFSET_X - 5}
                x2={OFFSET_X}
                y2={scales.y(tick)}
                y1={scales.y(tick)}
              />
            </g>
          ))}
        </g>
        {timeSpansArea && (
          <path
            fillOpacity="0.1"
            d={timeSpansArea}
            strokeWidth="0"
            fill={color}
          />
        )}
        <g className={"lines"}>
          {slowLine && fastLine && (
            <g>
              <path
                d={slowLine}
                fill="none"
                stroke={color}
                strokeWidth="1"
                strokeOpacity="1"
              />
              <path
                d={fastLine}
                fill="none"
                stroke={color}
                strokeWidth="1"
                strokeOpacity="1"
              />
            </g>
          )}
        </g>
        <g className={"checkpoints-markers"}>
          {enhancedCheckpoints &&
            enhancedCheckpoints.map((enhancedCheckpoints, index) => (
              <g key={`${index}-main-circle`}>
                <g  key={`${index}-outer-circle`}>
                  <circle
                    cx={scales.x(enhancedCheckpoints.slow)}
                    cy={scales.y(enhancedCheckpoints.distance)}
                    r="4"
                    fill={color}
                  />
                  <circle
                    cx={scales.x(enhancedCheckpoints.slow)}
                    cy={scales.y(enhancedCheckpoints.distance)}
                    r="3"
                    fill={bgColor}
                  >
                    <title>
                      {`${enhancedCheckpoints.name} - ${format(
                        new Date(enhancedCheckpoints.slow),
                        "dd-MM HH:mm"
                      )}`}
                    </title>
                  </circle>
                </g>
                <g  key={`${index}-inner-circle`}>
                  <circle
                    cx={scales.x(enhancedCheckpoints.fast)}
                    cy={scales.y(enhancedCheckpoints.distance)}
                    r="4"
                    fill={color}
                  />
                  <circle
                    cx={scales.x(enhancedCheckpoints.fast)}
                    cy={scales.y(enhancedCheckpoints.distance)}
                    r="3"
                    fill={bgColor}
                  />
                </g>
              </g>
            ))}
        </g>
        {livePath && (
          <path
            d={livePath}
            fill="none"
            stroke="#357597"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeOpacity="0.9"
          />
        )}
      </svg>
    </div>
  ) : null;
};

export default styled(Live);
