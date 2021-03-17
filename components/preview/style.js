import styled from "styled-components";

const style = (Component) => styled(Component)`
  color: var(--color-text);
  width: 100%;
  height: 100%;

  display: flex;
  flex: 1 1 auto;
  /*  flex-wrap: wrap;
  justify-content: center;*/
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  .item {
    background-color: var(--color-background);
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    //flex: 1 1 10rem;
    margin: 5px;
    font-size: 2.3rem;
    color: var(--color-text);
    font-weight: bolder;

    svg {
      margin-right: 1rem;
    }
  }
`;

export default style;
