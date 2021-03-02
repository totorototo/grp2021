import styled from "styled-components";
import THEME from "../../theme/Theme";

const style = (Component) => styled(Component)`
  background: -webkit-linear-gradient(
    0deg,
    var(--color-homepage-light),
    var(--color-homepage-dark)
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    0deg,
    var(--color-homepage-light),
    var(--color-homepage-dark)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  width: 100%;

  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  color: var(--color-text);

  .menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    flex: 1;

    > * {
      margin: 12px;
    }

    .category {
      display: flex;
      flex-direction: column;
      align-items: center;
      > div:first-child {
        font-weight: var(--font-weight-bold);
      }
    }
  }

  .conditions {
    display: flex;
    > * {
      margin: 12px;
    }

    .condition {
    }

    .logo {
      margin-left: auto;
    }
  }

  @media screen and (min-width: ${THEME.breakpoints[0]}) {
    .menu {
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;

      .category {
        align-items: flex-start;
      }
    }
    .awards {
      margin-left: auto;
    }
  }
`;

export default style;
