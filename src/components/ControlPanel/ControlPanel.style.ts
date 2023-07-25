import { styled } from "styled-components";

export const Panel = styled.header`
  width: 100vw;
  height: var(--panel-height);

  padding: 2rem;
  background-color: var(--gray-800);

  position: fixed;
  top: 0;
  left: 0;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: var(--gray-100);
`;

export const Subtitle = styled.h2`
  margin-left: 0.5rem;
  font-size: 1.5rem;
  color: var(--gray-300);
`;
