import styled from "styled-components";

const style = (Component) => styled(Component)`
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //justify-content: center;
  position: relative;
  white-space: nowrap;

  a {
    padding: 0;
  }

  :hover .menu-items-wrapper .menu-items {
    max-height: 500px;
  }

  .label {
    display: flex;

    :hover {
      cursor: pointer;
    }
  }

  .menu-items-wrapper {
    position: absolute;
    top: 50px;

    .menu-items {
      position: relative;
      z-index: 200;
      max-height: 0;
      overflow: hidden;
      transition: all 0.15s ease;
      background-color: pink;
      color: black;
      border-radius: 8px;

      .horizontal {
        padding: 0.5rem;
        display: flex;
        flex-direction: row;

        .horizontal-items {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          margin: 1rem;
          :not(:first-child) {
            margin-left: 0;
          }
          > *:first-child {
            text-transform: capitalize;
          }
        }
      }

      .vertical {
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
      }
    }
  }
`;

export default style;
