import styled from "styled-components";
import THEME from "../../theme/Theme";

const style = (Component) => styled(Component)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  place-items: center;
  align-items: stretch;
  justify-items: stretch;
  font-size: var(--font-size-small);
  color: var(--color-text);
  background-color: var(--color-background);

  header {
    // height: 160px;
    height: 60px;
  }

  footer,
  main,
  aside {
    //background-color: var(--color-secondary);
    //transition: background-color 0.5s ease, color 0.5s ease;
    //color: var(--color-primary);
  }

  aside {
    display: none;
  }

  @media screen and (min-width: ${THEME.breakpoints[0]}) {
    grid-template: auto 1fr auto / auto 1fr auto;
    font-size: var(--font-size);

    header {
      grid-column: 1 / 4;
    }

    aside {
      &.left {
        display: flex;
        grid-column: 1 / 2;
      }

      &.right {
        display: flex;
        grid-column: 3 / 4;
      }
    }

    main {
      grid-column: 2 / 3;
      background-color: pink;
    }

    footer {
      grid-column: 1 / 4;
    }
  }
`;

export default style;
