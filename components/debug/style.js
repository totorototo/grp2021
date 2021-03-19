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

  p {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    span {
      &.category {
        font-weight: bolder;
        font-size: 1.2rem;
        margin-bottom: 0.2rem;
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
