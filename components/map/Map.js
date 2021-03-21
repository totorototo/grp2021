import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useEffect, useContext } from "react";
import MapGL, { Source, Layer } from "react-map-gl";
import DeckGL, { IconLayer } from "deck.gl";

import styled from "./style";
import lightStyle from "./light-style.json";
import darkStyle from "./dark-style.json";
import { Location } from "@styled-icons/octicons";
import { ThemeContext } from "../themeProvider/ThemeProvider";

const Map = ({
  className,
  route,
  center,
  checkPointsLocations,
  currentLocation,
  spot,
  analytics,
}) => {
  const { colorMode } = useContext(ThemeContext);
  const [viewport, setViewport] = useState({
    latitude: 42.82985,
    longitude: 0.32715,
    zoom: 4,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    if (!center) return;

    setViewport((viewport) => ({
      ...viewport,
      latitude: center.latitude,
      longitude: center.longitude,
    }));
  }, [center]);

  return (
    <div className={className}>
      <div className="wrapper">
        <Location
          onClick={() => {
            spot();
          }}
          className={`fab`}
          size="16"
        />
        {currentLocation && (
          <div className={"position"}>{`${currentLocation[1].toFixed(
            5
          )} ${currentLocation[0].toFixed(5)}`}</div>
        )}
        {analytics && (
          <div className={"runner-analytics"}>{`${(analytics[0] / 1000).toFixed(
            0
          )}km ${analytics[1]}D+ ${analytics[2]}D-`}</div>
        )}

        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle={colorMode === "light" ? lightStyle : darkStyle}
          onViewportChange={setViewport}
          mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        >
          {route && (
            <Source id="my-data" type="geojson" data={route}>
              <Layer
                id="route"
                type="line"
                source="route"
                layout={{
                  "line-join": "round",
                  "line-cap": "round",
                }}
                paint={{
                  "line-color": "#F4A301",
                  "line-width": 2,
                }}
              />
            </Source>
          )}
          <DeckGL
            viewState={viewport}
            layers={[
              new IconLayer({
                id: "route-layer",
                data: checkPointsLocations,
                pickable: true,
                iconAtlas: "/icon-atlas.png",
                iconMapping: {
                  marker: {
                    x: 0,
                    y: 0,
                    width: 128,
                    height: 128,
                    anchorY: 128,
                    mask: true,
                  },
                },
                sizeScale: 8,
                getPosition: (d) => [d[0], d[1]],
                getIcon: (d) => "marker",
                getSize: (d) => 3,
                getColor: (d) => [0, 125, 163],
              }),
              new IconLayer({
                id: "location-layer",
                data: currentLocation && [currentLocation],
                pickable: true,
                iconAtlas: "/icon-atlas.png",
                iconMapping: {
                  marker: {
                    x: 0,
                    y: 0,
                    width: 128,
                    height: 128,
                    anchorY: 128,
                    mask: true,
                  },
                },
                sizeScale: 8,
                getPosition: (d) => [d[0], d[1]],
                getIcon: (d) => "marker",
                getSize: (d) => 3,
                getColor: (d) => [226, 78, 27],
              }),
            ]}
          />
        </MapGL>
      </div>
    </div>
  );
};

export default styled(Map);
