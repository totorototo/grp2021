import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  position: relative;
  scroll-snap-align: center;
  display: flex;

  .detail {
    min-width: 100vw;
    width: 100vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    opacity: 0.4;
    padding: 1rem;

    .section-index {
      display: grid;
      place-items: center;
      font-weight: bolder;
      font-size: 6rem;
      letter-spacing: -0.05em;
      min-width: 10rem;
      //flex: 1 1 auto;
    }

    .section-data {
      display: flex;
      flex: 1 1 auto;
      height: 100%;

      flex-direction: column;
      // background-color: chocolate;
      align-items: flex-start;
      justify-content: center;

      span:first-child {
        font-size: 1.1rem;
        font-weight: bolder;
      }

      .type {
        font-weight: bolder;
      }

      .locations {
        font-size: 1.2rem;
        font-weight: bolder;
      }

      span:not(.type) {
        margin-top: 0.4rem;
      }
    }

    &.current {
      opacity: 1;
    }
  }
`;

export default Container;
