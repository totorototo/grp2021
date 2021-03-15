import styled from "styled-components";

export default (Component) => styled(Component)`
  text-transform: capitalize;
  background-color: ${(props) => props.backgroundColor || "transparent"};
  color: var(--color-text);

  ${(props) => props.rounded && `border-radius: 0.5rem`};
  padding: 1rem;
`;
