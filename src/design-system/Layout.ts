import { CSSProperties } from "react";
import { styled } from "styled-components";

import { Box } from "./Box";

type GridProps = {
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  gap?: CSSProperties["gap"];
};

export const Row = styled(Box)<GridProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: ${(props) => props.alignItems || "center"};
  gap: ${(props) => props.gap || "0"};
`;
