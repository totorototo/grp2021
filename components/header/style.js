import styled from "styled-components";
import THEME from "../../theme/Theme";
import DropDown from "../dropDown/DropDown";

const style = (Component) => styled(Component)`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  justify-content: center;

  //background: -webkit-linear-gradient(
  //  0deg,
  //  var(--color-homepage-dark),
  //  var(--color-homepage-light)
  //); /* Chrome 10-25, Safari 5.1-6 */
  //
  //background: linear-gradient(
  //  0deg,
  //  var(--color-homepage-light),
  //  var(--color-homepage-dark)
  //); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  color: var(--color-text);

  .wave-wrapper {
    overflow: hidden;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 90px;
    transform: translateY(1px);
    //z-index: 3;

    .wave {
      position: absolute;
      left: -3%;
      right: -3%;
      bottom: 0;
      width: 106%;
      min-width: 600px;
      fill: var(--color-background);
      transition: fill 0.5s ease 0s;
    }
  }

  .menu {
    font-size: 1.1em;
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    //margin-top: 1rem;

    .title {
      transition: background-color 0.5s ease, color 0.5s ease;
    }

    .menu-items {
      display: none;
    }

    .settings {
      display: none;
    }

    .hamburger {
      z-index: 2000;
    }

    @media screen and (min-width: ${THEME.breakpoints[0]}) {
      .settings {
        display: flex;
      }

      .menu-items {
        display: flex;
        text-transform: capitalize;

        ${DropDown} {
          padding: 8px 8px 8px 8px;
        }

        a {
          padding: 8px 8px 8px 8px;
          text-decoration: none;
          color: var(--color-text);
          display: block;
          transition: 0.3s;
        }

        a:hover {
          color: var(--color-gray-200);
        }
      }

      .hamburger {
        display: none;
      }
    }
  }
`;

export default style;
