import styled from "styled-components";

import { Layout } from "../components";

const Main = styled.div`
  font-size: 10em;
  line-height: 0.9;
  letter-spacing: 0.036em;
  font-weight: 500;
  font-style: normal;
  color: var(--color-text);
  font-family: "Love Ya Like A Sister", cursive;
  padding-left: 1rem;
`;

export default function Home() {
  return (
    <Layout>
      <title>trail-buddy.io</title>
      <Main>GRP 2021</Main>
    </Layout>
  );
}
