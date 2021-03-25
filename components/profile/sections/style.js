import styled from "styled-components";

const style = (Component) => styled(Component)`
  height: 100%;
  position: relative;
  scroll-snap-align: center;
  display: flex;

  .detail {
    &.current {
      .section-index {
        //color: pink;
      }
      .section-data {
        .item {
          color: #e24e1b;
        }
      }
    }
    min-width: 100vw;
    width: 100vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    //opacity: 0.4;
    //padding: 1rem;

    .section-index {
      position: absolute;
      top: 0;
      left: 0.2rem;
      bottom: 0;

      display: grid;
      place-items: center;
      font-weight: bolder;
      font-size: 12rem;
      opacity: 0.1;
      //letter-spacing: -0.1em;
      //min-width: 10rem;
      //flex: 1 1 auto;
    }

    .section-data {
      .item {
        background-color: var(--color-background);
        border-radius: 8px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        //flex: 1 1 10rem;
        margin: 5px;
        font-size: 1.4rem;
        color: var(--color-text);
        font-weight: bolder;

        svg {
          margin-right: 1rem;
        }
      }

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
      /* display: flex;
      flex: 1 1 auto;
      height: 100%;

      flex-direction: column;
      align-items: flex-end;
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
      }*/
    }

    &.current {
      opacity: 1;
    }
  }
`;

export default style;
