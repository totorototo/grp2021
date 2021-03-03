import usePersistedState from "../hooks/usePersistedState";
import { createGlobalStyle } from "styled-components";
import THEME from "../theme/Theme";
import ThemeProvider from "../components/themeProvider/ThemeProvider";

const setDefaultColors = (variant = "dark") => {
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

    *, *:before, *:after {
      box-sizing: border-box;
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

export default function MyApp({ Component, pageProps }) {
  const [position, setPosition] = usePersistedState("position", null);
  const spot = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition({
        coords: [position.coords.longitude, position.coords.latitude],
        timestamp: position.timestamp,
      });
    });
  };

  return (
    <ThemeProvider theme={THEME}>
      <GlobalStyle />
      <Component {...pageProps} position={position} spot={spot} />
    </ThemeProvider>
  );
}
