import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  position: relative;
  scroll-snap-align: center;

  .detail {
    min-width: 100vw;
    width: 100vw;
    height: 100%;
    display: grid;
    place-items: center;
    font-weight: bolder;
    font-size: 10rem;
    opacity: 0.4;

    &.current {
      opacity: 1;
    }
  }
`;

export default Container;
