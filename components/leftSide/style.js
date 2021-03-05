import styled from "styled-components";

/*const style = (Component) => styled(Component)`
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background);
  transition: background-color 0.5s ease, color 0.5s ease;
  color: var(--color-text);
  // width: 2em;
`;

export default style;*/

const style = (Component) => styled(Component)`
  position: relative;
  > svg {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px;
    background-color: yellow;
  }
`;

export default style;
