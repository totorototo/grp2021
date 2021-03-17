import styled from "styled-components";

const style = (Component) => styled(Component)`
  top: 0;
  left: 0;
  // background-color: aqua;

  svg {
    // background-color: blue;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .svg-container {
    position: absolute;
    bottom: 0;
    left: 0;
    overflow-y: scroll;

    .shadow {
      filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
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
        transform: translate(-0.5rem, 0);
        font-size: 0.6rem;
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
