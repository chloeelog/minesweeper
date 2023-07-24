import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, updateField } from "@store";
import { getInitializedField } from "@utils";

import { ControlPanel } from "@components/ControlPanel";
import { Field } from "@components/Field";

export const Board = () => {
  const dispatch = useDispatch();
  const { level } = useSelector((state: RootState) => state.configurationSlice);
  const { row, col, mineCount } = level;
  const { field } = useSelector((state: RootState) => state.fieldSlice);

  useEffect(() => {
    const initialField = getInitializedField({ row, col, mineCount });
    dispatch(updateField(initialField));
  }, []);

  if (!field.info) {
    return null;
  }

  return (
    <>
      <ControlPanel />
      <Field />
    </>
  );
};
