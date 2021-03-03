import styled from "styled-components";

const style = (Component) => styled(Component)`
  position: relative;

  .intervals {
    .group-area {
      :nth-of-type(even) {
        fill: #aeaeae;
      }
      :nth-of-type(odd) {
        fill: #cecece;
      }
      .label {
        font-weight: bolder;
        font-size: 4em;
        :nth-of-type(even) {
          fill: #ffffff94;
        }
        :nth-of-type(odd) {
          fill: #ffffff94;
        }
      }
    }
  }

  .checkpoints {
    .line {
      opacity: 0.4;
      stroke: #ffffff94;
      stroke-dasharray: 4 4;
      :first-child {
        stroke-width: 0;
      }
      :last-child {
        stroke-width: 0;
      }
    }
  }
`;

export default style;
