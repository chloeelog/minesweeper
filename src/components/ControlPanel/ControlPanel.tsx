import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LEVEL } from "@constants";
import { RootState, initializeGame, setLevel, updateField } from "@store";
import { LevelKey, FieldMeta } from "@types";
import { getInitializedField } from "@utils";

import { Timer } from "@components/Timer";
import { FlagCounter } from "@components/FlagCounter";

import { Row } from "@design-system";
import * as S from "./ControlPanel.style";

export const ControlPanel = () => {
  const dispatch = useDispatch();
  const levels = Object.values(LEVEL);

  const { level } = useSelector((state: RootState) => state.configurationSlice);

  const isCustomLevel = level === LEVEL.CUSTOM;

  const [customRow, setCustomRow] = useState<number>(0);
  const [customCol, setCustomCol] = useState<number>(0);
  const [customMineCount, setCustomMineCount] = useState<number>(0);

  const initializeField = ({ row, col, mineCount }: FieldMeta) => {
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
    <S.Panel>
      <Row>
        <S.Title>지뢰찾기</S.Title>
        <S.Subtitle>by @chloeelog</S.Subtitle>
      </Row>
      <Row gap={"1rem"}>
        <Timer />
        <FlagCounter />
      </Row>
      <Row>
        <select onChange={handleUpdateLevel} defaultValue={level.value}>
          {levels.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button onClick={handleInitializeClick}>새로 시작하기</button>
      </Row>
      <Row>
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
      </Row>
    </S.Panel>
  );
};
