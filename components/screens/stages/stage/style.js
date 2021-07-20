import styled from "styled-components";

const style = (Component) => styled(Component)`
  height: 100%;
  position: relative;
  scroll-snap-align: center;
  display: flex;

  .detail {
    &.current {
      opacity: 1;
    }

    min-width: 100vw;
    width: 100vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    opacity: 0.4;
    padding: 1rem;

    .stage-index {
      font-family: "Love Ya Like A Sister", cursive;
      display: grid;
      place-items: center;
      font-weight: bolder;
      font-size: 7rem;
      letter-spacing: -0.05em;
      min-width: 10rem;
      //flex: 1 1 auto;
    }

    .stage-data {
      display: flex;
      flex: 1 1 auto;
      height: 100%;

      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      span:first-child {
        font-size: 1rem;
        font-weight: bolder;
        //font-family: "Love Ya Like A Sister", cursive;
      }

      .type {
        font-weight: bold;
        //font-family: "Love Ya Like A Sister", cursive;
      }

      .locations {
        font-size: 1.2rem;
        font-weight: bolder;
      }

      span:not(.type) {
        margin-top: 0.1rem;
      }
    }
  }
`;

export default style;
