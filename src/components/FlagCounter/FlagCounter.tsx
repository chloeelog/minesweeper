import { useSelector } from "react-redux";

import { RootState } from "@store";

import { Row } from "@design-system";

export const FlagCounter = () => {
  const { field } = useSelector((state: RootState) => state.fieldSlice);
  const { mineCount } = field.meta;
  const { flagCount } = field.status;

  const remainingFlagCount = mineCount - flagCount;

  return (
    <Row gap={"0.25rem"}>
      <span role="img" aria-label="flag">
        🚩
      </span>
      {remainingFlagCount}
    </Row>
  );
};
