import styled from "styled-components";

const style = (Component) => styled(Component)`
  position: relative;
  background-color: ${(props) => props.bgColor};
  border-radius: 8px;

  title {
  }

  > svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  .shifts {
    .group-area {
      line:first-child {
        stroke-width: 0;
      }
    }
  }
`;

export default style;
