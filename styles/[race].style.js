import styled from "styled-components";

const style = (Component) => styled(Component)`
  .main-container {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr minmax(200px, 25%);
    color: white;

    .runner {
      display: grid;
      width: 100%;
      height: 100%;
    }

    .race {
      display: flex;
      flex-direction: column;
      flex: 1;
      width: 100%;
      height: 100%;
      padding: 1em;

      .info {
        display: flex;
        flex-direction: row;
        height: 200px;

        .analytics {
          width: 60%;
          height: 100%;
          margin-right: 1em;
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));

          .item {
            background-color: #2a2d32;
            display: grid;
            justify-content: center;
            align-content: center;
            border-radius: 8px;
            position: relative;
          }

          .distance {
            font-size: 4em;
          }

          .sections {
            font-size: 1.4em;

            svg {
              opacity: 0.1;
              margin-bottom: 0.4em;
            }
          }

          .countdown {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1em;

            svg {
              margin-left: 0.4em;
              color: #f4a301;
              opacity: 0.6;
            }
          }

          .duration {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1em;

            svg {
              margin-right: 0.4em;
            }
          }

          .elevation {
            padding: 1em;
            display: flex;
            //justify-content: space-around;
            align-items: center;
            svg {
              margin-right: 1em;
            }

            span {
              background-color: #ffffffaa;
              width: 100%;
              height: 1px;
            }
            .values {
              display: flex;

              height: 100%;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
              font-size: 1.6em;
            }
          }
        }

        .live-tracking {
          width: 40%;
          height: 100%;
          border-radius: 10px;
          background-color: #2a2d32;
        }
      }
      .map {
        display: flex;
        flex: 1;
        width: 100%;
        height: 100%;
        flex-direction: row;
        color: var(--color-text);
        align-items: center;
        justify-content: space-around;
        margin-top: 1em;
      }
      .profile {
        width: 100%;
        height: 150px;
        border-radius: 10px;
        background-color: #2a2d32;
        margin-top: 1em;
      }
    }

    .map-container {
      display: flex;
      flex: 1;
      width: 100%;
      height: 100%;
      flex-direction: row;
      color: var(--color-text);
      align-items: center;
      justify-content: space-around;
    }

    .live-tracking-container {
      display: flex;
      flex: 1;
      width: 100%;
      height: 100%;
      flex-direction: row;
      color: var(--color-text);
    }

    .profile-container {
      width: 100%;
      height: 150px;
      border-radius: 10px;
      background-color: #2a2d32;
      margin-top: 1em;
    }
  }
`;

export default style;
