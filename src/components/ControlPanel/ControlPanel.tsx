import { useState } from "react";

import { LEVEL } from "@constants";
import { useDispatch } from "react-redux";

export const ControlPanel = () => {
  const dispatch = useDispatch();

  const buttonLabel = useState("시작");

  const levels = Object.values(LEVEL);

  return (
    <header>
      <h1>지뢰찾기</h1>
      <select>
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
