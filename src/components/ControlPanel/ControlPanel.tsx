import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LEVEL } from "@constants";
import { RootState, initializeGame, setLevel, updateField } from "@store";
import { LevelKey, FieldMeta } from "@types";
import { getInitializedField } from "@utils";

import * as S from "./ControlPanel.style";
import { Timer } from "@components/Timer";

export const ControlPanel = () => {
  const dispatch = useDispatch();
  const levels = Object.values(LEVEL);

  const { level } = useSelector((state: RootState) => state.configurationSlice);

  const isCustomLevel = level === LEVEL.CUSTOM;

  const [customRow, setCustomRow] = useState<number>(0);
  const [customCol, setCustomCol] = useState<number>(0);
  const [customMineCount, setCustomMineCount] = useState<number>(0);

  const initializeField = ({
    row,
    col,
    mineCount,
  }: Omit<FieldMeta, "flagCount">) => {
    const field = getInitializedField({ row, col, mineCount });
    dispatch(updateField(field));
  };

  const handleUpdateLevel = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLevel = event.target.value as LevelKey;
    const level = LEVEL[selectedLevel];
    dispatch(setLevel(level));
  };

  const handleInitializeClick = () => {
    dispatch(initializeGame());

    if (level === LEVEL.CUSTOM) {
      initializeField({
        row: customRow,
        col: customCol,
        mineCount: customMineCount,
      });
      return;
    }
    initializeField(level);
  };

  return (
    <header>
      <h1>지뢰찾기</h1>
      <S.Row>
        <input
          type="number"
          value={customRow}
          max={100}
          onChange={(event) => setCustomRow(Number(event.target.value))}
          disabled={!isCustomLevel}
        />
        X
        <input
          type="number"
          value={customCol}
          max={100}
          onChange={(event) => setCustomCol(Number(event.target.value))}
          disabled={!isCustomLevel}
        />
        : 지뢰 갯수
        <input
          type="number"
          value={customMineCount}
          max={customRow * customCol}
          onChange={(event) => setCustomMineCount(Number(event.target.value))}
          disabled={!isCustomLevel}
        />
      </S.Row>
      <select onChange={handleUpdateLevel} defaultValue={level.value}>
        {levels.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button onClick={handleInitializeClick}>새로 시작하기</button>
      <Timer />
    </header>
  );
};
