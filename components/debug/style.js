import styled from "styled-components";

const style = (Component) => styled(Component)`
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  //background-color: chocolate;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: var(--color-text);
  position: relative;

  p {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    span {
      &.category {
        font-weight: bolder;
        font-size: 1.2rem;
        margin-bottom: 0.2rem;
        font-family: "Love Ya Like A Sister", cursive;
        svg {
          margin-left: 0.3rem;
          background-color: var(--color-alert);
          border-radius: 1rem;
          stroke: var(--color-background);
          padding: 0.2rem;

          &.disable {
            opacity: 0.1;
          }
        }
      }
      &.title {
      }
      &.positions {
        display: flex;
        flex-direction: column;
        .warning {
          color: var(--color-alert);
        }
      }
      &.analytics {
        display: flex;
        flex-direction: column;
      }
      &.progress {
        display: flex;
        flex-direction: column;
      }
      &.position {
        margin-bottom: 0.2rem;
        display: flex;
        flex-direction: column;
      }
      &.projected-position {
        margin-bottom: 0.2rem;
        display: flex;
        flex-direction: column;
      }
      &.delta {
        margin-bottom: 0.2rem;
        display: flex;
        flex-direction: column;
        &.warning {
          span:last-child {
            color: var(--color-alert);
          }
        }
      }
    }
  }
`;

export default style;
