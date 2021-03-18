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

  .horizontal-ticks {
    g {
      text {
        opacity: 0;
      }
      line {
        opacity: 0.1;
      }
    }
    g:nth-child(4n + 0) {
      text {
        opacity: 1;
      }
      line {
        opacity: 1;
      }
    }
  }

  .vertical-ticks {
    g {
      text {
        opacity: 0;
      }
      line {
        opacity: 0.1;
      }
    }
    g:nth-child(4n + 0) {
      text {
        opacity: 1;
      }
      line {
        opacity: 1;
      }
    }
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
