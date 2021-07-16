import styled from "styled-components";

const style = (Component) => styled(Component)`
  top: 0;
  left: 0;

  .stages-container {
    position: absolute;
    height: 100%;
    bottom: 0;
    top: 0;
    width: 100vw;
    scroll-snap-type: x mandatory;
    display: flex;
    overflow: auto;
    flex: none;
    flex-flow: row nowrap;
  }
`;

export default style;
