import styled from "styled-components";

const style = (Component) => styled(Component)`
  color: var(--color-text);
  width: 100%;
  height: 100%;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));

  .item {
    background-color: var(--color-background);
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    svg {
      margin-right: 0.4em;
      opacity: 0.6;
    }
  }
`;

export default style;
