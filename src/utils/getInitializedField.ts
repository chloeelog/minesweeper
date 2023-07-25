import { CellMeta, CellMetaValue, Field, FieldMeta } from "@types";
import { getEmptyField } from "./getEmptyField";

/**
 * 입력받은 행, 열의 크기에 맞춰 초기화 된 게임판을 생성합니다.
 * @param row 게임판의 행 수
 * @param col 게임판의 열 수
 * @param mineCount 게임판의 지뢰 수
 * @returns Field 타입의 초기화 된 게임판
 */

export const getInitializedField = ({ row, col, mineCount }: FieldMeta) => {
  const emptyField = getEmptyField(row, col);

  const fieldWithMines = setMines(emptyField, mineCount);
  const fieldWithAdjacentCellInfo = setAdjacentCellInfo(fieldWithMines);

  return fieldWithAdjacentCellInfo;
};

/**
 * 빈 게임판에 지뢰를 무작위로 배치합니다.
 * @param field 빈 게임판
 * @param count 지뢰 수
 * @returns Field 타입의 지뢰가 배치된 게임판
 */
const setMines = (field: Field, count: number): Field => {
  const cells = field.info.flat();
  const mines = cells
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  const info = field.info.map((row) =>
    row.map((cell) => {
      if (mines.includes(cell)) {
        return {
          ...cell,
          value: CellMeta.MINE,
        };
      }
      return cell;
    })
  );

  return { ...field, meta: { ...field.meta, mineCount: count }, info };
};

/**
 * 각 셀의 주변 지뢰 개수를 계산합니다.
 * @param field 지뢰가 배치된 게임판
 * @returns Field 타입의 셀 정보가 입력된 게임판
 */

const setAdjacentCellInfo = (field: Field): Field => {
  const { row: rowCnt, col: colCnt } = field.meta;
  const { info } = field;

  function getInfo(row: number, col: number) {
    if (info[row][col].value === CellMeta.MINE) {
      return;
    }

    const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
    const dc = [0, 1, 1, 1, 0, -1, -1, -1];

    let mineCount = 0;
    for (let i = 0; i < 8; i++) {
      const nr = row + dr[i];
      const nc = col + dc[i];

      if (nr < 0 || nr >= rowCnt || nc < 0 || nc >= colCnt) {
        continue;
      }

      if (info[nr][nc].value === CellMeta.MINE) {
        mineCount++;
      }
    }

    info[row][col].value = mineCount as CellMetaValue;
  }

  for (let row = 0; row < rowCnt; row++) {
    for (let col = 0; col < colCnt; col++) {
      getInfo(row, col);
    }
  }

  return field;
};
