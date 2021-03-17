import styled from "styled-components";

const style = (Component) => styled(Component)`
  height: 100%;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  background-color: var(--color-blurred-background);
  overflow-x: hidden;
  //transition: width 0.5s;
  padding-top: 60px;
  display: flex;
  flex-direction: column;

  &.opened {
    width: 100%;
    transition-property: width;
    transition-duration: 0.4s;
    transition-timing-function: ease-in;

    a {
      transform: translateX(0);
      transition: color 0.3s, transform 0.2s 0.3s;
      //transition-duration: 0.3s;
      transition-timing-function: ease-in;
      //transition-delay: 0.2s;
    }
  }

  &.closed {
    transition-property: width;
    transition-duration: 0.3s;
    transition-timing-function: ease-in;
    transition-delay: 0.2s;
    width: 0;
    a {
      transform: translateX(-100%);
      transition-property: transform;
      transition-duration: 0.3s;
      transition-timing-function: ease-in;
    }
  }

  .side-menu {
    display: flex;
    flex-direction: column;
    a {
      padding: 8px 8px 8px 8px;
      text-decoration: none;
      border-style: none;
      font-size: var(--font-size-medium);
      color: var(--color-text);
      display: block;

      //transition: color 0.3s;

      width: 300px;
    }

    a:hover {
      color: #f1f1f1;
    }
  }

  .close-button {
    color: #818181;
    position: absolute;
    top: 0;
    right: 12px;
    font-size: 36px;
    font-weight: lighter;
    margin-left: 50px;
    cursor: pointer;
    :hover {
      color: #f1f1f1;
    }
  }

  .command {
    padding: 8px 8px 8px 8px;
    margin-top: auto;
    margin-bottom: 12px;
  }
`;

export default style;
