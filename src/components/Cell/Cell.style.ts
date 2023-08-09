import { styled } from "styled-components";

export const Cell = styled.button<{ $isRevealed: boolean }>`
  width: var(--cell-size);
  height: var(--cell-size);
  background-color: ${(props) => (props.$isRevealed ? "pink" : "gray")};
`;
