import { LEVELS } from "@constants";

export const ControlPanel = () => {
  const levels = Object.values(LEVELS);

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
    </header>
  );
};
