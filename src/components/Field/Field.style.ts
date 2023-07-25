import { styled } from "styled-components";

export const Field = styled.section<{ $row: number; $col: number }>`
  height: calc(var(--cell-size) * ${(props) => props.$row});
  width: calc(var(--cell-size) * ${(props) => props.$col});

  margin: calc(var(--panel-height) + 2rem) 2rem 2rem;

  display: grid;
  grid-template-rows: repeat(${(props) => props.$row}, 1fr);
  grid-template-columns: repeat(${(props) => props.$col}, 1fr);

  background-color: var(--field-background);
`;
