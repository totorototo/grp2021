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
    right: 1rem;
    background-color: var(--color-gray-300);
    padding: 0.5rem;
    border-radius: 2rem;

    svg {
      stroke: var(--color-text);
      stroke-width: 2;
    }

    &.open {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

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

      p {
        display: flex;
        flex-direction: column;
        padding: 1rem;

        .category {
          font-weight: bolder;
          font-size: 1.2rem;
          margin-bottom: 0.2rem;
        }

        .step {
          //color: pink;
        }
      }
    }
  }
`;

export default style;
