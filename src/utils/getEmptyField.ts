import { CellMeta, CellStatus, Field } from "@types";

/**
 * 입력받은 행, 열의 크기에 맞춰 빈 게임판을 생성합니다.
 * @param row 게임판의 행 수
 * @param col 게임판의 열 수
 * @returns Field 타입의 빈 게임판
 */
export const getEmptyField = (row: number, col: number): Field => {
  const info = Array.from({ length: row }, (_, rowIdx) =>
    Array.from({ length: col }, (_, colIdx) => ({
      x: rowIdx,
      y: colIdx,
      value: CellMeta.EMPTY,
      status: CellStatus.HIDDEN,
    }))
  );
  return { meta: { row, col, mineCount: 0 }, info };
};
