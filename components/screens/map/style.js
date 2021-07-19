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
    //border-radius: 10px;
    position: relative;

    .position {
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 3;
      background-color: #e24e1b;
      color: white;
      padding: 0.4rem;
    }

    .runner-analytics {
      position: absolute;
      top: 60px;
      right: 20px;
      z-index: 3;
      background-color: #e24e1b;
      color: white;
      padding: 0.4rem;
    }

    .fab {
      position: absolute;
      bottom: 20px;
      right: 20px;
      border-radius: 50px;
      width: 48px;
      height: 48px;
      background-color: #e24e1b;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      z-index: 2;
    }
  }

  .mapboxgl-map {
    //border-radius: 10px;
  }

  .mapboxgl-ctrl-bottom-right {
    display: none;
  }
  .mapboxgl-ctrl-bottom-left {
    display: none;
  }
`;

export default style;
