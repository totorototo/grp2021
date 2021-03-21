import usePersistedState from "../hooks/usePersistedState";
import { createGlobalStyle } from "styled-components";
import THEME from "../theme/Theme";
import ThemeProvider from "../components/themeProvider/ThemeProvider";
import createRingBuffer from "../helpers/buffer";
import { useEffect, useState } from "react";

const setDefaultColors = (variant = "light") => {
  return Object.entries(THEME.colors[variant]).reduce((accu, [rule, value]) => {
    return `${rule}:${value}; ${accu}`;
  }, "");
};

const setFonts = () => {
  const strings = Object.entries(THEME.font).map(([_, category]) => {
    return Object.entries(category).reduce((accu, [rule, value]) => {
      return `${rule}:${value}; ${accu}`;
    }, "");
  });
  return strings.join(";");
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: var(--font-family-serif);
    margin: 0;

   // * { border: 1px solid red; }

    *, *:before, *:after {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
 

    > div:first-child,
    div#__next,
    div#__next > div {
      height:100vh;
      background-color: var(--color-background);
    }
  }

  :root{
    ${setDefaultColors()};
    ${setFonts()};
  }

`;

//const buffer = createRingBuffer(10);

export default function MyApp({ Component, pageProps }) {
  const [positions, setPositions] = usePersistedState("positions", []);
  const [buffer, setBuffer] = useState();

  useEffect(() => {
    if (!positions) return;

    if (!buffer) {
      const ringBuffer = createRingBuffer(10, positions);
      setBuffer(ringBuffer);
    }
  }, [positions]);

  const spot = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const item = {
        coords: [pos.coords.longitude, pos.coords.latitude],
        timestamp: pos.timestamp,
      };
      if (buffer) {
        buffer.push(item);
        const dump = buffer.dump();
        setPositions(() => [...dump]);
      }
    });
  };

  return (
    <ThemeProvider theme={THEME}>
      <GlobalStyle />
      <Component {...pageProps} positions={positions} spot={spot} />
    </ThemeProvider>
  );
}
