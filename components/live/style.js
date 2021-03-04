import styled from "styled-components";

const style = (Component) => styled(Component)`
  position: relative;

  title {
    background-color: red;
  }

  > .shifts {
    .group-area {
      line:first-child {
        stroke-width: 0;
      }
    }
  }
`;

export default style;
