import styled from "styled-components";

const style = (Component) => styled(Component)`
  font-size: 10px;

  position: relative;
  opacity: ${(props) => props.opacity || 1};
  > svg {
    > text {
      //font-weight: bolder;
      fill: #ffffff94;
      text-anchor: middle; /* align center */
      dominant-baseline: middle; /* vertical alignment fix */
    }
    position: absolute;
    bottom: 0;
    left: 0;
    ${(props) => props.rounded && `border-radius: 10px`}; //border-radius: 10px;
  }
`;

export default style;
