import { CSSProperties } from "react";
import { styled } from "styled-components";

type BoxProps = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  margin?: CSSProperties["margin"];
  padding?: CSSProperties["padding"];
};

export const Box = styled.div<BoxProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`;
