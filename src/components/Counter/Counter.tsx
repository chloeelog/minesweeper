import { useSelector } from "react-redux";

import { RootState } from "@store";

export const Counter = () => {
  const { field } = useSelector((state: RootState) => state.fieldSlice);
  const { mineCount } = field.meta;
  const { flagCount } = field.status;

  const remainingFlagCount = mineCount - flagCount;

  return <div>남은 깃발: {remainingFlagCount}</div>;
};
