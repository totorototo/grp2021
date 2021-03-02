import styled from "styled-components";

const style = (Component) => styled(Component)`
  align-self: center;
  display: flex;
  flex: 1 1 auto;
  height: 100%;

  .wrapper {
    align-self: center;
    display: flex;
    flex: 1 1 auto;
    height: 100%;
    color: #ffffff94;
    border-radius: 10px;
    position: relative;
  }

  .mapboxgl-map {
    border-radius: 10px;
  }

  .mapboxgl-ctrl-bottom-right {
    display: none;
  }
  .mapboxgl-ctrl-bottom-left {
    display: none;
  }
`;

export default style;
