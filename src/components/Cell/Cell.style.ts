import { css, styled } from "styled-components";

export const Cell = styled.button<{
  $isRevealed: boolean;
  $isExploded: boolean;
  $value: number;
}>`
  width: var(--cell-size);
  height: var(--cell-size);

  background-color: ${(props) =>
    props.$isRevealed
      ? "transparent"
      : props.$isExploded
      ? "var(--secondary)"
      : "var(--cell-background)"};

  ${({ $isRevealed, $isExploded }) => getBorder($isRevealed, $isExploded)};

  ${({ $value }) => getTypoColor($value)};
  font-size: 1rem;
  font-weight: bold;
`;

function getBorder($isRevealed: boolean, $isExploded: boolean) {
  if ($isRevealed || $isExploded) {
    return css`
      border-width: 0;
    `;
  }

  return css`
    border-width: var(--cell-border);
    border-style: solid;
    border-top-color: var(--cell-border-light);
    border-left-color: var(--cell-border-light);
    border-right-color: var(--cell-border-shade);
    border-bottom-color: var(--cell-border-shade);
  `;
}

function getTypoColor($value: number) {
  let color = "";

  switch ($value) {
    case 1:
      color = "var(--info-000)";
      break;
    case 2:
      color = "var(--info-100)";
      break;
    case 3:
      color = "var(--info-200)";
      break;
    case 4:
      color = "var(--info-300)";
      break;
    case 5:
      color = "var(--info-400)";
      break;
    case 6:
      color = "var(--info-500)";
      break;
    case 7:
      color = "var(--info-600)";
      break;
    case 8:
    default:
      color = "var(--info-700)";
  }

  return css`
    color: ${color};
  `;
}
