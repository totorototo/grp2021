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
  .report {
    position: absolute;
    bottom: 3rem;
    right: 2rem;
    background-color: #e24e1b;
    padding: 0.5rem;
    border-radius: 2rem;

    svg {
      stroke: var(--color-background);
      stroke-width: 2;
    }

    &.open {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      top: 0;
      left: 0;
      bottom: 3rem;
      right: 2rem;

      border-radius: 0;
      background-color: var(--color-background);
      opacity: 0.8;
      svg {
        stroke: #e24e1b;
        align-self: flex-end;
      }
    }
  }
`;

export default style;
