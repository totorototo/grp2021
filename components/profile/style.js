import styled from "styled-components";

const style = (Component) => styled(Component)`
  top: 0;
  left: 0;
  // background-color: aqua;
  display: flex;
  flex: 1;
  // background-color: rebeccapurple;
  svg {
    // background-color: blue;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .sections-container {
    position: absolute;
    height: 50%;
    bottom: 0;
    top: 0;
    width: 100vw;

    //  background-color: chartreuse;
    scroll-snap-type: x mandatory;
    display: flex;
    overflow: auto;
    flex: none;
    flex-flow: row nowrap;
  }

  .section-detail {
    display: flex;
    flex: 1 1 auto;
    height: 100%;
    width: 100vw;
    //  background-color: chocolate;
    scroll-snap-align: center;
    min-width: 100vw;
    align-items: center;
    justify-content: center;
    font-size: 10rem;
    font-weight: bolder;
    opacity: 0.3;
  }

  .svg-container {
    position: absolute;
    bottom: 0;
    left: 0;
    overflow-y: scroll;

    .shadow {
      //filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
    }

    g:nth-child(even) {
      .location {
        transform: translate(0.1rem, 0.6rem);
      }
    }

    g:nth-child(odd) {
      .location {
        transform: translate(0.1rem, -0.6rem);
      }
    }

    .cp {
      .km {
        transform: translate(-0.4rem, -0.6rem);
        font-size: 0.6rem;
        color: var(--color-text);
      }

      /*  .location {
        transform: translate(0, -0.5rem);
      }*/
    }
  }

  .profile-container {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: brown;
    width: 800px;
    height: 400px;
  }
`;

export default style;
