import React, { useEffect, useState } from "react";
import { promises as fs } from "fs";
import path from "path";
import xmldom from "xmldom";
import { gpx } from "@mapbox/togeojson";
import { csvParse } from "d3-dsv";
import {
  differenceInHours,
  differenceInMilliseconds,
  formatDistanceToNow,
} from "date-fns";
import styled from "styled-components";
import * as d3Array from "d3-array";
import { calculateDistance, createPathHelper } from "positic";

import Map from "../../components/map/Map";
import AutoSizer from "../../components/autoSizer/AutoSizer";
import ClientOnly from "../../components/clientOnly/ClientOnly";
import { Layout } from "../../components";
import Graph from "../../components/graph/Graph";
import detectPeaks from "../../helpers/peak";

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  color: var(--color-text);
  align-items: center;
  justify-content: space-around;
  position: relative;
`;

const FAB = styled.div`
  border-radius: 30%;
  position: absolute;
  bottom: 2em;
  right: 2em;
  width: 2em;
  height: 2em;
  z-index: 22222;
  background-color: yellow;
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  background-color: #2a2d32;
  margin-top: 1em;
`;

const TopSection = styled.div`
  width: 100%;
  padding: 20px;
  height: 100px;
  display: flex;
`;

const Data = styled.div`
  height: 100%;
  max-height: 6em;
  background-color: #2a2d32;
  display: grid;
  justify-content: center;
  align-content: center;
  border-radius: 8px;
  width: 100%;

  :not(:last-child) {
    margin-right: 16px;
  }
  padding: 16px;
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: row;
  color: var(--color-text);
  align-items: center;
  justify-content: space-around;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
`;

const MapContainer = styled.div`
  display: flex;
  width: 100%;
  border-radius: 10px;
  height: 70%;
`;

function Race({
  position,
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
  const [savedPositions, updateSavedPositions] = useState([]);

  useEffect(() => {
    console.log("effect sections");
  }, [sections]);

  useEffect(() => {
    if (!position || !coordinates) return;

    const helper = createPathHelper(coordinates);

    // get current section
    const closestLocation = helper.findClosestPosition(position.coords);
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
    const delta = calculateDistance(closestLocation, position.coords);
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
      { label: "distance", percent: distanceCompleted, color: "red" },
      {
        label: "elevation gain",
        percent: positiveElevationCompleted,
        color: "red",
      },
      {
        label: "elevation loss",
        percent: negativeElevationCompleted,
        color: "red",
      },
    ]);

    updateSavedPositions([
      ...savedPositions,
      {
        location: closestLocation,
        timestamp: position.timestamp,
        distance: helper.getProgressionStatistics(closestLocationIndex)[0] || 0,
      },
    ]);
  }, [position, coordinates]);

  useEffect(() => {
    if (!coordinates) return;
    const altitudes = coordinates.map((location) => location[2]);
    const extentY = d3Array.extent(altitudes);
    const lowerFullHundred = Math.floor(extentY[0] / 100) * 100;
    setDomain((domain) => ({
      ...domain,
      x: { min: 0, max: coordinates.length },
      y: { min: lowerFullHundred, max: extentY[1] * 1.2 },
    }));
  }, [coordinates]);

  return (
    <Layout>
      <Container>
        <FAB
          onClick={() => {
            spot();
          }}
        />
        <TopSection>
          <Data>{`${(distance / 1000).toFixed(0)} km`}</Data>
          <Data>{`${elevation.positive.toFixed(0)} D+`}</Data>
          <Data>{`${elevation.negative.toFixed(0)} D-`}</Data>
          <Data>{`${checkpoints.length} sections`}</Data>
          <Data>
            {`${differenceInHours(
              new Date(checkpoints[checkpoints.length - 1].cutOffTime),
              new Date(checkpoints[0].cutOffTime)
            )} hours`}
          </Data>
          <Data>
            {formatDistanceToNow(new Date(checkpoints[0].cutOffTime), {
              addSuffix: true,
            })}
          </Data>
        </TopSection>
        <MainContainer>
          <LeftSide>
            <MapContainer>
              <Map
                currentLocation={projectedLocation}
                route={route}
                center={center}
                checkPointsLocations={checkPointsLocations}
              />
            </MapContainer>
            <ProfileContainer>
              <ClientOnly>
                <AutoSizer>
                  {({ width, height }) => (
                    <Graph
                      currentIndex={projectedLocationIndex}
                      width={width}
                      height={height}
                      locations={coordinates}
                      mainColor="#F4A301"
                      progressionColor="#007DA3"
                      domain={domain}
                      delimiterIndices={locationsIndices}
                      peaks={peaks}
                    />
                  )}
                </AutoSizer>
              </ClientOnly>
            </ProfileContainer>
          </LeftSide>
          <RightSide>
            <Data>{position && `longitude: ${position.coords[0]} `}</Data>
            <Data>{position && `latitude: ${position.coords[1]} `}</Data>
            <Data>{delta && `delta: ${(delta / 1000).toFixed(4)}`}</Data>
            <Data>{currentSectionIndex && currentSectionIndex}</Data>
            <Data>
              {analytics &&
                `distance: ${(analytics[0] / 1000).toFixed(2)} - D+: ${
                  analytics[1]
                } - D-: ${analytics[2]}`}
            </Data>
          </RightSide>
        </MainContainer>
      </Container>
    </Layout>
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
      const startingDate = new Date(array[index - 1].cutOffTime);
      const duration = differenceInMilliseconds(endingDate, startingDate);
      return [
        ...accu,
        {
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

export default Race;
