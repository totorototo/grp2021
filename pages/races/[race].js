import React, { useEffect, useState } from "react";
import { promises as fs } from "fs";
import path from "path";
import xmldom from "xmldom";
import { gpx } from "@mapbox/togeojson";
import { csvParse } from "d3-dsv";
import { differenceInMilliseconds } from "date-fns";
import * as d3Array from "d3-array";
import { calculateDistance, createPathHelper } from "positic";
import { AutoSizer } from "react-virtualized";

import Map from "../../components/map/Map";
import ClientOnly from "../../components/clientOnly/ClientOnly";
import { Layout } from "../../components";
import Graph from "../../components/graph/Graph";
import detectPeaks from "../../helpers/peak";
import Live from "../../components/live/Live";
import style from "../../styles/[race].style";
import Preview from "../../components/preview/Preview";
import Profile from "../../components/profile/Profile";
import Debug from "../../components/debug/Debug";

function Race({
  positions,
  spot,
  distance,
  elevation,
  coordinates,
  checkpoints,
  route,
  center,
  checkPointsLocations,
  sections,
  locationsIndices,
  peaks,
  className,
}) {
  const [domain, setDomain] = useState({
    x: { min: 0, max: 0 },
    y: { min: 0, max: 0 },
  });

  const [delta, setDelta] = useState();
  const [currentSectionIndex, setCurrentSectionIndex] = useState();
  const [analytics, setAnalytics] = useState();
  const [projectedLocation, setProjectedLocation] = useState();
  const [projectedLocationIndex, setProjectedLocationIndex] = useState();
  const [progression, setProgression] = useState();

  useEffect(() => {
    if (!positions || positions.length === 0 || !coordinates) return;

    const helper = createPathHelper(coordinates);
    const sortedPositions = positions.sort((a, b) => a.timestamp - b.timestamp);
    const lastPosition = sortedPositions[sortedPositions.length - 1];

    // get current section
    const closestLocation = helper.findClosestPosition(lastPosition.coords);
    setProjectedLocation(closestLocation);

    const closestLocationIndex = helper.getPositionIndex(closestLocation);
    setProjectedLocationIndex(closestLocationIndex);

    const currentSectionIndex = sections.findIndex((section) => {
      return (
        closestLocationIndex >= section.indices[0] &&
        closestLocationIndex <= section.indices[1]
      );
    });
    setCurrentSectionIndex(currentSectionIndex);

    // compute runner analytics
    const analytics = helper.getProgressionStatistics(closestLocationIndex);
    setAnalytics(analytics);

    // compute error
    const delta = calculateDistance(closestLocation, lastPosition.coords);
    setDelta(delta);

    // compute progression
    const distanceCompleted = ((analytics[0] * 100) / distance).toFixed(2);
    const positiveElevationCompleted = (
      (analytics[1] * 100) /
      elevation.positive
    ).toFixed(2);
    const negativeElevationCompleted = (
      (analytics[2] * 100) /
      elevation.negative
    ).toFixed(2);

    setProgression([
      { label: "distance", percent: distanceCompleted },
      {
        label: "elevation gain",
        percent: positiveElevationCompleted,
      },
      {
        label: "elevation loss",
        percent: negativeElevationCompleted,
      },
    ]);
  }, [positions, coordinates]);

  useEffect(() => {
    if (!coordinates) return;
    const altitudes = coordinates.map((location) => location[2]);
    const extentY = d3Array.extent(altitudes);
    //const lowerFullHundred = Math.floor(extentY[0] / 100) * 100;
    setDomain((domain) => ({
      ...domain,
      x: { min: 0, max: coordinates.length },
      y: { min: 0, max: extentY[1] * 1.2 },
    }));
  }, [coordinates]);

  return (
    <div className={className}>
      <Layout>
        <div className={"container"}>
          <div className={"preview-container child"}>
            <Preview
              distance={distance}
              elevation={elevation}
              checkpoints={checkpoints}
            />
          </div>
          <div className={"map-container child"}>
            <Map
              analytics={analytics}
              spot={spot}
              currentLocation={projectedLocation}
              route={route}
              center={center}
              checkPointsLocations={checkPointsLocations}
            />
          </div>
          <div className={"time-table-container child"}>
            <ClientOnly>
              <AutoSizer>
                {({ width, height }) => (
                  <Live
                    //bgColor="#2a2d32"
                    color="#F4A301"
                    width={width}
                    height={height}
                    checkpoints={checkpoints}
                    positions={positions}
                  />
                )}
              </AutoSizer>
            </ClientOnly>
          </div>
          <div className={"profile-container child"}>
            <ClientOnly>
              <AutoSizer>
                {({ width, height }) => (
                  <Graph
                    backgroundColor="var(--color-background)"
                    rounded
                    currentIndex={projectedLocationIndex}
                    width={width}
                    height={height}
                    locations={coordinates}
                    progressionColor="var(--color-background)"
                    domain={domain}
                    delimiterIndices={locationsIndices}
                    peaks={peaks}
                    displayLine
                    lineColor={"var(--color-text)"}
                  />
                )}
              </AutoSizer>
            </ClientOnly>
          </div>
          <div className={"debug-container child"}>
            <Debug
              positions={positions}
              projectedLocation={projectedLocation}
              delta={delta}
              //savedPositions={savedPositions}
              analytics={analytics}
              progression={progression}
              sections={sections}
            />
          </div>
          <div className={"current-section-container child"}>
            <ClientOnly>
              <AutoSizer>
                {({ width, height }) => (
                  <Profile
                    currentSectionIndex={currentSectionIndex}
                    currentIndex={projectedLocationIndex}
                    width={width}
                    height={height}
                    coordinates={coordinates}
                    domain={domain}
                    delimiterIndices={locationsIndices}
                    peaks={peaks}
                    sections={sections}
                  />
                )}
              </AutoSizer>
            </ClientOnly>
          </div>
        </div>
      </Layout>
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps({ params }) {
  const racesDirectory = path.join(process.cwd(), "races");

  const gpxFilePath = path.join(racesDirectory, `${params.race}.gpx`);
  const gpxFileContents = await fs.readFile(gpxFilePath, "utf8");
  const xml = new xmldom.DOMParser().parseFromString(gpxFileContents);
  const geojson = gpx(xml);
  const coordinates = geojson.features[0].geometry.coordinates;

  // csv
  const csvFilePath = path.join(racesDirectory, `${params.race}.csv`);
  const csvFileContents = await fs.readFile(csvFilePath, {
    encoding: "utf8",
    flag: "r",
  });
  const csv = csvParse(csvFileContents);

  const { columns, ...rest } = csv;
  const checkpoints = Object.values(rest).filter(
    (location) => location.cutOffTime || !/^\s*$/.test(location.cutOffTime)
    // ||
    // location.refueling ||
    // !/^\s*$/.test(location.refueling)
  );

  // compute trail metadata
  const helper = createPathHelper(coordinates);

  // detect peaks
  const peaks = detectPeaks(coordinates, (d) => d[2], {
    lookaround: 90,
    sensitivity: 1,
    coalesce: 16,
    full: false,
  });

  // stats
  const distance = helper.calculatePathLength();
  const elevation = helper.calculatePathElevation();

  const region = helper.calculatePathBoundingBox();
  const latitude = (region.minLatitude + region.maxLatitude) / 2;
  const longitude = (region.minLongitude + region.maxLongitude) / 2;
  const center = { longitude, latitude };

  const refDistance = checkpoints[checkpoints.length - 1].km * 1000;
  const error = distance / refDistance;

  const distances = checkpoints.map(
    (checkpoint) => checkpoint.km * error * 1000
  );

  const locationsIndices = helper.getPositionsIndicesAlongPath(...distances);
  const checkPointsLocations = helper.getPositionsAlongPath(...distances);

  // compute section indices (start - stop)
  const sectionsIndices = locationsIndices.reduce(
    (accum, locationIndex, index, array) => {
      if (index > 0) {
        return [...accum, [array[index - 1], locationIndex - 1]];
      } else return accum;
    },
    []
  );

  // split trace into sections
  const sectionsLocations = sectionsIndices.reduce((accu, sectionIndices) => {
    const section = coordinates.slice(sectionIndices[0], sectionIndices[1]);
    return [...accu, section];
  }, []);

  // compute section stats
  const sectionsStats = sectionsLocations
    //.filter((section) => section.length > 0)
    .map((section) => {
      const helper = createPathHelper(section);
      return section.length > 0
        ? {
            distance: helper.calculatePathLength(),
            elevation: helper.calculatePathElevation(),
            region: helper.calculatePathBoundingBox(),
            coordinates: section,
          }
        : {
            distance: 0,
            elevation: { positive: 0, negative: 0 },
            coordinates: [],
          };
    });

  // aggregate sections details
  const sections = checkpoints.reduce((accu, checkpoint, index, array) => {
    if (index > 0) {
      const endingDate = new Date(checkpoint.cutOffTime);
      const raceStartDate = new Date(array[0].cutOffTime);
      const elapsedHoursFromStart = differenceInMilliseconds(
        endingDate,
        raceStartDate
      );
      const startingDate = new Date(array[index - 1].cutOffTime);
      const duration = differenceInMilliseconds(endingDate, startingDate);
      return [
        ...accu,
        {
          elapsedHoursFromStart,
          startingDate: array[index - 1].cutOffTime,
          endingDate: checkpoint.cutOffTime,
          departureLocation: array[index - 1][columns[0]],
          arrivalLocation: checkpoint[columns[0]],
          duration,
          cutOffTime: checkpoint.cutOffTime,
          ...sectionsStats[index - 1],
          fromKm: helper.getProgressionStatistics(
            sectionsIndices[index - 1][0]
          )[0],
          toKm: helper.getProgressionStatistics(
            sectionsIndices[index - 1][1]
          )[0],
          indices: sectionsIndices[index - 1],
        },
      ];
    }
    return accu;
  }, []);

  // Pass data to the page via props
  return {
    props: {
      route: geojson,
      coordinates,
      checkpoints,
      distance,
      elevation,
      sections,
      center,
      checkPointsLocations,
      peaks,
      locationsIndices,
    },
  };
}

// This function gets called at build time
export async function getStaticPaths() {
  const racesDirectory = path.join(process.cwd(), "races");
  const filenames = await fs.readdir(racesDirectory);

  const regex = /^[^.]+.gpx$/;
  const filteredFiles = filenames.filter((filename) => filename.match(regex));

  const paths = filteredFiles.map(
    (filename) => `/races/${path.parse(filename).name}`
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export default style(Race);
