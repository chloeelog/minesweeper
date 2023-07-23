import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LEVEL } from "@constants";
import { RootState, setLevel, updateField } from "@store";
import { LevelKey, LevelValue } from "@types";
import { getInitializedField } from "@utils";

export const ControlPanel = () => {
  const dispatch = useDispatch();
  const levels = Object.values(LEVEL);

  const { level } = useSelector((state: RootState) => state.configurationSlice);

  const initialize = ({ row, col, mineCount }: LevelValue) => {
    const field = getInitializedField({ row, col, mineCount });
    dispatch(updateField(field));
  };

  const handleUpdateLevel = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLevel = event.target.value as LevelKey;

    if (selectedLevel === "CUSTOM") {
      // TODO: 커스텀 레벨 입력 창 띄워주기
      return;
    }

    const level = LEVEL[selectedLevel];
    dispatch(setLevel(level));
    initialize(level);
  };

  useEffect(() => {
    initialize(level);
  }, []);

  return (
    <header>
      <h1>지뢰찾기</h1>
      <select onChange={handleUpdateLevel} defaultValue={level.value}>
        {levels.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button></button>
    </header>
  );
};
