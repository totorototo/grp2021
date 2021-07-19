import styled from "styled-components";

const style = (Component) => styled(Component)`
  font-size: 10px;
  background-color: ${(props) => props.backgroundColor || "transparent"};
  ${(props) => props.rounded && `border-radius: 0.5rem`};

  position: relative;
  opacity: ${(props) => props.opacity || 1};
  > svg {
    > text {
      fill: #ffffff94;
      text-anchor: middle; /* align center */
      dominant-baseline: middle; /* vertical alignment fix */
    }
    position: absolute;
    bottom: 0;
    left: 0;
    ${(props) => props.rounded && `border-radius: 0.5rem`};
  }
`;

export default style;
